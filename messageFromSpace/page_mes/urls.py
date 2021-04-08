from django.urls import path
from .views import index, get_messages, mark_read

urlpatterns = [
    path('', index),
    path('get_messages', get_messages),
    path('mark_read', mark_read),
]
