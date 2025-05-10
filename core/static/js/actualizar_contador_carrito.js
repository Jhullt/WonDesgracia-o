document.addEventListener('DOMContentLoaded', function () {
    const enlaceCarrito = document.getElementById('contador-carrito');

    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        enlaceCarrito.textContent = `CARRITO (${totalCantidad})`;
    }

    actualizarContadorCarrito();
});
