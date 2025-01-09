# Generated by Django 5.1.4 on 2025-01-08 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0025_jobmessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobmessage',
            name='jobId',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='jobmessage',
            name='userId',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='userId',
            field=models.CharField(max_length=128, null=True),
        ),
    ]