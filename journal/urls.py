from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('goals/', views.goals_list, name='goals_list'),
    path('goals/delete/', views.goals_delete, name='goals_delete'),
    path('goal/edit/<str:pk>/', views.goal_edit, name='goal_edit'),
]