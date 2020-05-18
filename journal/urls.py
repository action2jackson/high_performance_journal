from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('goals/', views.goals_list, name='goals_list'),
    # Need a pk value for getting instances
    path('goal/edit/<str:pk>/', views.goal_edit, name='goal_edit'),
    path('goals/delete/', views.goals_delete, name='goals_delete'),
    path('signup/', views.signup_page, name='signup_page'),
    path('login/', views.login_page, name='login_page'),
    path('logout/', views.logout_user, name='logout_user'),
    path('dreams/', views.dream_list, name='dream_list'),
    path('dream/new/', views.dream_create, name='dream_create'),
    path('dream/<int:pk>', views.dream_detail, name='dream_detail'),
    path('dream/<int:pk>/edit', views.dream_edit, name='dream_edit'),
    path('dreams/delete/', views.dreams_delete, name='dreams_delete'),
    path(r'dreams/download/', views.dreams_download, name='dreams_download'),
]