import json
import os
import ssl
import urllib.request
import urllib.parse
import urllib.error
import psycopg2


def get_connection():
    dsn = os.environ['DATABASE_URL']
    return psycopg2.connect(dsn)


def send_max_notification(name: str, phone: str, region: str, comment: str) -> None:
    """Отправка уведомления о заявке в мессенджер MAX"""
    token = os.environ.get('MAX_BOT_TOKEN')
    chat_id = os.environ.get('MAX_CHAT_ID')
    if not token or not chat_id:
        return

    text = (
        "Новая заявка на военную службу по контракту\n\n"
        f"ФИО: {name}\n"
        f"Телефон: {phone}\n"
        f"Регион: {region}\n"
        f"Комментарий: {comment}"
    )

    query = urllib.parse.urlencode({'chat_id': chat_id})
    url = f"https://platform-api2.max.ru/messages?{query}"
    data = json.dumps({'text': text}).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json', 'Authorization': token},
        method='POST'
    )
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        resp = urllib.request.urlopen(req, timeout=5, context=ctx)
        print(f"MAX API response: {resp.status} {resp.read()}")
    except urllib.error.HTTPError as e:
        print(f"MAX API HTTPError: {e.code} {e.read()}")
    except Exception as e:
        print(f"MAX API error: {repr(e)}")


def handler(event: dict, context) -> dict:
    """Приём заявок с сайта: сохранение в БД, уведомление в MAX, отдача счётчика заявок за сегодня"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    method = event.get('httpMethod')
    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        if params.get('action') == 'stats':
            conn = get_connection()
            try:
                cur = conn.cursor()
                cur.execute("SELECT COUNT(*) FROM applications WHERE created_at::date = CURRENT_DATE")
                today_count = cur.fetchone()[0]
                cur.close()
            finally:
                conn.close()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'today': today_count})
            }
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Unknown action'})}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    region = body.get('region', '—')
    comment = body.get('comment', '—')
    source = body.get('source', 'form')

    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO applications (name, phone, region, comment, source) VALUES (%s, %s, %s, %s, %s)",
            (name, phone, region, comment, source)
        )
        conn.commit()
        cur.close()
    finally:
        conn.close()

    send_max_notification(name, phone, region, comment)

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True})
    }
