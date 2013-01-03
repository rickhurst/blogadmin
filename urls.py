from django.conf.urls import patterns, url

urlpatterns = patterns('eatstaticBlogAdmin.views',
    url(r'^blogadmin/api/post-list/$', 'post_list'),
    url(r'^blogadmin/api/post-data/(?P<slug>[\w-]+)/$', 'post_data')
)