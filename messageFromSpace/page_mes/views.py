from django.shortcuts import render
from .models import Mess
from django.http import HttpResponse
from django.core import serializers


def index(request):
    return render(request, 'page_mes/index.html')


def get_messages(request):
    last_id = int(request.GET.get("last_id", 0))
    messages = Mess.objects.filter(check=False).filter(id__gt=last_id).order_by("-date")
    messages_json = serializers.serialize('json', messages)
    return HttpResponse(messages_json, content_type='application/json')


def mark_read(request):
    cur_id = int(request.GET.get("id", 0))
    message = Mess.objects.get(id=cur_id)
    message.check = True
    message.save()
    return HttpResponse("Done")
