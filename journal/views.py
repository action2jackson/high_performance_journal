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

from .models import Goal, Dream
from .forms import GoalForm, SignupForm, DreamForm
from .filters import DreamFilter


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
    order_dreams = Dream.objects.order_by('-created_date')
    dreams = Dream.objects.filter(user=request.user)
    dream_filter = DreamFilter(request.GET, queryset=dreams)
    dreams = dream_filter.qs
    stuff_for_frontend = {
        'order_dreams': order_dreams,
        'dreams': dreams,
        'dream_filter': dream_filter
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
    dream = get_object_or_404(Dream, pk=pk)
    if request.method == 'POST':
        dreamForm = DreamForm(request.POST, instance=dream)
        if dreamForm.is_valid():
            dream = dreamForm.save(commit=False)
            dream.user = request.user
            dream.save()
        return redirect('dream_detail', pk=dream.pk)
    else:
        dreamForm = DreamForm(instance=Dream)
        stuff_for_frontend = {
            'dreamForm': dreamForm
        }
        return render(request, 'journal/goal_edit.html', stuff_for_frontend)


def dream_detail(request, pk):
    dream = get_object_or_404(Dream, pk=pk)
    stuff_for_frontend = {
        'dream': dream
    }
    return render(request, 'journal/dream_detail.html', stuff_for_frontend)


def dreams_download(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="Dreams.csv"'
    writer = csv.writer(response)
    writer.writerow(['title','text','created_date'])
    data = Dream.objects.filter(user=request.user)
    for row in data:
        rowobj = [row.column1,row.column2,row.column3]
        writer.writerow(rowobj)
    return response 


def dreams_delete(request):
    Dream.objects.filter(user=request.user).delete()
    return redirect('goals_list')






    
