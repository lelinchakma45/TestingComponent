from django.urls import path
from .views import register, login, user_profile, all_users

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('profile/', user_profile, name='user_profile'),  # Authenticated user profile
    path('users/', all_users, name='all_users'),  # Admin can access all users
]
