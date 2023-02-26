from django.contrib import admin
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from web.backend_bookstore.views.auth import *
from web.backend_bookstore.views.book import *
from web.backend_bookstore.views.cart import *
from web.backend_bookstore.views.payment import *
from web.backend_bookstore.views.history import *

urlpatterns = [
    # auth
    url(r'^v1/login/$', LoginView.as_view(),name="auth-login"),
    url(r'^v1/logout/$', LogoutView.as_view(),name="auth-logout"),
    url(r'^v1/register/$', RegisterView.as_view(),name="auth-register"),
    # book
    url(r'^v1/book/$', BookListView.as_view(),name="book-list"),
    url(r'^v1/book/(?P<pk>[0-9]+)/$', BookDetailView.as_view(),name='book-detail'),
    # cart
    url(r'^v1/cart/$', CartListView.as_view(),name="cart-list"),
    url(r'^v1/cart/(?P<pk>[0-9]+)/$', CartDetailView.as_view(),name='cart-detail'),
    url(r'^v1/add_to_cart/$', AddToCartView.as_view(),name='add-to-cart'),
    # omise
    url(r'^v1/omise/event/$', OmiseHook.as_view(),name='omise-hook'),
    # payment
    url(r'^v1/payment/$', PaymentView.as_view(),name='payment'),
    url(r'^v1/get_payment/$', GetPaymentView.as_view(),name='get-payment'),
    # history
    url(r'^v1/history/$', HistoryView.as_view(),name='history-list'),
]