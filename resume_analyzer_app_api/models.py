from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
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