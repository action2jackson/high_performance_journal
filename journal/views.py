from django.shortcuts import render, redirect

from .models import Goal
from .forms import GoalForm
# Create your views here.

def index(request):

    if request.method == 'POST':
        goal = GoalForm(request.POST)

        if goal.is_valid:
            goal.save()
            return redirect('goals_list')
    else: 
        goal = GoalForm()
        goals_for_frontend = {
            'goal': goal
        }
    return render(request, 'journal/home_page.html', goals_for_frontend)

def goals_list(request):
    goal_page = Goal.objects.all()
    goals_for_frontend = {'goal_page': goal_page}
    return render(request, 'journal/goals_list.html', goals_for_frontend)

    
