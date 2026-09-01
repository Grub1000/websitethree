import uuid
import boto3
from django.conf import settings
from botocore.config import Config


def get_s3_client():
    endpoint_url = f"https://s3.{settings.RAGSPACE_AWS_REGION}.amazonaws.com"

    if settings.DEBUG:
        return boto3.client(
            "s3",
            aws_access_key_id=settings.RAGSPACE_AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.RAGSPACE_AWS_SECRET_ACCESS_KEY,
            region_name=settings.RAGSPACE_AWS_REGION,
            endpoint_url=endpoint_url,
            config=Config(
                signature_version="s3v4",
                s3={
                    "addressing_style": "virtual",
                },
            ),
        )

    return boto3.client(
        "s3",
        region_name=settings.RAGSPACE_AWS_REGION,
        endpoint_url=endpoint_url,
        config=Config(
            signature_version="s3v4",
            s3={
                "addressing_style": "virtual",
            },
        ),
    )
  


def generate_presigned_upload(user_id, knowledge_base_id, filename, content_type):
    s3_client = get_s3_client()

    extension = filename.rsplit(".", 1)[-1].lower()

    s3_key = (
        f"ragspace/users/{user_id}/spaces/{knowledge_base_id}/documents/"
        f"{uuid.uuid4()}.{extension}"
    )

    upload_url = s3_client.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": settings.RAGSPACE_AWS_STORAGE_BUCKET_NAME,
            "Key": s3_key,
            "ContentType": content_type,
        },
        ExpiresIn=900,
    )

    return {
        "upload_url": upload_url,
        "s3_key": s3_key,
    }


def verify_uploaded_object(s3_key):
    s3_client = get_s3_client()

    response = s3_client.head_object(
        Bucket=settings.RAGSPACE_AWS_STORAGE_BUCKET_NAME,
        Key=s3_key,
    )

    return response



def delete_document_file(s3_key):
    if not s3_key:
        return

    s3_client = get_s3_client()

    s3_client.delete_object(
        Bucket=settings.RAGSPACE_AWS_STORAGE_BUCKET_NAME,
        Key=s3_key,
    )



def generate_presigned_download(
    s3_key: str,
):
    s3_client = get_s3_client()

    return s3_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": settings.RAGSPACE_AWS_STORAGE_BUCKET_NAME,
            "Key": s3_key,
        },
        ExpiresIn=300,
    )