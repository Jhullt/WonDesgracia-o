document.addEventListener('DOMContentLoaded', function () {
    const estadoTiendaTexto = document.getElementById('estado-tienda');
    const estadoTiendaValor = document.getElementById('estado-tienda-valor');

    function actualizarEstadoTienda() {
        const ahora = new Date();
        const ahoraChile = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Santiago' }));

        // Simular hora para pruebas (ej: 2:00 AM)
        ahoraChile.setHours(2, 0, 0); 

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

            estadoTiendaTexto.textContent = `Estamos abiertos, cerramos en: ${horasRestantes}:${String(minutosRestantes).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
            estadoTiendaValor.value = 'abierto';
        } else {
            estadoTiendaTexto.textContent = 'Estamos cerrados';
            estadoTiendaValor.value = 'cerrado';
        }
    }

    actualizarEstadoTienda(); // Al cargar
    setInterval(actualizarEstadoTienda, 1000); // Cada segundo
});
