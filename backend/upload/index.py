import base64
import json
import os
import uuid

import boto3


def handler(event: dict, context) -> dict:
    """Загрузка файлов (изображения и PDF) в S3-хранилище."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    file_data = body.get("file")
    file_name = body.get("name", "file")
    content_type = body.get("content_type", "application/octet-stream")

    if not file_data:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "No file provided"})}

    raw = base64.b64decode(file_data)

    ext = file_name.rsplit(".", 1)[-1].lower() if "." in file_name else "bin"
    key = f"crm/{uuid.uuid4().hex}.{ext}"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    s3.put_object(Bucket="files", Key=key, Body=raw, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"url": cdn_url, "key": key, "name": file_name}),
    }
