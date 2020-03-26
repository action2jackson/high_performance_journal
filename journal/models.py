from django.db import models
from django.utils import timezone


class Goal(models.Model):
    goal = models.CharField(max_length=30, blank=True)
    goal_important = models.CharField(max_length=30, blank=True)
    progress_1 = models.CharField(max_length=30, blank=True)
    progress_2 = models.CharField(max_length=30, blank=True)
    progress_3 = models.CharField(max_length=30, blank=True)
    deeper_progress_1 = models.CharField(max_length=30, blank=True)
    deeper_progress_2 = models.CharField(max_length=30, blank=True)
    deeper_progress_3 = models.CharField(max_length=30)
    created_date = models.DateTimeField(default=timezone.now)

    
