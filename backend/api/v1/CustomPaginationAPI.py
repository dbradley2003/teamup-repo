from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class PostPagination(PageNumberPagination):
    page_size = 6
    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,  # Total number of pages
            'results': data
        })

class MessagePagination(PageNumberPagination):
    page_size = 5

    def get_paginated_response(self,data):
        return Response({
            
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,  # Total number of pages
            'results': data
        })
