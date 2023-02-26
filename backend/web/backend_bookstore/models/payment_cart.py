from django.db import models
from web.backend_bookstore.models.option import * 
from web.backend_bookstore.models import *

class PaymentCart(models.Model):
    payment = models.ForeignKey('Payment', related_name='payment', on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart', related_name='payment_cart', on_delete=models.CASCADE, blank=True, null=True)
    book = models.ForeignKey('Book', related_name='payment_book', on_delete=models.CASCADE, blank=True, null=True)
    amount = models.IntegerField(default=0)