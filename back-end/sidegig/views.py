from .serializers import  JobSerializer, UserSerializer, TokenSerializer, VerifySerializer, SavedJobSerializer, JobMessageSerializer
from .models import Job, SavedJobs, JobMessage
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

class Jobs(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
class SavedList(viewsets.ModelViewSet):
    queryset = SavedJobs.objects.all()
    serializer_class = SavedJobSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
class SavedJobsList(APIView):
    def get(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        jobs = SavedJobs.objects.filter(mainUserId=pk)
        serializer = SavedJobSerializer(jobs, many=True)
        return Response(serializer.data)
      
class MessageList(viewsets.ModelViewSet):
    queryset = JobMessage.objects.all()
    serializer_class = JobMessageSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class LoginView(generics.ListCreateAPIView):
    # This permission class will overide the global permission class setting
    # Permission checks are always run at the very start of the view, before any other code is allowed to proceed.
    # The permission class here is set to AllowAny, which overwrites the global class to allow anyone to have access to login.
    permission_classes = (permissions.AllowAny,)

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, user)
            refresh = RefreshToken.for_user(user)
            serializer = TokenSerializer(data={
                # using DRF JWT utility functions to generate a token
                "token": str(refresh.access_token)
                })
            serializer.is_valid()
            return Response({"token" : serializer.data})
        return Response(status=status.HTTP_401_UNAUTHORIZED)
      
      
class RegisterUsersView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        
        if not username or not password or not email:
            return Response(
                data={
                    "message": "username, password and email is required to register a user"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        new_user = User.objects.create_user(
          username=username, password=password, email=email
        )
        user = authenticate(request, username=username, password=password)
        login(request, user)
        refresh = RefreshToken.for_user(user)
        serializer = TokenSerializer(data={
            # using DRF JWT utility functions to generate a token
            "token": str(refresh.access_token)
            })
        serializer.is_valid()
        return Response({"token" : serializer.data})


class VerifyUsersView(generics.RetrieveAPIView):
    
    queryset = User.objects.all()
    serializer_class = VerifySerializer
