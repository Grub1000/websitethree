from io import BytesIO

from pypdf import PdfReader

from .s3_service import get_s3_client
from django.conf import settings


def extract_pdf_text(s3_key):
    s3_client = get_s3_client()

    response = s3_client.get_object(
        Bucket=settings.RAGSPACE_AWS_STORAGE_BUCKET_NAME,
        Key=s3_key,
    )

    pdf_bytes = response["Body"].read()

    reader = PdfReader(BytesIO(pdf_bytes))

    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""

        pages.append(
            {
                "page_number": page_number,
                "text": text.strip(),
            }
        )

    return {
        "page_count": len(reader.pages),
        "pages": pages,
    }