from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField()
  pay = models.CharField(max_length=128)
  userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs', null=False)
  username= models.CharField(max_length=128)
  city= models.CharField(max_length=128)
  state= models.CharField(max_length=128)
  zipCode= models.CharField(max_length=128, null = True)
  date_joined = models.CharField(max_length=128)
  created_at = models.DateTimeField(auto_now_add=True, null=True)
  def __str__(self):
    return self.title
    