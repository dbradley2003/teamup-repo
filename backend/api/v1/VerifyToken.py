# from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
import jwt  
import json
import requests
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from jwt.algorithms import RSAAlgorithm
from rest_framework.response import Response
import base64
from jwt  import PyJWKClient
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class VerifyTokenView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        # 1. Extract Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({'error': 'Invalid Authorization header'}, status=400)

        try:
            # 2. Extract the token from the Authorization header
            token = auth_header.split(' ')[1]

            # 3. Define JWKS URL (for Microsoft Identity Platform)
            jwks_url = "https://login.microsoftonline.com/common/discovery/v2.0/keys"
            jwks_client = PyJWKClient(jwks_url)

            # 4. Get the signing key from the token's header
            signing_key = jwks_client.get_signing_key_from_jwt(token)
    
            # 5. Decode and verify the token
            decoded_token = jwt.decode(
                token,
                signing_key.key,
                audience="be91ae3a-4817-4575-84ad-87d00f92d8c3",  # Your application's client ID
                algorithms=["RS256"],
                options={"verify_exp": True}  # Enable expiration verification
            )
            print(decoded_token)

            # 5. Extract user details from the token
            user_email = decoded_token.get("email")
            user_sub = decoded_token.get("sub")  # Azure AD unique user ID (subject)
            print(f'{user_email} and {user_sub}')

            if not user_email or not user_sub:
                return Response({'error': 'Invalid token: email or sub missing'}, status=400)

            # 6. Check if the user exists in Django or create a new user
            try:
                # Look up user by email
                user = User.objects.get(email=user_email)
            except User.DoesNotExist:
                # If the user doesn't exist, create a new user
                user = User.objects.create_user(
                    username=user_sub,  # You can use sub or email as the username
                    email=user_email,
                    password=None  # You can leave this as None because we're using Azure AD for auth
                )
            
            
            refresh = RefreshToken.for_user(user)
            
            # 7. Log the user in
            
            login(request,user)
            

            return JsonResponse({"refresh":str(refresh), "access":str(refresh.access_token)})

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError as e:
            return Response({'error': f'Invalid token: {str(e)}'}, status=401)


                    

        



            