import boto3

from django.conf import settings

from typing import Any

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from django.conf import settings


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