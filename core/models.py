from django.db import models
from cloudinary.models import CloudinaryField

# CATEGORÍAS (ej: Churrascos, Bebidas, Papas, Promociones)
class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_categoria

# ADEREZOS FIJOS (aparecen siempre que el producto lo permita)
class Aderezo(models.Model):
    nombre_aderezo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_aderezo

# INGREDIENTES OPCIONALES CON PRECIO ADICIONAL
class IngredienteExtra(models.Model):
    nombre_ingrediente = models.CharField(max_length=100)
    precio_adicional = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.nombre_ingrediente

# PRODUCTOS (Churrascos, Bebidas, etc.)
class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre_producto = models.CharField(max_length=100)
    imagen_producto = CloudinaryField('imagen_producto')
    descripcion_producto = models.TextField()
    precio_producto = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField()
    popular = models.BooleanField(default=False)
    permite_aderezos = models.BooleanField(default=True)
    # Este campo sigue existiendo por si quieres registrar qué extras fueron seleccionados
    ingredientes_extras = models.ManyToManyField(IngredienteExtra, blank=True)

    def __str__(self):
        return self.nombre_producto

# PROMOCIONES (como el bucket o completo doble)
class Promocion(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio_promocion = models.DecimalField(max_digits=8, decimal_places=2)
    productos_opcionales = models.ManyToManyField(Producto, related_name='promos', blank=True)
    cantidad_opciones = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.nombre
