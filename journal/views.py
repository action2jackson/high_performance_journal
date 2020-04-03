from django.shortcuts import render, redirect

from .models import Goal
from .forms import GoalForm
# Create your views here.

def index(request):

    if request.method == 'POST':
        goal1 = GoalForm(request.POST)
        goal2 = GoalForm(request.POST)
        goal3 = GoalForm(request.POST)

        if goal1.is_valid() and goal2.is_valid() and goal3.is_valid():
            goal1.save()
            goal2.save()
            goal3.save()
            return redirect('goals_list')
    else: 
        goal1 = GoalForm()
        goal2 = GoalForm()
        goal3 = GoalForm()
        goals_for_frontend = {
            'goal1': goal1,
            'goal2': goal2,
            'goal3': goal3
        }
    return render(request, 'journal/home_page.html', goals_for_frontend)

def goals_list(request):
    goal_page = Goal.objects.all()
    goals_for_frontend = {'goal_page': goal_page}
    return render(request, 'journal/goals_list.html', goals_for_frontend)

def goals_delete(request):
    Goal.objects.all().delete()
    return redirect('goals_list')



    
