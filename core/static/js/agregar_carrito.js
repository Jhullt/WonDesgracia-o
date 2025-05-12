document.addEventListener('DOMContentLoaded', function () {
    const botonesAgregar = document.querySelectorAll('[id^="btn-agregar-"]');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const productoId = this.id.split('btn-agregar-')[1];
            const modal = document.querySelector(`#modalProducto${productoId}`);
            const nombre = modal.querySelector('.contenedor-modal-items-centrados h1').innerText;
            const descripcion = modal.querySelector('.contenedor-modal-items-centrados p').innerText;
            const precioBase = parseInt(this.dataset.precioBase);
            const imagen = modal.querySelector('.contenedor-modal-izquierda img').src;
            const cantidad = parseInt(document.getElementById(`cantidad-${productoId}`).innerText);

            const aderezosSeleccionados = Array.from(modal.querySelectorAll(`input[id^="aderezo${productoId}"]:checked`)).map(cb => {
                return {
                    nombre: cb.nextElementSibling.innerText
                };
            });

            const extrasSeleccionados = Array.from(modal.querySelectorAll(`input[name="ingredientes_extra"]:checked`)).map(cb => {
                return {
                    nombre: cb.nextElementSibling.innerText,
                    precio: parseInt(cb.dataset.precio)
                };
            });

            // Calcular total de extras seleccionados
            const totalExtras = extrasSeleccionados.reduce((acc, extra) => acc + extra.precio, 0);
            const precioFinal = (precioBase + totalExtras) * cantidad;

            const producto = {
                id: productoId,
                nombre,
                descripcion,
                precio: precioFinal,
                imagen,
                cantidad,
                aderezos: aderezosSeleccionados,
                extras: extrasSeleccionados
            };

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const indexExistente = carrito.findIndex(item =>
                item.id === producto.id &&
                JSON.stringify(item.extras) === JSON.stringify(producto.extras) &&
                JSON.stringify(item.aderezos) === JSON.stringify(producto.aderezos)
            );

            if (indexExistente !== -1) {
                carrito[indexExistente].cantidad += producto.cantidad;
                carrito[indexExistente].precio += producto.precio;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            window.location.href = '/carrito/';
        });
    });
});
