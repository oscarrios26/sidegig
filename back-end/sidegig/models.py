from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
  title = models.CharField(max_length=128)
  description = models.TextField()
  pay = models.DecimalField(max_digits=6, decimal_places=2)
  userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs', null=False)
  created_at = models.DateTimeField(auto_now_add=True, null=True)
  def __str__(self):
    return self.title
    