from django.core.mail import send_mail 
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def send_password_reset_email(user, token): 
    reset_url = ( f"{settings.FRONTEND_URL}/reset-password/" f"?token={token.token}" ) 
    subject = "Password Reset Request" 
    message = f""" Hello {user.username}, 
    A password reset request was made for your account.
    Click the link below to reset your password: {reset_url} 
    This link expires in 1 hour. If you did not request this, you can ignore this email. """ 

    
    email = EmailMultiAlternatives(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
    )
    # print(reset_url)
    email.send()