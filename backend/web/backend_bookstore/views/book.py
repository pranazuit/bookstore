from rest_framework import generics
from web.backend_bookstore.models import *
from web.backend_bookstore.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from web.backend_bookstore.permissions import *

class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer
    def get_queryset(self):
        queryset = Book.objects.all().filter(amount__gt=0).order_by('name')
        name = self.request.query_params.get('name', None)

        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        return queryset

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer