from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto, Aderezo, IngredienteExtra, Promocion

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
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/lomitos.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

def vista_completos(request):
    productos = Producto.objects.all()
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/completos.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

def vista_papas_fritas(request):
    productos = Producto.objects.all()
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/papas_fritas.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

def vista_ass(request):
    productos = Producto.objects.all()
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/ass.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

def vista_bebestibles(request):
    productos = Producto.objects.all()
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/bebestibles.html', {
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })

def vista_ubicacion(request):
    return render(request, 'barra_nav/ubicacion.html')

def vista_seguir_pedido(request):
    return render(request, 'barra_nav/seguir_pedido.html')

def vista_promos(request):
    promociones = Promocion.objects.all()
    productos = Producto.objects.filter(stock__gt=0)
    aderezos = Aderezo.objects.all()
    ingredientes_extras = IngredienteExtra.objects.all()
    return render(request, 'barra_nav/promos.html', {
        'promociones': promociones,
        'productos': productos,
        'aderezos': aderezos,
        'ingredientes_extras': ingredientes_extras,
    })


def vista_carrito(request):
    carrito = request.session.get('carrito', [])
    total = sum(item['precio'] * item['cantidad'] for item in carrito)
    total_cantidad = sum(item['cantidad'] for item in carrito)
    return render(request, 'barra_nav/carrito.html', {
        'carrito': carrito,
        'total': total,
        'cantidad_total': total_cantidad,
    })

def agregar_al_carrito(request, producto_id):
    if request.method == 'POST':
        producto = Producto.objects.get(id=producto_id)
        cantidad = int(request.POST.get('cantidad', 1))
        aderezos = request.POST.getlist('aderezos')
        extras_ids = request.POST.getlist('extras')
        extras = IngredienteExtra.objects.filter(id__in=extras_ids)

        precio_total = producto.precio_producto
        ingredientes_extra = []
        for extra in extras:
            precio_total += extra.precio_adicional
            ingredientes_extra.append(extra.nombre_ingrediente)

        precio_total *= cantidad

        item = {
            'id': producto.id,
            'nombre': producto.nombre_producto,
            'descripcion': ', '.join(ingredientes_extra),
            'precio': precio_total,
            'cantidad': cantidad,
            'imagen': producto.imagen_producto.url
        }

        carrito = request.session.get('carrito', [])
        carrito.append(item)
        request.session['carrito'] = carrito
        return redirect('carrito')
    return redirect('index')

def agregar_promo_al_carrito(request, promo_id):
    if request.method == 'POST':
        promocion = get_object_or_404(Promocion, id=promo_id)
        cantidad = int(request.POST.get('cantidad', 1))

        descripcion = promocion.descripcion or "Promoción especial"
        imagen = promocion.imagen_promocion.url if promocion.imagen_promocion else "/static/img/promo_default.png"

        precio_total = promocion.precio_promocion * cantidad

        item = {
            'id': f"promo-{promocion.id}",
            'nombre': promocion.nombre,
            'descripcion': descripcion,
            'precio': promocion.precio_promocion,
            'cantidad': cantidad,
            'imagen': imagen
        }

        carrito = request.session.get('carrito', [])
        carrito.append(item)
        request.session['carrito'] = carrito
        return redirect('carrito')
    return redirect('promos')

def vista_checkout(request):
    return render(request, 'pagar/checkout.html')
