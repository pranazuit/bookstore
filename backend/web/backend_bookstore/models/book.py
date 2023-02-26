from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    amount = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    img = models.ImageField(upload_to='book_image', blank=True, null=True)
    create_date_time = models.DateTimeField(auto_now_add=True)
    update_date_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name