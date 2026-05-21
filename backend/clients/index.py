import json  # noqa: F401 - psycopg2-binary
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def serialize(client):
    c = dict(client)
    for f in ("created_at", "updated_at"):
        if c.get(f):
            c[f] = c[f].isoformat()
    for f in ("docs_photos", "relations_files", "tickets_files", "contract_files"):
        if c.get(f) is None:
            c[f] = []
    return c


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
                       WHERE full_name ILIKE %s OR name ILIKE %s OR phone ILIKE %s OR company ILIKE %s
                       ORDER BY created_at DESC""",
                    (f"%{search}%", f"%{search}%", f"%{search}%", f"%{search}%"),
                )
            else:
                cur.execute("SELECT * FROM clients ORDER BY created_at DESC")
            clients = [serialize(r) for r in cur.fetchall()]
            return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"clients": clients})}

        elif method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                """INSERT INTO clients (name, full_name, phone, company, age, conviction, chronic_diseases,
                   dispensary_record, notes, status, employee_name, docs_photos, relations_files, tickets_files, contract_files)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb, %s::jsonb, %s::jsonb, %s::jsonb)
                   RETURNING *""",
                (
                    body.get("full_name", ""),
                    body.get("full_name", ""),
                    body.get("phone", ""),
                    body.get("company", ""),
                    body.get("age") or None,
                    body.get("conviction", ""),
                    body.get("chronic_diseases", ""),
                    body.get("dispensary_record", ""),
                    body.get("notes", ""),
                    body.get("status", "active"),
                    body.get("employee_name", ""),
                    json.dumps(body.get("docs_photos", [])),
                    json.dumps(body.get("relations_files", [])),
                    json.dumps(body.get("tickets_files", [])),
                    json.dumps(body.get("contract_files", [])),
                ),
            )
            client = serialize(cur.fetchone())
            conn.commit()
            return {"statusCode": 201, "headers": cors_headers, "body": json.dumps({"client": client})}

        elif method == "PUT" and client_id:
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                """UPDATE clients SET name=%s, full_name=%s, phone=%s, company=%s, age=%s, conviction=%s,
                   chronic_diseases=%s, dispensary_record=%s, notes=%s, status=%s, employee_name=%s,
                   docs_photos=%s::jsonb, relations_files=%s::jsonb, tickets_files=%s::jsonb, contract_files=%s::jsonb,
                   updated_at=NOW()
                   WHERE id=%s RETURNING *""",
                (
                    body.get("full_name", ""),
                    body.get("full_name", ""),
                    body.get("phone", ""),
                    body.get("company", ""),
                    body.get("age") or None,
                    body.get("conviction", ""),
                    body.get("chronic_diseases", ""),
                    body.get("dispensary_record", ""),
                    body.get("notes", ""),
                    body.get("status", "active"),
                    body.get("employee_name", ""),
                    json.dumps(body.get("docs_photos", [])),
                    json.dumps(body.get("relations_files", [])),
                    json.dumps(body.get("tickets_files", [])),
                    json.dumps(body.get("contract_files", [])),
                    client_id,
                ),
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {"statusCode": 404, "headers": cors_headers, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"client": serialize(row)})}

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