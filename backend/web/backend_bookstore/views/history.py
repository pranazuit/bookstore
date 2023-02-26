from rest_framework import generics
from web.backend_bookstore.models import *
from web.backend_bookstore.serializers import *
from web.backend_bookstore.permissions import *

class HistoryView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = HistorySerializer
    def get_queryset(self):
        queryset = History.objects.filter(user=self.request.user).order_by('name')
        
        return queryset