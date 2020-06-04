from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
import csv
# Needed for creating formsets
from django.forms import formset_factory
# Helps with registration
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import authenticate, login, logout
# Flash messages
from django.contrib import messages
# User authentication import
from django.contrib.auth.decorators import login_required

from django.db.models import Q

from django.views import generic
from datetime import datetime, timedelta
from django.utils.safestring import mark_safe
from .utils import Calendar
import calendar

from .models import Goal, Dream, Event
from .forms import GoalForm, SignupForm, DreamForm


def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # Check for user information in database
        user = authenticate(request, username=username, password=password)
        # If user exists
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            # Send user an error message
            messages.info(request, 'Username or Password is incorrect')
            return render(request, 'registration/login.html')

    context = {}
    return render(request, 'registration/login.html', context)

def logout_user(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("login_page")


def signup_page(request):
    signupForm = SignupForm()

    if request.method == 'POST':
        signupForm = SignupForm(request.POST)
        if signupForm.is_valid():
            signupForm.save()
            # Get the users username
            user = signupForm.cleaned_data.get('username')
            # Custom success message
            messages.success(request, 'Account created successfully for ' + user)
            return redirect('login_page') 

    stuff_for_frontend = {
        'signupForm': signupForm
    }
    return render(request, 'registration/signup.html', stuff_for_frontend)


    
# Fill in 90 day Goals form
@login_required(login_url='login')
def index(request):
    # Create a Formset with 3 forms and 3 being the max amount
    goalsFormSet = formset_factory(GoalForm, extra=3, max_num=3)

    if request.method == 'POST':
        goals = goalsFormSet(request.POST)
        # Loop through Formset to check validation on each form
        for goal in goals:
            if goal.is_valid():
                # Wait to save goal form (usaully used to add something)
                goalForm = goal.save(commit=False)
                # Get the current user
                goalForm.user = request.user
                # Save goal form with data and user info
                goalForm.save()
        return redirect('goals_list')
    else: 
        goals = goalsFormSet()
        stuff_for_frontend = {
            'goals': goals,
        }
    return render(request, 'journal/home_page.html', stuff_for_frontend)

# Filled in 90 day Goals form
@login_required(login_url='login')
def goals_list(request):
    # Get all Goal objects that were created from the current user
    goal_page = Goal.objects.filter(user=request.user)
    stuff_for_frontend = {
        'goal_page': goal_page
    }
    return render(request, 'journal/goals_list.html', stuff_for_frontend)

# Edit 90 day goals form
def goal_edit(request, pk):
    # Get all the objects that are related to their Primary key
    goal = Goal.objects.get(id=pk)
    if request.method == 'POST':
        # Gets an already instantiated Goal
        goalForm = GoalForm(request.POST, instance=goal)
        if goalForm.is_valid():
            goal_form = goalForm.save(commit=False)
            goal_form.user = request.user
            goal_form.save()
            return redirect('goals_list')
    else:
        goalForm = GoalForm(instance=goal)
        stuff_for_frontend = {'goalForm': goalForm}
        return render(request, 'journal/goal_edit.html', stuff_for_frontend)

# Delete 90 day Goals form
def goals_delete(request):
    Goal.objects.filter(user=request.user).delete()
    return redirect('goals_list')



# DREAMS
def dream_list(request):
    # Order dreams by created date and exclude other users dreams
    order_dreams = Dream.objects.order_by('-created_date')
    dreams = Dream.objects.filter(user=request.user)
    stuff_for_frontend = {
        'order_dreams': order_dreams,
        'dreams': dreams,
    }
    return render(request, 'journal/dream_list.html', stuff_for_frontend)
    

def dream_create(request):
    dreamForm = DreamForm()

    if request.method == 'POST':
        dreamForm = DreamForm(request.POST)
        if dreamForm.is_valid():
            dream = dreamForm.save(commit=False)
            dream.user = request.user
            dream.save()
            return redirect('dream_list')
    else:
        dreamForm = DreamForm()
        stuff_for_frontend = {
            'dreamForm': dreamForm
        }
        return render(request, 'journal/dream_edit.html', stuff_for_frontend)


def dream_edit(request, pk):
    # Get specific dream using pk 
    dream = get_object_or_404(Dream, pk=pk)
    if request.method == 'POST':
        # Get dream instance
        dreamForm = DreamForm(request.POST, instance=dream)
        if dreamForm.is_valid():
            dream = dreamForm.save(commit=False)
            dream.user = request.user
            dream.save()
        return redirect('dream_list')
    else:
        dreamForm = DreamForm(instance=dream)
        stuff_for_frontend = {
            'dreamForm': dreamForm
        }
        return render(request, 'journal/dream_edit.html', stuff_for_frontend)

# Downloads the users dreams and places them in a csv file
def dreams_download(request):
    # Establishing file type
    response = HttpResponse(content_type='text/csv')
    # Naming the file
    response['Content-Disposition'] = 'attachment; filename="Dreams.csv"'
    writer = csv.writer(response)
    # Add the fields that you want
    writer.writerow(['title','text','created_date'])
    # Filter through the current users dreams
    data = Dream.objects.filter(user=request.user)
    for row in data:
        # Write the data
        rowobj = [row.title,row.text,row.created_date]
        writer.writerow(rowobj)
    # Return the file
    return response 

# Delete all the users dreams
def dreams_delete(request):
    Dream.objects.filter(user=request.user).delete()
    return redirect('dream_list')

# Search for a dream
def dream_search(request):
    if request.method == 'GET':
        # Gets inputted search data from the user
        query = request.GET.get('q')

        if query is not None:
            # Searchs for keywords in the title and text as well as the created date in the following format: 0000-00-00
            lookups = Q(title__icontains=query) | Q(text__icontains=query) | Q(created_date__icontains=query)
            # Search through the current users dreams ( .distinct() returns a new queryset )
            results = Dream.objects.filter(lookups, user=request.user).distinct()

            stuff_for_frontend = {
                # Using 'dreams' as naming convention, so if there was no search, Django would still be able to find the dreams from dream_list function
                'dreams': results,
            }
            return render(request, 'journal/dream_list.html', stuff_for_frontend)         
    else:
        return render(request, 'journal/dream_list.html')
    


class CalendarView(generic.ListView):
    model = Event
    template_name = 'journal/monthly_journal.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        d = get_date(self.request.GET.get('month', None))

        cal = Calendar(d.year, d.month)

        html_cal = cal.formatmonth(withyear=True)
        context['calendar'] = mark_safe(html_cal)
        context['prev_month'] = prev_month(d)
        context['next_month'] = next_month(d)
        return context

def get_date(req_day):
    if req_day:
        year, month = (int(x) for x in req_day.split('-'))
        return datetime(year, month, day=1)
    return datetime.today()

def prev_month(d):
    first = d.replace(day=1)
    prev_month = first - timedelta(days=1)
    month = 'month=' + str(prev_month.year) + '-' + str(prev_month.month)
    return month

def next_month(d):
    days_in_month = calendar.monthrange(d.year, d.month)[1]
    last = d.replace(day=days_in_month)
    next_month = last + timedelta(days=1)
    month = 'month=' + str(next_month.year) + '-' + str(next_month.month)
    return month