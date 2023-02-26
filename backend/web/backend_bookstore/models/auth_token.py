import datetime
from django.utils.crypto import get_random_string
from oauth2_provider.models import (
    AccessToken,
    RefreshToken,
)
from dateutil.relativedelta import relativedelta

class AuthToken:
    def create_token(user,application):

        date_1 = datetime.datetime.today()
        access_token = AccessToken.objects.create(
            user=user,
            application = application,
            expires = date_1 + relativedelta(years=100),
            token = get_random_string(length=30, allowed_chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
            scope = 'read write'
        )
        AccessToken.objects.filter(user=user, application=application).exclude(token=access_token.token).delete()

        r = RefreshToken.objects.create(
            access_token = access_token,
            application = application,
            token = get_random_string(length=30, allowed_chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
            user = user
        )
        RefreshToken.objects.filter(user=user, application=application).exclude(access_token=access_token).delete()

        return r

    def delete_token(token,application):

        l = AccessToken.objects.all().filter(token=token)
        if l.count()==0:
            return False

        access_token = l[0]
        RefreshToken.objects.all().filter(access_token=access_token,application=application.pk).delete()
        access_token.delete()

        return True