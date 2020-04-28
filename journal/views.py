from django.shortcuts import render, get_object_or_404, redirect
from django.forms import formset_factory
# Helps with registration
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import authenticate, login, logout
# Flash message
from django.contrib import messages
# User authentication import
from django.contrib.auth.decorators import login_required

from .models import Goal
from .forms import GoalForm, SignupForm

@login_required
def login_page(request):
    # if request.user.is_authenticated:
    #     return redirect('index')
    # else:
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'Username or Password is incorrect')
            return render(request, 'journal/login.html')

    return render(request, 'journal/login.html')

def logout_user(request):
    logout(request)
    return redirect('login')


@login_required
def signup_page(request):
    # if request.user.is_authenticated:
    #     return redirect('index')
    # else:
    signupForm = SignupForm()

    if request.method == 'POST':
        signupForm = SignupForm(request.POST)
        if signupForm.is_valid():
            signupForm.save()
            user = signupForm.cleaned_data.get('username')
            messages.success(request, 'Account created successfully for ' + user)
            return redirect('login_page') 

    stuff_for_frontend = {
        'signupForm': signupForm
    }
    return render(request, 'journal/signup.html', stuff_for_frontend)


    
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
                goal.save()
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
    goal_page = Goal.objects.all()
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
            # post = goalForm.save(commit=False)
            # post.author = request.user
            goalForm.save()
            return redirect('goals_list')
    else:
        goalForm = GoalForm(instance=goal)
        stuff_for_frontend = {'goalForm': goalForm}
        return render(request, 'journal/goal_edit.html', stuff_for_frontend)

# Delete 90 day Goals form
def goals_delete(request):
    Goal.objects.all().delete()
    return redirect('goals_list')


    
