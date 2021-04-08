from django.shortcuts import render
from .models import Mess


def index(request):
    messages = Mess.objects.order_by("-date")
    context = {
        'messages': messages
    }
    return render(request, 'page_mes/index.html', context)
