from django.contrib import admin
from .models import Categoria, Producto, Aderezo, IngredienteExtra, Promocion
from django.utils.html import format_html

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre_producto', 'categoria', 'precio_producto', 'stock', 'popular', 'vista_previa')
    readonly_fields = ('vista_previa',)

    def vista_previa(self, obj):
        if obj.imagen_producto:
            return format_html('<img src="{}" width="100" height="100" style="object-fit:cover;" />', obj.imagen_producto.url)
        return "(Sin imagen)"
    vista_previa.short_description = "Vista previa"

@admin.register(Promocion)
class PromocionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio_promocion', 'cantidad_productos_a_elegir')
    filter_horizontal = ('productos_opcionales',)

admin.site.register(Categoria)
admin.site.register(Aderezo)

@admin.register(IngredienteExtra)
class IngredienteExtraAdmin(admin.ModelAdmin):
    list_display = ('nombre_ingrediente', 'precio_adicional')
