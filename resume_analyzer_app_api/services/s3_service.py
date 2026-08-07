import boto3

from django.conf import settings

from typing import Any

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from django.conf import settings

# Imports Needed for Resume PDF/DOCX File Text Extractions
from io import BytesIO




def get_s3_client():
    """
    Create an S3 client using boto3's normal credential chain.

    Local development:
        Uses AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
        from the local environment.

    EC2 production:
        Uses temporary credentials from the attached IAM role.

    **Boto3 automatically handles the credential chain, so we don't need to do anything special here.**
    """

    return boto3.client(
        "s3",
        region_name=settings.AWS_S3_REGION_NAME,
    )


def generate_resume_upload(
    *,
    s3_key: str,
    content_type: str,
) -> dict[str, Any]:
    """
    Generate a short-lived presigned POST for a private résumé upload.
    """

    s3_client = get_s3_client()

    try:
        return s3_client.generate_presigned_post(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Key=s3_key,
            Fields={
                "Content-Type": content_type,
                "x-amz-server-side-encryption": "AES256",
            },
            Conditions=[
                {
                    "Content-Type": content_type,
                },
                {
                    "x-amz-server-side-encryption": "AES256",
                },
                [
                    "content-length-range",
                    1,
                    settings.RESUME_MAX_FILE_SIZE,
                ],
            ],
            ExpiresIn=settings.RESUME_UPLOAD_URL_EXPIRATION,
        )

    except (BotoCoreError, ClientError) as error:
        raise RuntimeError(
            "Unable to create the résumé upload request."
        ) from error


def resume_object_exists(*, s3_key: str) -> bool:
    s3_client = get_s3_client()

    try:
        s3_client.head_object(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Key=s3_key,
        )

        return True

    except ClientError as error:
        error_code = error.response.get(
            "Error",
            {},
        ).get("Code")

        if error_code in {
            "404",
            "NoSuchKey",
            "NotFound",
        }:
            return False

        raise RuntimeError(
            "Unable to verify the résumé upload."
        ) from error


def download_resume_file(
    *,
    s3_key: str,
) -> BytesIO:
    """
    Download a private résumé from S3 into memory.

    Résumés are limited to 10 MB, so an in-memory buffer
    is acceptable for the initial implementation.
    """

    s3_client = get_s3_client()
    file_buffer = BytesIO()

    try:
        s3_client.download_fileobj(
            settings.AWS_STORAGE_BUCKET_NAME,
            s3_key,
            file_buffer,
        )

    except (BotoCoreError, ClientError) as error:
        raise RuntimeError(
            "Unable to download the résumé from storage."
        ) from error

    file_buffer.seek(0)

    return file_buffer