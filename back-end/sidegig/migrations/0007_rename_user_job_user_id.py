# Generated by Django 5.0.6 on 2024-05-28 22:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0006_alter_userdata_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='user',
            new_name='user_id',
        ),
    ]
