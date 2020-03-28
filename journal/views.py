from django.shortcuts import render

from .models import Goal
from .forms import GoalForm
# Create your views here.

def index(request):

    if request.method == 'POST':
        goal = request.POST.get("goal")
        goal_important = request.POST.get("goal_important")
        progress_1 = request.POST.get("progress_1")
        progress_2 = request.POST.get("progress_2")
        progress_3 = request.POST.get("progress_3")
        goal = request.POST.get("goal")
        goal = request.POST.get("goal")
        goal = request.POST.get("goal")

    
    form = GoalForm(request.POST)
    if form.is_valid():
        form.save()

    form_for_frontend = {
        'form': form 
    }
    return render(request, 'journal/home_page.html', form_for_frontend)

    
