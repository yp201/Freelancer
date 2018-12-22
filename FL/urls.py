from django.conf.urls import url
from bid.views import add_bid
from . import views
urlpatterns = [url(r'^$', views.homeFL, name='homeFL'),
               url(r'^signout$', views.flSignout, name='flSignout'),
               url(r'^editprofile$', views.fl_edit_profile, name='fl_edit_profile'),
               url(r'^editpic$', views.fl_edit_pic, name='fl_edit_pic'),
               url(r'^renderpage$', views.render_page, name='render_page'),
               url(r'^searchskill$', views.search_skill, name='search_skill'),
               url(r'^search$', views.search_render, name='search_render'),
               url(r'^addbid$', add_bid, name='add_bid'),
               url(r'^skills$', views.skills, name='skills'),
               url(r'^addskill$', views.add_skill, name='add_skill'),
               url(r'^notifications$', views.notification_freelancer,
                   name='notification_freelancer'),
               url(r'^rating$', views.rating_from_freelancer,
                   name='rating_from_freelancer'),
               url(r'^clicknotification$', views.click_notification,
                   name='click_notification'),
               ]
