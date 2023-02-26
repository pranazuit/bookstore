from rest_framework import generics
from web.backend_bookstore.models import *
from web.backend_bookstore.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from web.backend_bookstore.permissions import *

class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user).order_by('book__name')
        
        return queryset

class CartDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, pk, **kwargs):
        cart = Cart.objects.get(pk=pk)
        cart.delete()
        return Response(status.HTTP_200_OK)

class AddToCartView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, format=None):
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            book_id = request.data['book_id']
            amount = request.data['amount']
            type = request.data['type']
            user = self.request.user
            try:
                cart = Cart.objects.get(book = int(book_id))
                if type == 'add':
                    cart.amount = cart.amount + int(amount)
                else:
                    cart.amount = cart.amount - int(amount)
                cart.save()
            except:
                book = Book.objects.get(id=book_id)
                cart = Cart.objects.create(
                    user = user,
                    book = book,
                    amount = amount,
                )
                cart.save()
            return Response(CartSerializer(cart).data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)