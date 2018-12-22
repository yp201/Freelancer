from django.conf.urls import url
from . import views
urlpatterns = [url(r'^$', views.landingPage, name='landingPage'),
               url(r'^authen$', views.authen, name='authen'),
               url(r'^register$', views.regUser, name='regUser'),
               url(r'^usernames$', views.usernames, name='usernames'),
               url(r'^sendOtp$', views.sendOtp, name='sendOtp'),
               ]
