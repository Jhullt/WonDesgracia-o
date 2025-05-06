from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('churrascos/', views.vista_churrascos, name='churrascos'),
    path('lomitos/', views.vista_lomitos, name='lomitos'),
    path('completos/', views.vista_completos, name='completos'),
    path('papas_fritas/', views.vista_papas_fritas, name='papas_fritas'),
    path('ass/', views.vista_ass, name='ass'),
    path('bebestibles/', views.vista_bebestibles, name='bebestibles'),
]
