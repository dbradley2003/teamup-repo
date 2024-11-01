# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.exceptions import ValidationError
# from django.contrib.auth.models import User
# from ..models import UserProfile
# from ..serializers import UserSerializer, ProfileSerializer
# from django.contrib.auth.password_validation import validate_password
# from rest_framework.validators import UniqueValidator
# from rest_framework import serializers
# from rest_framework.permissions import AllowAny

# from .SendMail import SendMailView




# ALLOWED_EMAIL_DOMAINS = ['gmail.com']


# class RegisterSerializer(serializers.ModelSerializer):
#     profile = ProfileSerializer(write_only=True, required=False)
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     username = serializers.CharField(required=True)
#     email = serializers.EmailField(
#         required=True,
#         validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     student_year = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'password2', 'student_year','profile']

#     def validate(self,attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError(
#                 {"password": "Password fields didn't match."}
#             )
#         return attrs
    
#     def create(self, validated_data):
#         student_year = validated_data.pop('student_year')
#         user = User.objects.create(
#             username = validated_data['username'],
#             email=validated_data['email']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         UserProfile.objects.create(user=user, student_year=student_year)
#         return user



# class RegisterView(APIView):
#     authentication_classes= []
#     permission_classes = []
    
#     queryset = User.objects.all()

#     def post(self,request):
#         serializer = RegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.save()
#             user.save()

#             email = user.email
#             SendMailView.send_mail(email, 'Welcome to TeamUp', 'Thank you for registering with TeamUp')




#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print(serializer.errors)  # Log the errors for debugging
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


        
        


    

