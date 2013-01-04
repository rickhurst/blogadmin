from django.conf.urls import patterns, url

urlpatterns = patterns('eatstaticBlogAdmin.views',
	url(r'^$','home'),
    url(r'^api/post-list/$', 'post_list'),
    url(r'^api/post-data/(?P<slug>[\w-]+)/$', 'post_data')
)