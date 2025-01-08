from rest_framework import serializers
from .models import Job, SavedJobs
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

class JobSerializer(serializers.ModelSerializer):
  user = serializers.StringRelatedField()
  class Meta:
    model = Job
    fields = '__all__'
    
class SavedJobSerializer(serializers.ModelSerializer):
  SavedJobs = serializers.StringRelatedField()
  class Meta:
    model = SavedJobs
    fields = '__all__'
            
class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
      
class VerifySerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    date_joined = serializers.CharField(max_length=255)

