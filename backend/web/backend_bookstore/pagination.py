from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50000


class SwitchPagination(PageNumberPagination):

    # page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000

    def get_paginated_response(self, data):
        page = self.request.query_params.get('page', None)
        if page is not None:
            return Response({
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'count': self.page.paginator.count,
                'results': data
            })
        else:
            return Response(data)
    
    def get_page_size(self, request):
        page_size = request.query_params.get('page_size', None)
        if page_size is not None:
            return page_size
        page = request.query_params.get('page', None)
        if page is not None:
            return 10
        else:
            return self.max_page_size