from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from django.views import View
from django.http import JsonResponse

class SendMailView():

    # authentication_classes = []  
    # permission_classes = [] 

    def send_mail(user_email, subject, message):
        recipient_list = [user_email]

        try:
            send_mail(
            subject,
            message,
            'dombradley7@gmail.com',
            recipient_list,
            fail_silently=False,
        )
            return JsonResponse({'success': 'Email sent successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


