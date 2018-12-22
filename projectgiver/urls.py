from django.conf.urls import url
from . import views
from projects import views as proviews
from bid.views import accept_bid
urlpatterns = [url(r'^$', views.homePJ, name='homePJ'),
               url(r'^signout$', views.pjSignout, name='pjSignout'),
               url(r'^addPro$', proviews.add, name='add'),
               url(r'^editprofile$', views.pj_edit_profile, name='pj_edit_profile'),
               url(r'^editpic$', views.pj_edit_pic, name='pj_edit_pic'),
               url(r'^renderpage$', views.render_page, name='render_page'),
               url(r'^renderaddpro$', views.render_add, name='render_add'),
               url(r'^confirm$', accept_bid, name='accept_bid'),
               url(r'^completed$', proviews.project_done, name='project_done'),
               url(r'^notifications$', views.notification_project_poster,
                   name='notification_project_poster'),
               url(r'^clicknotification$', views.click_notification,
                   name='click_notification'),
               ]
