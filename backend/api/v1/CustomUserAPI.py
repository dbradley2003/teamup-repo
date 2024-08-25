from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from ..models import UserProfile
from ..serializers import UserSerializer
from django.contrib.auth.password_validation import validate_password




ALLOWED_EMAIL_DOMAINS = ['gmail.com']

class CustomUserView(APIView):
    
    authentication_classes = []  # No authentication required
    permission_classes = []  # No permissions required

    def post(self,request):

        GRADE_MAP = {
        "1": "Freshman",
        "2": "Sophomore",
        "3": "Junior",
        "4": "Senior"
        }

        data = request.data

        password = data.get('password')
        email = data.get('email')

        grade = data.get('grade')
        grade_text = GRADE_MAP.get(grade)

        try:
            validate_password(password,user=None)
        except ValidationError as e:
            return Response ({'error':e.messages}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")

        domain = email.split('@')[-1]
        if domain not in ALLOWED_EMAIL_DOMAINS:
            raise ValidationError(f"Registration is only allowed with emails from {', '.join(ALLOWED_EMAIL_DOMAINS)}")
        

        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
           user = serializer.save()
           user.set_password(password)
           user.save()

           UserProfile.objects.create(user=user, student_year=grade_text)

           return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

