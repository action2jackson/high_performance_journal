from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse


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
    text = models.TextField(null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    title = models.CharField(max_length=40)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    @property
    # Cant add this to html template because events are created from the calendar form
    def get_html_url(self):
        # Get event_edit url 
        url = reverse('event_edit', args=(self.id,))
        return f'<a href="{url}"> {self.title} </a>'
