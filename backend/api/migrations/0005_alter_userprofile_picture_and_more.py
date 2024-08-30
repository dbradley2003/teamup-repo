# Generated by Django 5.1 on 2024-08-30 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userprofile_picture_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures/'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='resumeUrl',
            field=models.FileField(blank=True, null=True, upload_to='resumes/'),
        ),
    ]