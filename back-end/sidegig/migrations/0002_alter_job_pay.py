# Generated by Django 5.0.6 on 2024-05-27 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sidegig', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='pay',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
    ]
