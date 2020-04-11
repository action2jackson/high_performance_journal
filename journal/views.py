from django.shortcuts import render, redirect

from django.forms import formset_factory
from .models import Goal
from .forms import GoalForm
# Create your views here.

def index(request):
    goalsFormSet = formset_factory(GoalForm, extra=3, max_num=3)

    if request.method == 'POST':
        goals = goalsFormSet(request.POST)
        for goal in goals:
            if goal.is_valid():
                goal.save()
        return redirect('goals_list')
    else: 
        goals = goalsFormSet()
        goals_for_frontend = {
            'goals': goals,
        }
    return render(request, 'journal/home_page.html', goals_for_frontend)

def goals_list(request):
    goal_page = Goal.objects.all()
    goals_for_frontend = {
        'goal_page': goal_page
    }
    return render(request, 'journal/goals_list.html', goals_for_frontend)

def goals_delete(request):
    Goal.objects.all().delete()
    return redirect('goals_list')



    
