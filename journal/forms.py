from django import forms
from .models import Goal
from django.forms import formset_factory
# For registration
from django.contrib.auth.forms import UserCreationForm
# User model from Django
from django.contrib.auth.models import User
from django import forms


from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit


class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        # Excludes Model fields
        exclude = ('created_date',)
        # Includes all Model fields
        fields = '__all__'
        # html attributes 
        widgets = {
            'goal': (forms.TextInput(attrs={'placeholder': 'Land my first Programming job', 'required': 'True', 'autofocus': 'autofocus'})),
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
        # Form labels
        labels = {
            # leaving it Blank is needed so Dajngo knows not to just autofill the label
            'goal': (''),
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


class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
        widgets = {
            'username': (forms.TextInput(attrs={'placeholder': 'Username', 'required': 'True', 'class': 'inputFields'})),
        }

    def __init__(self, *args, **kwargs):
        super(SignupForm, self).__init__(*args, **kwargs)
        self.fields['password1'].widget = forms.PasswordInput(attrs={'placeholder': 'Password', 'required': 'True', 'class': 'inputFields'})
        self.fields['password2'].widget = forms.PasswordInput(attrs={'placeholder': 'Password (again)', 'required': 'True', 'class': 'inputFields'})
