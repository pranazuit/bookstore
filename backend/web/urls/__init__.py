from web.urls.urls import urlpatterns as urls
from web.urls.api_v1 import urlpatterns as api_v1

urlpatterns = urls
urlpatterns += api_v1