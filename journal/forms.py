from django import forms
from .models import Goal

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = [
            'goal',
            'goal_important',
            'progress_1',
            'progress_2',
            'progress_3',
            'deeper_progress_1',
            'deeper_progress_2',
            'deeper_progress_3'
        ]