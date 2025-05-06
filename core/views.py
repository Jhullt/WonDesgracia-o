from django.shortcuts import render
from .models import Producto

def index(request):
    productos = Producto.objects.filter(popular=True)
    return render(request, 'index.html', {'productos': productos})

def vista_churrascos(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/churrascos.html', {'productos': productos})

def vista_lomitos(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/lomitos.html', {'productos': productos})

def vista_completos(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/completos.html', {'productos': productos})

def vista_papas_fritas(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/papas_fritas.html', {'productos': productos})

def vista_ass(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/ass.html', {'productos': productos})

def vista_bebestibles(request):
    productos = Producto.objects.all()
    return render(request, 'barra_nav/bebestibles.html', {'productos': productos})