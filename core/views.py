from django.shortcuts import render
from .models import Producto, Aderezo, IngredienteExtra

def index(request):
    productos = Producto.objects.filter(popular=True)
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'index.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })


def vista_churrascos(request):
    productos = Producto.objects.all()
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/churrascos.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

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
