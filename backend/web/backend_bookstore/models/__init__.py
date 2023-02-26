from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save

from web.backend_bookstore.models.book import *
from web.backend_bookstore.models.cart import *
from web.backend_bookstore.models.history import *
from web.backend_bookstore.models.payment import *
from web.backend_bookstore.models.payment_cart import *