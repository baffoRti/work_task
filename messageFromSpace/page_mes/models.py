from django.db import models

class Mess(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    check = models.BooleanField(default=False)
