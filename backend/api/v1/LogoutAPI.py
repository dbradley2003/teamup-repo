from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated



class LogoutView(APIView):

    permission_classes = [IsAuthenticated]
    
    
    def post(self,request):
        try:
            data = request.data
            refresh_token = data.get("refresh")
            print(refresh_token)
            refresh_token_obj = RefreshToken(refresh_token)
            refresh_token_obj.blacklist()

            return Response({"detail": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
