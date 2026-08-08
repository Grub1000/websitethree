import fitz # PyMuPDF - pip install pymupdf - Internal Module Name is "fitz"
from PIL import Image
import io

class ResumeThumbnailError(Exception):
    """
    Raised when a résumé thumbnail cannot be generated.
    """


def generate_pdf_thumbnail(
    *,
    pdf_bytes: bytes,
) -> bytes:
    try:
        document = fitz.open(
            stream=pdf_bytes,
            filetype="pdf",
        )

    except Exception as error:
        raise ResumeThumbnailError(
            "The PDF could not be opened for thumbnail generation."
        ) from error

    try:
        if document.page_count == 0:
            raise ResumeThumbnailError(
                "The PDF contains no pages."
            )

        page = document.load_page(0)

        page_rect = page.rect

        target_width = 250   # Every résumé thumbnail is roughly 250 pixels wide.

        scale = target_width / page_rect.width

        pixmap = page.get_pixmap(
            matrix=fitz.Matrix(scale, scale),
            alpha=False,
        )

        # return pixmap.tobytes("jpg")

        # Use PIL to convert the pixmap to a JPEG image and save it to a bytes buffer.
        # Gets the thumbnail down to somewhere around 20–60 KB while still looking crisp in a dashboard.
        image = Image.frombytes(
            "RGB",
            [pixmap.width, pixmap.height],
            pixmap.samples,
        )

        buffer = io.BytesIO()

        image.save(
            buffer,
            format="JPEG",
            quality=75,
            optimize=True,
        )

        return buffer.getvalue()

    finally:
        document.close()