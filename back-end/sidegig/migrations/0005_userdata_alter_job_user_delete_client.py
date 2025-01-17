# Generated by Django 5.0.6 on 2024-05-28 00:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0004_client_alter_job_user_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=128)),
                ('last_name', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=128)),
                ('street_address', models.CharField(max_length=56)),
                ('city', models.CharField(max_length=56)),
                ('state', models.CharField(max_length=56)),
                ('zip_code', models.IntegerField()),
                ('join_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='job',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='sidegig.userdata'),
        ),
        migrations.DeleteModel(
            name='Client',
        ),
    ]
