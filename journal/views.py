from django.shortcuts import render

from .models import Goal
from .forms import GoalForm
# Create your views here.

def index(request):
    
    form = GoalForm(request.POST)
    if form.is_valid():
        form.save()

    form_for_frontend = {
        'form': form 
    }
    return render(request, 'journal/home_page.html', form_for_frontend)

    
