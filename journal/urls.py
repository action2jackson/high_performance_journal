from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('goals/', views.goals_list, name='goals_list'),
    path('goals/delete/', views.goals_delete, name='goals_delete'),
    # Need a pk value for getting instances
    path('goal/edit/<str:pk>/', views.goal_edit, name='goal_edit'),
    path('signup/', views.signup_page, name='signup_page'),
    path('login/', views.login_page, name='login_page'),
    path('logout/', views.logout_user, name='logout_user'),
]