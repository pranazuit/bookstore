from django.db import models
from django.contrib.auth.models import User
from web.backend_bookstore.models import Book

class Cart(models.Model):
    user = models.ForeignKey(User, related_name='user_cart', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='book_cart', on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    create_date_time = models.DateTimeField(auto_now_add=True)
    update_date_time = models.DateTimeField(blank=True, null=True)