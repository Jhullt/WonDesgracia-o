document.addEventListener('DOMContentLoaded', function () {
    const estadoTienda = document.getElementById('estado-tienda');

    function actualizarEstadoTienda() {
        const ahora = new Date();
        const ahoraChile = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
        // const ahoraChile = new Date();
        //     ahoraChile.setHours(2); // Simula que son las 2 AM
        const hora = ahoraChile.getHours();
        const minutos = ahoraChile.getMinutes();
        const segundos = ahoraChile.getSeconds();

        const apertura = 9;
        const cierre = 23;

        if (hora >= apertura && hora < cierre) {
            const cierreHora = new Date(ahoraChile);
            cierreHora.setHours(cierre, 0, 0, 0);

            const diferencia = cierreHora - ahoraChile;

            const horasRestantes = Math.floor(diferencia / (1000 * 60 * 60));
            const minutosRestantes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundosRestantes = Math.floor((diferencia % (1000 * 60)) / 1000);

            estadoTienda.textContent = `Estamos abiertos, cerramos en: ${horasRestantes}:${String(minutosRestantes).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
        } else {
            estadoTienda.textContent = 'Estamos cerrados';
        }
    }

    actualizarEstadoTienda(); // Mostrar al cargar
    setInterval(actualizarEstadoTienda, 1000); // Actualizar cada segundo
});
