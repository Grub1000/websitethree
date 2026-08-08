from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid


class User(AbstractUser):
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.email

class PasswordResetToken(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="password_reset_tokens",
    )

    token = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    expires_at = models.DateTimeField()

    used = models.BooleanField(
        default=False,
    )

    def __str__(self):

        return f"{self.user.email} ({self.token})"




# Resume Analyzer Resume Fiile Model (File Stored in S3 Bucket, Metadata Stored in MySQL Database)
class Resume(models.Model):

    class Status(models.TextChoices):
        PENDING_UPLOAD = (
            "pending_upload",
            "Pending Upload",
        )

        UPLOADED = (
            "uploaded",
            "Uploaded",
        )

        PROCESSING = (
            "processing",
            "Processing",
        )

        COMPLETED = (
            "completed",
            "Completed",
        )

        EXTRACTED = (
                "extracted",
                "Extracted",
                )

        FAILED = (
            "failed",
            "Failed",
        )


    public_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
    )


    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes",
    )


    original_filename = models.CharField(
        max_length=255,
    )


    s3_key = models.CharField(
        max_length=512,
        unique=True,
    )


    content_type = models.CharField(
        max_length=100,
    )


    file_size = models.PositiveBigIntegerField()


    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.PENDING_UPLOAD,
    )


    extracted_text = models.TextField(
        blank=True,
    )


    extraction_error = models.TextField(
        blank=True,
    )


    created_at = models.DateTimeField(
        auto_now_add=True,
    )


    uploaded_at = models.DateTimeField(
        null=True,
        blank=True,
    )


    updated_at = models.DateTimeField(
        auto_now=True,
    )

    thumbnail_s3_key = models.CharField(
        max_length=512,
        blank=True,
    )

    class Meta:
        ordering = [
            "-created_at",
        ]


    def __str__(self):

        return (
            f"{self.original_filename} "
            f"— {self.owner.email}"
        )



# Resume Analysis Model (Analysis Results Stored in MySQL Database)
class ResumeAnalysis(models.Model):

    class Status(models.TextChoices):
        PENDING = (
            "pending",
            "Pending",
        )

        PROCESSING = (
            "processing",
            "Processing",
        )

        COMPLETED = (
            "completed",
            "Completed",
        )

        FAILED = (
            "failed",
            "Failed",
        )


    public_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
    )


    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="analyses",
    )


    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )


    job_title = models.CharField(
        max_length=255,
        blank=True,
    )


    job_description = models.TextField(
        blank=True,
    )


    overall_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


    ats_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


    keyword_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


    experience_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


    skills_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


    strengths = models.JSONField(
        default=list,
        blank=True,
    )


    weaknesses = models.JSONField(
        default=list,
        blank=True,
    )


    missing_keywords = models.JSONField(
        default=list,
        blank=True,
    )


    recommendations = models.JSONField(
        default=list,
        blank=True,
    )


    raw_result = models.JSONField(
        default=dict,
        blank=True,
    )


    model_provider = models.CharField(
        max_length=100,
        blank=True,
    )


    model_name = models.CharField(
        max_length=100,
        blank=True,
    )


    prompt_version = models.CharField(
        max_length=50,
        blank=True,
    )


    error_message = models.TextField(
        blank=True,
    )


    created_at = models.DateTimeField(
        auto_now_add=True,
    )


    completed_at = models.DateTimeField(
        null=True,
        blank=True,
    )


    class Meta:
        ordering = [
            "-created_at",
        ]


    def __str__(self):

        return (
            f"Analysis for "
            f"{self.resume.original_filename} "
            f"— {self.status}"
        )

# Instead of importing your User model directly:
# from django.contrib.auth import get_user_model
# User = get_user_model()
#
# The foreign key uses:
# settings.AUTH_USER_MODEL
# This is Django’s preferred way to reference the configured user model.