# Generated by Django 5.1 on 2024-08-29 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
    ]
