from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenRefreshSerializer

class CustomTokenRefreshView(TokenRefreshView):
    # permission_classes = [IsAuthenticated]

    class CustomTokenRefreshSerializer(TokenRefreshSerializer):
        def validate(self, attrs):
            data = super().validate(attrs)
            # Assuming the user is identified in the token
            data['username'] = self.user.username
            return data

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        # You can add custom logic here
        # For example, logging the refresh or modifying the token payload
        data = serializer.validated_data
        # Modify data if needed, or log the refresh attempt
        return Response(data, status=status.HTTP_200_OK)