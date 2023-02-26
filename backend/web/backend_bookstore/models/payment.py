from django.db import models
from django.contrib.auth.models import User
from web.backend_bookstore.models.option import * 

class Payment(models.Model):
    user = models.ForeignKey(User, related_name='payment_creator', on_delete=models.CASCADE)
    record_date = models.DateTimeField(auto_now_add=True, help_text='record_date')
    pay_datetime = models.DateTimeField(help_text='pay_date',null=True,blank=True)
    ref_payment = models.CharField(max_length=100, help_text='ref_charge', unique=True)
    price = models.DecimalField(max_digits=20, decimal_places=2, help_text='price', default=0)
    method = models.CharField(max_length=100,choices=PAYMENT_METHOD, default='promptpay')
    status = models.IntegerField(default=1,choices=PAYMENT_STATUS,help_text='1=รอชำระเงิน, 2=ชำระเงินแล้ว , 3=ชำระเงินไม่สำเร็จ, 4=Order หมดอายุ')