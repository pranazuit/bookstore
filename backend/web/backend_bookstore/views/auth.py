from web.backend_bookstore.models import *
from rest_framework.response import Response
from rest_framework import status
from oauth2_provider.models import Application
from web.backend_bookstore.serializers import *
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth import authenticate
from web.backend_bookstore.models.auth_token import AuthToken

class LoginView(APIView):
    def post(self, request,format=None):
        import sys
        serializer = LoginSerializer(data=request.data)

        # Application
        try:
            application = Application.objects.get(name='BOOKSTORE')
        except Application.DoesNotExist:
            application = Application.objects.create(name='BOOKSTORE')
        
        if serializer.is_valid():
            user = authenticate(request, username=serializer.data['username'], password=serializer.data['password'])

            if user is None:
                msg_error = {'success': False,'data':{},'message':'อีเมลล์หรือรหัสผ่านไม่ถูกต้อง'}
                return Response(msg_error,status.HTTP_403_FORBIDDEN)

            auth = AuthToken.create_token(user,application)

            resp = {
                'success': True,
                'data':{
                    'access_token': auth.access_token.token,
                    'username': user.username,
                },
                'messsage': 'Log in successful',
            }
            
            return Response(resp,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request,format=None):
        # Application
        try:
            application = Application.objects.get(name='BOOKSTORE')
        except Application.DoesNotExist:
            application = Application.objects.create(name='BOOKSTORE')
        
        access_token = request.data.get('access_token',None)
        if access_token is not None:
            AuthToken.delete_token(access_token,application)
            resp = {
                'success': True,
                'data':{},
                'messsage': 'Log out successful',
            }
            return Response(resp,status.HTTP_200_OK)
        else:
            return Response({'access_token' : 'access_token is required'},status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request,format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            user = User.objects.create(
                username=username,
            )
            user.set_password(serializer.data['password'])
            user.save()
            resp = {
                'success': True,
                'data':{},
                'messsage': 'Register successful',
            }
            return Response(resp,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)