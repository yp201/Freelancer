from django.conf.urls import url
from . import views
from projects.views import add
urlpatterns = [url(r'^$', views.homePJ, name='homePJ'),
               url(r'^signout$', views.pjSignout, name='pjSignout'),
               url(r'^addPro$', add, name='add'),
               url(r'^editprofile$', views.pj_edit_profile, name='pj_edit_profile'),
               url(r'^editpic$', views.pj_edit_pic, name='pj_edit_pic'),
               url(r'^renderpage$', views.render_page, name='render_page'),
               url(r'^acceptbid$', views.accept_bid, name='accept_bid'),
               ]
