# Generated by Django 5.1.4 on 2025-01-09 03:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0026_jobmessage_jobid_jobmessage_userid_alter_job_userid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobmessage',
            old_name='messsage',
            new_name='message',
        ),
    ]
