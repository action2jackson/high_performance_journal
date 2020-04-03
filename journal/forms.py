from django import forms
from .models import Goal

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = (
            'goal',
            'goal_important',
            'progress_1',
            'progress_2',
            'progress_3',
            'deeper_progress_1',
            'deeper_progress_2',
            'deeper_progress_3',
            'deeper_progress_4',
            'deeper_progress_5',
            'deeper_progress_6',
            'deeper_progress_7',
            'deeper_progress_8',
            'deeper_progress_9',
        )
        widgets = {
            'goal': (forms.TextInput(attrs={'placeholder': 'Land my first Programming job', 'required': 'True'})),
            'goal_important': (forms.TextInput(attrs={'placeholder': 'It will get my foot in the door and help my confidence', 'required': 'True'})),
            'progress_1': (forms.TextInput(attrs={'placeholder': 'Create 2 big projects', 'required': 'True'})),
            'progress_2': (forms.TextInput(attrs={'placeholder': 'Make myself known in the programming community', 'required': 'True'})),
            'progress_3': (forms.TextInput(attrs={'placeholder': 'Have different ways recruiters can find me', 'required': 'True'})),
            'deeper_progress_1': (forms.TextInput(attrs={'placeholder': 'Brain storm projects I would like to create', 'class': 'based_progress', 'required': 'True'})),
            'deeper_progress_2': (forms.TextInput(attrs={'placeholder': 'Put away 3-5hrs a day to work on those projects', 'required': 'True'})),
            'deeper_progress_3': (forms.TextInput(attrs={'placeholder': 'Set deadlines to put pressure on myself', 'required': 'True'})),
            'deeper_progress_4': (forms.TextInput(attrs={'placeholder': 'Attend 2 coding meet ups every month', 'required': 'True'})),
            'deeper_progress_5': (forms.TextInput(attrs={'placeholder': 'DM popular programmers on social media', 'required': 'True'})),
            'deeper_progress_6': (forms.TextInput(attrs={'placeholder': 'Start a programming Tiktok account', 'required': 'True'})),
            'deeper_progress_7': (forms.TextInput(attrs={'placeholder': 'Create a Linked account', 'required': 'True'})),
            'deeper_progress_8': (forms.TextInput(attrs={'placeholder': 'Create a nice portfolio', 'required': 'True'})),
            'deeper_progress_9': (forms.TextInput(attrs={'placeholder': 'Create a resume', 'required': 'True'})),

        }
        field_classes = {
        }
        labels = {
            'goal': ('My Big Goal'),
            'goal_important': ('This goal is important to me because...'),
            'progress_1': ('My progress Goals'),
            'progress_2': (''),
            'progress_3': (''),
            'deeper_progress_1': ('Based on Progress Goal #1:'),
            'deeper_progress_2': (''),
            'deeper_progress_3': (''),
            'deeper_progress_4': ('Based on Progress Goal #2:'),
            'deeper_progress_5': (''),
            'deeper_progress_6': (''),
            'deeper_progress_7': ('Based on Progress Goal #3:'),
            'deeper_progress_8': (''),
            'deeper_progress_9': (''),
        }
        error_messages = {
            '__all__': { 
                'max_length': ("Your answers should be short and effective!"),
            },
        }
