# Generated by Django 5.0.6 on 2024-06-04 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0010_rename_client_job_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.TextField(),
        ),
    ]