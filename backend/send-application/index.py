import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту docos23@mail.ru"""

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

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {name}'
    msg['From'] = 'docos23@mail.ru'
    msg['To'] = 'docos23@mail.ru'

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; padding: 24px;">
      <h2 style="color: #1a3a6b; border-bottom: 2px solid #b8942a; padding-bottom: 8px;">
        Новая заявка на военную службу по контракту
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 180px;">ФИО</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">{name}</td></tr>
        <tr><td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Телефон</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">{phone}</td></tr>
        <tr><td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Регион</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">{region}</td></tr>
        <tr><td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Комментарий</td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">{comment}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login('docos23@mail.ru', os.environ['SMTP_PASSWORD'])
        server.sendmail('docos23@mail.ru', 'docos23@mail.ru', msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
