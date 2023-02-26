from django.db import models
from django.contrib.auth.models import User
from web.backend_bookstore.models import Book

class History(models.Model):
    user = models.ForeignKey(User, related_name='user_history', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    amount = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    img = models.ImageField(upload_to='book_image', blank=True, null=True)
    create_date_time = models.DateTimeField(auto_now_add=True)
    book_id = models.CharField(max_length=100, blank=True, null=True)