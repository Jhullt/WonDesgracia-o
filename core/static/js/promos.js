document.addEventListener('DOMContentLoaded', function () {
    const modales = document.querySelectorAll('[id^="modalPromo"]');

    modales.forEach(modal => {
        const btnAgregar = modal.querySelector('.modal-footer .btn-primary');

        btnAgregar.addEventListener('click', function () {
            const seleccionados = [];
            const promoId = modal.id.replace('modalPromo', '');
            const colapsables = modal.querySelectorAll('.collapse');

            colapsables.forEach((colapsable, index) => {
                const productoSelect = colapsable.querySelector(`select[name="producto_opcional_${index + 1}"]`);
                const aderezosChecks = colapsable.querySelectorAll(`input[name="aderezos_${index + 1}"]:checked`);
                const ingredientesChecks = colapsable.querySelectorAll('.ingrediente-extra:checked');

                const productoId = productoSelect?.value;
                const aderezos = Array.from(aderezosChecks).map(cb => cb.nextElementSibling.textContent.trim());
                const extras = Array.from(ingredientesChecks).map(cb => {
                    return {
                        nombre: cb.nextElementSibling.textContent.trim(),
                        precio: parseFloat(cb.dataset.precio)
                    };
                });

                if (!productoId) {
                    alert(`Por favor selecciona un producto para la opción #${index + 1}`);
                    return;
                }

                seleccionados.push({
                    productoId: productoId,
                    aderezos: aderezos,
                    extras: extras
                });
            });

            // Aquí puedes enviar los datos al servidor o almacenarlos localmente
            console.log('PROMO PERSONALIZADA:', seleccionados);

            // Mensaje final
            alert('Promoción personalizada agregada (ver consola para datos).');

            // Opcional: cerrar modal
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        });
    });
});
