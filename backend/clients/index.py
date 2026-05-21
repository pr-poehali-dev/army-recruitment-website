import json
import os
import psycopg2  # noqa: F401 - psycopg2-binary
from psycopg2.extras import RealDictCursor


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Управление клиентами CRM: получение, добавление, обновление, удаление."""
    
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    method = event.get("httpMethod")
    path = event.get("path", "/")
    params = event.get("queryStringParameters") or {}

    client_id = None
    parts = path.strip("/").split("/")
    if len(parts) >= 2 and parts[-1].isdigit():
        client_id = int(parts[-1])

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        if method == "GET":
            search = params.get("search", "").strip()
            if search:
                cur.execute(
                    """SELECT * FROM clients 
                       WHERE name ILIKE %s OR phone ILIKE %s OR email ILIKE %s OR company ILIKE %s
                       ORDER BY created_at DESC""",
                    (f"%{search}%", f"%{search}%", f"%{search}%", f"%{search}%"),
                )
            else:
                cur.execute("SELECT * FROM clients ORDER BY created_at DESC")
            clients = [dict(r) for r in cur.fetchall()]
            for c in clients:
                if c.get("created_at"):
                    c["created_at"] = c["created_at"].isoformat()
                if c.get("updated_at"):
                    c["updated_at"] = c["updated_at"].isoformat()
            return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"clients": clients})}

        elif method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                """INSERT INTO clients (name, phone, email, company, notes, status)
                   VALUES (%s, %s, %s, %s, %s, %s)
                   RETURNING *""",
                (
                    body.get("name", ""),
                    body.get("phone", ""),
                    body.get("email", ""),
                    body.get("company", ""),
                    body.get("notes", ""),
                    body.get("status", "active"),
                ),
            )
            client = dict(cur.fetchone())
            conn.commit()
            if client.get("created_at"):
                client["created_at"] = client["created_at"].isoformat()
            if client.get("updated_at"):
                client["updated_at"] = client["updated_at"].isoformat()
            return {"statusCode": 201, "headers": cors_headers, "body": json.dumps({"client": client})}

        elif method == "PUT" and client_id:
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                """UPDATE clients SET name=%s, phone=%s, email=%s, company=%s, notes=%s, status=%s, updated_at=NOW()
                   WHERE id=%s RETURNING *""",
                (
                    body.get("name", ""),
                    body.get("phone", ""),
                    body.get("email", ""),
                    body.get("company", ""),
                    body.get("notes", ""),
                    body.get("status", "active"),
                    client_id,
                ),
            )
            client = cur.fetchone()
            conn.commit()
            if not client:
                return {"statusCode": 404, "headers": cors_headers, "body": json.dumps({"error": "Not found"})}
            client = dict(client)
            if client.get("created_at"):
                client["created_at"] = client["created_at"].isoformat()
            if client.get("updated_at"):
                client["updated_at"] = client["updated_at"].isoformat()
            return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"client": client})}

        elif method == "DELETE" and client_id:
            cur.execute("DELETE FROM clients WHERE id=%s RETURNING id", (client_id,))
            deleted = cur.fetchone()
            conn.commit()
            if not deleted:
                return {"statusCode": 404, "headers": cors_headers, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"success": True})}

        else:
            return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        cur.close()
        conn.close()