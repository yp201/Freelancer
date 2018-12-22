from django.conf.urls import url
from . import views
urlpatterns = [url(r'addbid^$', views.add_bid, name='add_bid'),
               ]
