document.addEventListener('DOMContentLoaded', function () {
    const carritoItems = document.getElementById('carrito-items');
    const cantidadProductos = document.getElementById('cantidad-productos');
    const totalCompra = document.getElementById('total-compra');

    function renderCarrito() {
        carritoItems.innerHTML = '';
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach((item, index) => {
            let textoAderezos = item.aderezos?.map(a => a.nombre).join(', ') || '';
            let textoExtras = item.extras?.map(e => e.nombre).join(', ') || '';
            let textoFinal = [textoAderezos, textoExtras].filter(Boolean).join(', ');

            let precioExtras = item.extras?.reduce((acc, e) => acc + e.precio, 0) || 0;
            const precioUnitario = item.precio + precioExtras;
            const precioFinal = precioUnitario * item.cantidad;

            total += precioFinal;
            cantidadTotal += item.cantidad;

            const productoHTML = `
                <div class="contenedor-carta-carrito" data-index="${index}">
                    <div class="contenedor-izquierda-carrito">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="contenedor-derecha-carrito">
                        <div class="contenedor-arriba-carrito">
                            <h1>${item.nombre}</h1>
                            <p>${textoFinal}</p>
                        </div>
                        <div class="contenedor-abajo-carrito">
                            <div class="contenedor-button-carta-carrito">
                                <button class="btn-restar" data-index="${index}">
                                    <i class="fa-solid ${item.cantidad > 1 ? 'fa-minus' : 'fa-trash'}"></i>
                                </button>
                                <h1>${item.cantidad}</h1>
                                <button class="btn-sumar" data-index="${index}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <h1>$${precioFinal.toLocaleString('es-CL')}</h1>
                        </div>
                    </div>
                </div>
            `;
            carritoItems.insertAdjacentHTML('beforeend', productoHTML);
        });

        cantidadProductos.textContent = `cantidad productos (${cantidadTotal})`;
        totalCompra.textContent = `$${total.toLocaleString('es-CL')}`;

        const contadorHeader = document.getElementById('contador-carrito');
        if (contadorHeader) {
            contadorHeader.textContent = `CARRITO (${cantidadTotal})`;
        }
    }

    renderCarrito();

    document.addEventListener('click', function (e) {
        const sumarBtn = e.target.closest('.btn-sumar');
        const restarBtn = e.target.closest('.btn-restar');

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (sumarBtn) {
            const index = parseInt(sumarBtn.dataset.index);
            carrito[index].cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }

        if (restarBtn) {
            const index = parseInt(restarBtn.dataset.index);
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            } else {
                carrito.splice(index, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    });
});
