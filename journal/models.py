from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.validators import MaxValueValidator, MinValueValidator 

# from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

class Goal(models.Model):
    # Model fields for 90 day goals
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal = models.CharField(max_length=60, blank=True , null=True)
    goal_important = models.CharField(max_length=60, blank=True, null=True)
    progress_1 = models.CharField(max_length=60, blank=True, null=True)
    progress_2 = models.CharField(max_length=60, blank=True, null=True)
    progress_3 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_1 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_2 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_3 = models.CharField(max_length=60, null=True)
    deeper_progress_4 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_5 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_6 = models.CharField(max_length=60, null=True)
    deeper_progress_7 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_8 = models.CharField(max_length=60, blank=True, null=True)
    deeper_progress_9 = models.CharField(max_length=60, null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user


class Dream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    text = models.TextField(blank=True, default=None)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    # text = RichTextField(null=True)
    text = RichTextUploadingField(blank=True, default=None)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    
class Events(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=3)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40,null=True,blank=True)
    start = models.DateTimeField(null=True,blank=True)
    end = models.DateTimeField(null=True,blank=True)
    value = models.CharField(null=True, max_length=300, default=4)

    def __str__(self):
        return self.name