from rest_framework import generics
from web.backend_bookstore.models import *
from web.backend_bookstore.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from web.backend_bookstore.permissions import *
import omise
import requests

class PaymentView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request,format=None):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            cart_id = request.data.get('cart_id', None)
            book_id = request.data.get('book_id', None)
            price = request.data['price']
            amount = request.data['amount']
            import sys
            data = {
                'amount': price * 100,
                'currency': 'thb',
                'source[type]': 'promptpay',
            }
            response = requests.post('https://api.omise.co/charges', 
                data=data, 
                auth=(settings.OMISE_SECRET_KEY, '')
            )
            res_data = response.json()
            payment = Payment.objects.create(
                user = self.request.user,
                price = price,
                ref_payment = res_data['id'],
                method = 'promptpay',
                status = 1,
            )
            payment.save()

            if cart_id:
                arr_cart = cart_id.split(',')
                cart = Cart.objects.filter(id__in=arr_cart)
                for c in cart:
                    payment_cart = PaymentCart.objects.create(
                        payment = payment,
                        cart = c,
                        amount = amount,
                    )
                    payment_cart.save()
            else:
                book = Book.objects.get(id=book_id)
                payment_cart = PaymentCart.objects.create(
                    payment = payment,
                    amount = amount,
                    book = book,
                )
                payment_cart.save()

            return Response(res_data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

class OmiseHook(APIView):
    def post(self, request,format=None):
        import sys
        res_key = request.data.get('key', None)
        if res_key == 'charge.complete':
            data = request.data.get('data', {})
            charge_id = data.get('id',None)
            charge_status= data.get('status',None)
            try:
                payment = Payment.objects.get(ref_payment=charge_id)
                if payment.status != 1:
                    return Response({'data':'payment is paid','status':False},status.HTTP_400_BAD_REQUEST)
                payment.pay_datetime = request.data.get('created_at', None)
                payment.save()
                if charge_status == 'successful':
                    payment.status = 2
                    payment.save()
                    payment_cart = PaymentCart.objects.filter(payment=payment)
                    for p in payment_cart:
                        if p.cart is not None:
                            history = History.objects.create(
                                user = p.payment.user,
                                name = p.cart.book.name,
                                description = p.cart.book.description,
                                amount = p.cart.amount,
                                price = p.cart.book.price,
                                img = p.cart.book.img,
                                book_id = p.cart.book.id,
                            )
                            history.save()
                            try:
                                book = Book.objects.get(id=p.cart.book.id)
                                book.amount = book.amount - p.cart.amount
                                book.save()
                            except:
                                pass
                            try:
                                Cart.objects.filter(id=p.cart.id).delete()
                            except:
                                pass

                        elif p.book is not None:
                            history = History.objects.create(
                                user = p.payment.user,
                                name = p.book.name,
                                description = p.book.description,
                                amount = p.amount,
                                price = p.book.price,
                                img = p.book.img,
                                book_id = p.book.id,
                            )
                            history.save()
                            try:
                                book = Book.objects.get(id=p.book.id)
                                book.amount = book.amount - p.amount
                                book.save()
                            except:
                                pass
                        p.delete()
                        
                    return Response({'data':'payment accepted','status':True},status.HTTP_200_OK)
                else:
                    payment.status = 3
                    payment.save()
                    return Response({'data':'payment accepted','status':False},status.HTTP_200_OK)
            except Payment.DoesNotExist:
                return Response({'data':'ref_payment not found','status':False},status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'data':'rejected','status':False},status.HTTP_400_BAD_REQUEST)
        
class GetPaymentView(APIView):
    serializer_class = GetPaymentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset = Payment.objects.filter(user=self.request.user).latest('id')
        
        return Response(GetPaymentSerializer(queryset).data,status.HTTP_200_OK)