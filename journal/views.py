from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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
# Used for searching
from django.db.models import Q
# Used for class base views
from django.views import generic
# timedelta represents difference between 2 dates or times
from datetime import datetime, timedelta
# Makes a string safe for output purposes
from django.utils.safestring import mark_safe
import calendar

from .utils import Calendar
from .models import Goal, Dream, Event, Note, Task, Events
from .forms import GoalForm, SignupForm, DreamForm, EventForm, NoteForm, TaskForm


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
                # Wait to save goal form (usaully used to add somescheduler)
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
    



# CALENDAR
class CalendarView(generic.ListView):
    model = Event
    template_name = 'journal/monthly_journal.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        d = get_date(self.request.GET.get('month', None))
        # Get utils.py Calendar class
        cal = Calendar(d.year, d.month)
        # Call formatmonth function from Calendar class
        html_cal = cal.formatmonth(withyear=True)
        # Add calendar data to context
        context['calendar'] = mark_safe(html_cal)
        context['prev_month'] = prev_month(d)
        context['next_month'] = next_month(d)
        return context

def get_date(req_day):
    if req_day:
        # Gets current month and year
        year, month = (int(x) for x in req_day.split('-'))
        # Returns current date
        return datetime(year, month, day=1)
    return datetime.today()

def prev_month(d):
    first = d.replace(day=1)
    # timdelta parameter is 1 so it basically subtracts 1 from the current month (first)
    prev_month = first - timedelta(days=1)
    month = 'month=' + str(prev_month.year) + '-' + str(prev_month.month)
    return month

def next_month(d):
    days_in_month = calendar.monthrange(d.year, d.month)[1]
    last = d.replace(day=days_in_month)
    next_month = last + timedelta(days=1)
    month = 'month=' + str(next_month.year) + '-' + str(next_month.month)
    return month


def event(request, event_id=None):
    instance = Event()
    # If event already exists get its id
    if event_id:
        instance = get_object_or_404(Event, pk=event_id)
    else:
        instance = Event()
    
    eventForm = EventForm(request.POST or None, instance=instance)
    if request.POST and eventForm.is_valid():
        event = eventForm.save(commit=False)
        event.user = request.user
        event.save()
        # reverse gets the calendar url tag
        return HttpResponseRedirect(reverse('calendar'))
    return render(request, 'journal/event.html', {'eventForm': eventForm, 'event_id': event_id})

# Delete Event
def event_delete(request, event_id):
    event = get_object_or_404(Event, user=request.user, pk=event_id)
    event.delete()
    return HttpResponseRedirect(reverse('calendar'))
    


def notes_journal(request):
    order_notes = Note.objects.order_by('-created_date')
    notes = Note.objects.filter(user=request.user)
    stuff_for_frontend = {
        'order_notes': order_notes,
        'notes': notes,
    }
    return render(request, 'journal/notes_journal.html', stuff_for_frontend)



def note_create(request):
    noteForm = NoteForm()

    if request.method == 'POST':
        noteForm = NoteForm(request.POST)
        if noteForm.is_valid():
            note = noteForm.save(commit=False)
            note.user = request.user
            note.save()
            return redirect('notes_journal')
    else:
        noteForm = NoteForm()
        stuff_for_frontend = {
            'noteForm': noteForm
        }
        return render(request, 'journal/note_create.html', stuff_for_frontend)


def note_edit(request, pk):
    # Get specific dream using pk 
    note = get_object_or_404(Note, pk=pk)
    if request.method == 'POST':
        # Get dream instance
        noteForm = NoteForm(request.POST, instance=note)
        if noteForm.is_valid():
            note = noteForm.save(commit=False)
            note.user = request.user
            note.save()
        return redirect('notes_journal')
    else:
        noteForm = NoteForm(instance=note)
        stuff_for_frontend = {
            'noteForm': noteForm,
            'note': note
        }
        return render(request, 'journal/note_create.html', stuff_for_frontend)


def note_delete(request, pk):
    note = Note.objects.get(user=request.user, pk=pk)
    note.delete()
    return redirect('notes_journal')



def daily_journal(request):
    taskForm = TaskForm()

    if request.method == 'POST':
        taskForm = TaskForm(request.POST)
        if taskForm.is_valid():
            task = taskForm.save(commit=False)
            task.user = request.user
            task.save()
        return redirect('daily_journal')

    order_tasks = Task.objects.order_by('-created_date')
    tasks = Task.objects.filter(user=request.user)
    stuff_for_frontend = {
        'order_tasks': order_tasks,
        'tasks': tasks,
        'taskForm': taskForm,
    }
    return render(request, 'journal/daily_journal.html', stuff_for_frontend)


def task_delete(request, pk):
    task = Task.objects.get(user=request.user, pk=pk)
    task.delete()
    return redirect('daily_journal')



def calendar(request):
    all_events = Events.objects.filter(user=request.user)
    context = {
        "events": all_events,
    }
    return render(request,'journal/daily_journal.html',context)

def add_event(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    event = Events(name=str(title), start=start, end=end, user=request.user)
    event.save()
    data = {}
    return JsonResponse(data)


def update(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    id = request.GET.get("id", None)
    event = Events.objects.get(id=id)
    event.start = start
    event.end = end
    event.name = title
    event.user = request.user
    event.save()
    data = {}
    return JsonResponse(data)


def remove(request):
    id = request.GET.get("id", None)
    event = Events.objects.get(user=request.user, id=id)
    event.delete()
    data = {}
    return JsonResponse(data)

