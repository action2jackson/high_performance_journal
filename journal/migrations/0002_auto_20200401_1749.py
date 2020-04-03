# Generated by Django 3.0.3 on 2020-04-01 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goal',
            name='goals',
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_1',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_2',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_3',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_4',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_5',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_6',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_7',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_8',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='deeper_progress_9',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='goal',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='goal_important',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='progress_1',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='progress_2',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='goal',
            name='progress_3',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
