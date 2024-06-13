from rest_framework import serializers
from .models import UserData, Job
from django.contrib.auth.models import User

class UserDataSerializer(serializers.ModelSerializer):
  jobs = serializers.StringRelatedField(many=True)
  class Meta:
    model = UserData
    fields = '__all__'
    
class JobSerializer(serializers.ModelSerializer):
  user = serializers.StringRelatedField()
  class Meta:
    model = Job
    fields = '__all__'
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        
class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
    
class VerifySerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)