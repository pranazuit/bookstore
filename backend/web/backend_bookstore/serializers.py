from rest_framework import serializers
from django.core.validators  import RegexValidator
from web.backend_bookstore.models import *
from datetime import datetime

# Register your serializers here.
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100,help_text='username')
    password = serializers.CharField(max_length=100,help_text='password')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta:
        model = Cart
        fields = '__all__'

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, max_length=128)
    password = serializers.CharField(required=False, max_length=128)

    def validate_username(self,value):
        value = value.lower()
        if not value:
            return None
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('อีเมลล์นี้มีอยู่ในระบบแล้ว')
        return value or None

class AddToCartSerializer(serializers.Serializer):
    book_id = serializers.CharField(required=True)
    amount = serializers.CharField(required=True)
    type = serializers.CharField(required=True)

class PaymentSerializer(serializers.Serializer):
    price = serializers.CharField(required=True)
    amount = serializers.CharField(required=True)

class GetPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'