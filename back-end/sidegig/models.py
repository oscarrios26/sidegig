from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Job(models.Model):
  title = models.CharField(max_length=255,  null = True)
  description = models.TextField( null = True)
  pay = models.CharField(max_length=128,  null = True)
  userId = models.CharField(max_length=128,  null = True)
  username= models.CharField(max_length=128,  null = True)
  city= models.CharField(max_length=128,  null = True)
  state= models.CharField(max_length=128,  null = True)
  zipCode= models.CharField(max_length=128, null = True)
  date_joined = models.CharField(max_length=128, null = True)
  created_at = models.DateTimeField(null=True, default=timezone.now)
  def __str__(self):
    return self.title
    
    
class SavedJobs(models.Model):
  mainUserId = models.CharField(max_length=255,  null = True)
  title = models.CharField(max_length=255,  null = True)
  description = models.TextField( null = True)
  pay = models.CharField(max_length=128,  null = True)
  userId = models.CharField(max_length=128,  null = True)
  username= models.CharField(max_length=128,  null = True)
  city= models.CharField(max_length=128, null = True)
  state= models.CharField(max_length=128,  null = True)
  zipCode= models.CharField(max_length=128, null = True)
  date_joined = models.CharField(max_length=128,  null = True)
  created_at = models.CharField(max_length=128, null = True)
  saved_at = models.DateTimeField(null=True, default=timezone.now)
  def __str__(self):
    return str(self.title)
  
class JobMessage(models.Model):
  userId = models.CharField(max_length=128,  null = True)
  jobId = models.CharField(max_length=128,  null = True)
  message = models.TextField( null = True)
  created_at = models.DateTimeField(null=True, default=timezone.now)