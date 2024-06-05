from django.db import models

class UserData(models.Model):
  first_name = models.CharField(max_length=128)
  last_name = models.CharField(max_length=128)
  email = models.EmailField(max_length=128)
  street_address = models.CharField(max_length=56)
  city = models.CharField(max_length=56)
  state = models.CharField(max_length=56)
  zip_code = models.IntegerField()
  join_at = models.DateTimeField(auto_now_add=True, null=True)
  class Meta:
    verbose_name_plural = 'User Data'
  def __str__(self):
    return self.email
  
class Job(models.Model):
  title = models.CharField(max_length=128)
  description = models.TextField()
  pay = models.DecimalField(max_digits=6, decimal_places=2)
  user = models.ForeignKey(UserData, on_delete=models.CASCADE, related_name='jobs', null=False)
  created_at = models.DateTimeField(auto_now_add=True, null=True)
  def __str__(self):
    return self.title
  
