document.addEventListener("DOMContentLoaded", function () {
    const modales = document.querySelectorAll(".modal");

    modales.forEach(modal => {
        const productoId = modal.id.replace("modalProducto", "");
        const checkboxes = modal.querySelectorAll(`input[name="ingredientes_extra"]`);
        const cantidadEl = modal.querySelector(`#cantidad-${productoId}`);
        const btnSumar = modal.querySelector(`.btn-sumar`);
        const btnRestar = modal.querySelector(`.btn-restar`);
        const btnAgregar = modal.querySelector(`#btn-agregar-${productoId}`);

        const precioBase = parseFloat(btnAgregar.dataset.precioBase); // ← CORREGIDO

        let cantidad = 1;

        function actualizarTotal() {
            let totalExtras = 0;
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    totalExtras += parseFloat(cb.dataset.precio);
                }
            });
            const total = (precioBase + totalExtras) * cantidad;
            const totalFormateado = total.toLocaleString('es-CL', { style: 'decimal', maximumFractionDigits: 0 });

            btnAgregar.textContent = `AGREGAR $${totalFormateado}`;
        }

        checkboxes.forEach(cb => cb.addEventListener("change", actualizarTotal));

        btnSumar.addEventListener("click", () => {
            cantidad++;
            cantidadEl.textContent = cantidad;
            actualizarTotal();
        });

        btnRestar.addEventListener("click", () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadEl.textContent = cantidad;
                actualizarTotal();
            }
        });

        actualizarTotal();
    });
});
