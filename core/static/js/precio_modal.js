document.addEventListener("DOMContentLoaded", function () {
    const modales = document.querySelectorAll(".modal");

    modales.forEach(modal => {
        const productoId = modal.id.replace("modalProducto", "");
        const checkboxes = modal.querySelectorAll(`input[name="ingredientes_extra"]`);
        const cantidadEl = modal.querySelector(`#cantidad-${productoId}`);
        const btnSumar = modal.querySelector(`.btn-sumar`);
        const btnRestar = modal.querySelector(`.btn-restar`);
        const btnAgregar = modal.querySelector(`#btn-agregar-${productoId}`);

        const precioBase = parseFloat(btnAgregar.dataset.precioBase);
        const stock = parseInt(btnAgregar.dataset.stock);  // Nuevo: stock desde atributo

        let cantidad = 1;

        // Si no hay stock, deshabilita el botón y muestra alerta
        if (stock <= 0) {
            btnAgregar.disabled = true;
            btnAgregar.textContent = "NO DISPONIBLE";
            btnAgregar.style.backgroundColor = "#aaa";
            btnAgregar.addEventListener("click", function () {
                alert("Lo lamentamos, este producto no está disponible por falta de stock.");
            });
            return; // Salimos del setup para este modal
        }

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

        // Limitar selección a 3 ingredientes extra
        checkboxes.forEach(cb => {
            cb.addEventListener("change", function () {
                const seleccionados = Array.from(checkboxes).filter(c => c.checked);
                if (seleccionados.length > 3) {
                    this.checked = false;
                    alert("Solo puedes seleccionar hasta 3 ingredientes extra.");
                }
                actualizarTotal();
            });
        });

        btnSumar.addEventListener("click", () => {
            if (cantidad < stock) {
                cantidad++;
                cantidadEl.textContent = cantidad;
                actualizarTotal();
            } else {
                alert("Has alcanzado el stock máximo disponible.");
            }
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