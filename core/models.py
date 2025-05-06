from django.db import models
from cloudinary.models import CloudinaryField

# CATEGORÍAS DE PRODUCTO
class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_categoria

# ADEREZOS QUE SE PUEDEN AGREGAR A LOS PRODUCTOS
class Aderezo(models.Model):
    nombre_aderezo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_aderezo

# PRODUCTOS QUE PERTENECEN A UNA CATEGORÍA Y PUEDEN TENER ADEREZOS
class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre_producto = models.CharField(max_length=100)
    imagen_producto = CloudinaryField('imagen_producto')
    descripcion_producto = models.TextField()
    precio_producto = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField()
    aderezos = models.ManyToManyField('Aderezo', blank=True)
    popular = models.BooleanField(default=False)
    permite_aderezos = models.BooleanField(default=True)  # Nuevo campo

    def __str__(self):
        return self.nombre_producto

# PROMOCIONES FLEXIBLES QUE INCLUYEN VARIAS OPCIONES
class Promocion(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio_promocion = models.DecimalField(max_digits=8, decimal_places=2)
    productos_opcionales = models.ManyToManyField(Producto, related_name='promos', blank=True)
    cantidad_opciones = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.nombre
