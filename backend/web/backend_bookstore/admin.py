from django.contrib import admin
from web.backend_bookstore.models import *

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    list_display = ('name','amount','price')
    search_fields = ('name',)
admin.site.register(Book,BookAdmin)

class CartAdmin(admin.ModelAdmin):
    list_display = ('user','book','amount')
admin.site.register(Cart,CartAdmin)

class HistoryAdmin(admin.ModelAdmin):
    list_display = ('user','name','amount', 'price')
admin.site.register(History,HistoryAdmin)

class PaymentAdmin(admin.ModelAdmin):
     list_display = ('record_date','pay_datetime','method','status','price')
     list_filter = ('status','method')
admin.site.register(Payment,PaymentAdmin)

class PaymentCartAdmin(admin.ModelAdmin):
     list_display = ('payment','amount','book','cart')
admin.site.register(PaymentCart,PaymentCartAdmin)