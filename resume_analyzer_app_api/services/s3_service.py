import boto3

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