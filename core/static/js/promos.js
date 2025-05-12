document.addEventListener('DOMContentLoaded', function () {
    const modales = document.querySelectorAll('[id^="modalPromo"]');

    modales.forEach(modal => {
        const btnAgregar = modal.querySelector('.modal-footer .btn-primary');
        const precioBase = parseInt(modal.querySelector('.contenedor-modal-items-centrados h2').textContent.replace(/\D/g, ''));

        modal.querySelectorAll('.collapse').forEach((colapsable, index) => {
            const extras = colapsable.querySelectorAll('.ingrediente-extra');

            extras.forEach(cb => {
                cb.addEventListener('change', () => {
                    const seleccionados = colapsable.querySelectorAll('.ingrediente-extra:checked');

                    if (seleccionados.length > 3) {
                        cb.checked = false;
                        alert('Solo puedes seleccionar hasta 3 ingredientes extra por producto');
                        return;
                    }

                    actualizarPrecioPromo(modal, precioBase);
                });
            });
        });

        btnAgregar.addEventListener('click', function () {
            const promoId = modal.id.replace('modalPromo', '');
            const promoNombre = modal.querySelector('.contenedor-modal-items-centrados h1').textContent.trim();
            const promoDescripcion = modal.querySelector('.contenedor-modal-items-centrados p').textContent.trim();
            const promoImagen = modal.querySelector('.contenedor-modal-izquierda img').src;

            const colapsables = modal.querySelectorAll('.collapse');
            const seleccionados = [];

            let totalExtras = 0;

            colapsables.forEach((colapsable, index) => {
                const productoSelect = colapsable.querySelector(`select[name="producto_opcional_${index + 1}"]`);
                const aderezosChecks = colapsable.querySelectorAll(`input[name="aderezos_${index + 1}"]:checked`);
                const ingredientesChecks = colapsable.querySelectorAll('.ingrediente-extra:checked');

                const productoNombre = productoSelect?.selectedOptions[0]?.textContent.trim();
                const aderezos = Array.from(aderezosChecks).map(cb => cb.nextElementSibling.textContent.trim());
                const extras = Array.from(ingredientesChecks).map(cb => {
                    const precio = parseFloat(cb.dataset.precio);
                    totalExtras += precio;
                    return {
                        nombre: cb.nextElementSibling.textContent.trim(),
                        precio: precio
                    };
                });

                if (!productoNombre) {
                    alert(`Por favor selecciona un producto para la opción #${index + 1}`);
                    return;
                }

                seleccionados.push({
                    nombre: productoNombre,
                    aderezos: aderezos,
                    extras: extras
                });
            });

            const itemPromo = {
                id: `promo-${promoId}-${Date.now()}`,
                nombre: promoNombre,
                descripcion: seleccionados.map(s => {
                    const partes = [s.nombre];
                    if (s.aderezos.length) partes.push(s.aderezos.join(', '));
                    if (s.extras.length) partes.push(s.extras.map(e => e.nombre).join(', '));
                    return partes.join(', ');
                }).join('\\n'),
                productosPromo: seleccionados,
                precio: precioBase + totalExtras,
                cantidad: 1,
                imagen: promoImagen
            };

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(itemPromo);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            window.location.href = '/carrito/';
        });
    });

    function actualizarPrecioPromo(modal, precioBase) {
        let totalExtras = 0;

        modal.querySelectorAll('.ingrediente-extra:checked').forEach(cb => {
            totalExtras += parseInt(cb.dataset.precio || 0);
        });

        const nuevoTotal = precioBase + totalExtras;
        const boton = modal.querySelector('.modal-footer .btn-primary');
        boton.textContent = `AGREGAR PROMO $${nuevoTotal.toLocaleString('es-CL')}`;
    }
});