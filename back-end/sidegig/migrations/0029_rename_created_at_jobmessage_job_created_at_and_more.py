# Generated by Django 5.1.4 on 2025-01-10 03:46

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0028_jobmessage_recipientid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobmessage',
            old_name='created_at',
            new_name='job_created_at',
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='city',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='date_joined',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='message_created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='pay',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='state',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='username',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='zipCode',
            field=models.CharField(max_length=128, null=True),
        ),
    ]
