from re import sub
from oauth2_provider.models import (
    AccessToken,
)

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.META['IP'] = get_client_ip(request)
        header_token = request.META.get('HTTP_AUTHORIZATION', None)
        access_token = None
        if header_token is not None:
            token = sub('Bearer ', '', header_token)
            access_token = AccessToken.objects.filter(token=token).first()

        if access_token:
            request.META['IS_LOGIN'] = True
            request.META['USER'] = access_token.user
        else:
            request.META['IS_LOGIN'] = False
            request.META['USER'] = None
            
        response = self.get_response(request)
        return response

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip 