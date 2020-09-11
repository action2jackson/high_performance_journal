from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('goals/', views.goals_list, name='goals_list'),
    # Need a pk value for getting instances
    path('goal/edit/<str:pk>/', views.goal_edit, name='goal_edit'),
    path('goals/delete/', views.goals_delete, name='goals_delete'),
    path('signup/', views.signup_page, name='signup_page'),
    path('login/', views.login_page, name='login_page'),
    re_path('logout/$', views.logout_user, name='logout_user'),
    path('dreams/', views.dream_list, name='dream_list'),
    path('dreams/search', views.dream_search, name='dream_search'),
    path('dream/new/', views.dream_create, name='dream_create'),
    # int:pk finds pk value through integers
    path('dreams/<int:pk>/edit/', views.dream_edit, name='dream_edit'),
    path('dreams/delete/', views.dreams_delete, name='dreams_delete'),
    path(r'dreams/download/', views.dreams_download, name='dreams_download'),
    path('notes/journal', views.notes_journal, name='notes_journal'),
    path('note/new/', views.note_create, name='note_create'),
    path('note/<int:pk>/edit/', views.note_edit, name='note_edit'),
    path('note/<int:pk>/delete/', views.note_delete, name='note_delete'),   
    path('daily/journal/', views.daily_journal, name="daily_journal"), 
    path('task/<int:pk>/delete/', views.task_delete, name="task_delete"),  
    url('^calendar', views.calendar, name='calendarr'),
    url('^add_event$', views.add_event, name='add_event'),
    url('^update$', views.update, name='update'),
    url('^remove', views.remove, name='remove'),
]