from django.db import models
from django.utils import timezone


class Goal(models.Model):
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
