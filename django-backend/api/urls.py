from . import views

from django.conf.urls import url

urlpatterns = [
    url(r'^api/dsrs/count$', views.count, name='count'),
    url(r'^api/dsrs/(?P<pk>[0-9]+)/$', views.dsr, name='count'),
    url(r'^api/fulldsr/', views.fullDSR, name='count'),
    url(r'^api/statistics/(?P<pk>[0-9]+)/$', views.statistics, name='count'),
    url(r'^api/currency/(?P<pk>[0-9]+)/$', views.currency, name='count'),
    url(r'^api/all_currency/', views.all_currency, name='count'),
    url(r'^api/territory/(?P<pk>[0-9]+)/$', views.territory, name='count'),
    url(r'^api/territories/', views.allTerritories, name='count'),
    url(r'^api/periodicity/(?P<pk>[0-9]+)/$', views.periodicity, name='count'),
]
