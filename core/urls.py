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
    path('ubicacion/', views.vista_ubicacion, name='ubicacion'),
    path('seguir_pedido/', views.vista_seguir_pedido, name='seguir_pedido'),
    path('carrito/', views.vista_carrito, name='carrito'),
    path('promos/', views.vista_promos, name='promos'),
    path('agregar-al-carrito/<int:producto_id>/', views.agregar_al_carrito, name='agregar_al_carrito'),
    path('agregar-promo-al-carrito/<int:promo_id>/', views.agregar_promo_al_carrito, name='agregar_promo_al_carrito'),
    path('checkout/', views.vista_checkout, name='checkout'),
]
