from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
from django.http import JsonResponse


def generate_jwt_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }