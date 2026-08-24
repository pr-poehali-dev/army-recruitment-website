import json
import os
import urllib.request
import urllib.parse
import urllib.error


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

    query = urllib.parse.urlencode({'user_id': chat_id})
    url = f"https://platform-api2.max.ru/messages?{query}"
    data = json.dumps({'text': text}).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json', 'Authorization': token},
        method='POST'
    )
    try:
        resp = urllib.request.urlopen(req, timeout=5)
        print(f"MAX API response: {resp.status} {resp.read()}")
    except urllib.error.HTTPError as e:
        print(f"MAX API HTTPError: {e.code} {e.read()}")
    except Exception as e:
        print(f"MAX API error: {repr(e)}")


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в мессенджер MAX"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    region = body.get('region', '—')
    comment = body.get('comment', '—')

    send_max_notification(name, phone, region, comment)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }