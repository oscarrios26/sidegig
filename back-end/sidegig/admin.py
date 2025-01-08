from django.contrib import admin
from .serializers import  Job, SavedJobs

admin.site.register(Job)
admin.site.register(SavedJobs)

