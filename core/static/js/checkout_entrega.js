document.addEventListener('DOMContentLoaded', () => {
    const btnRetiro = document.getElementById('btn-retiro');
    const btnDelivery = document.getElementById('btn-delivery');
    const seccionRetiro = document.getElementById('seccion-retiro');
    const seccionDelivery = document.getElementById('seccion-delivery');
    const resumen = document.getElementById('resumen-entrega');
    const horaRetiro = document.getElementById('hora-retiro');
    const direccion = document.getElementById('direccion-delivery');
    const btnUbicacion = document.getElementById('btn-ubicacion');

    // Establecer hora por defecto: 10 minutos más
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() + 10);

    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'pm' : 'am';

    horas = horas % 12;
    horas = horas ? horas : 12; // convertir 0 en 12

    const horaFormateada = `${horas}:${minutos} ${ampm}`;
    horaRetiro.value = `${ahora.getHours().toString().padStart(2, '0')}:${minutos}`; // para el input de tipo time

    // Mostrar "Retiro en tienda" por defecto
    seccionRetiro.style.display = 'block';
    seccionDelivery.style.display = 'none';
    btnRetiro.classList.add('btn-dark');
    btnRetiro.classList.remove('btn-outline-dark');
    btnDelivery.classList.add('btn-outline-dark');
    btnDelivery.classList.remove('btn-dark');
    resumen.innerHTML = `<i class="fa-solid fa-shop"></i> Retiro en tienda a las ${horaFormateada}`;

    btnRetiro.addEventListener('click', () => {
        btnRetiro.classList.add('btn-dark');
        btnRetiro.classList.remove('btn-outline-dark');
        btnDelivery.classList.remove('btn-dark');
        btnDelivery.classList.add('btn-outline-dark');

        seccionRetiro.style.display = 'block';
        seccionDelivery.style.display = 'none';

        const horaActual = horaRetiro.value;
        const [h, m] = horaActual.split(':');
        const d = new Date();
        d.setHours(parseInt(h));
        d.setMinutes(parseInt(m));
        let hr = d.getHours();
        const min = d.getMinutes().toString().padStart(2, '0');
        const ampm = hr >= 12 ? 'pm' : 'am';
        hr = hr % 12;
        hr = hr ? hr : 12;
        resumen.innerHTML = `<i class="fa-solid fa-shop"></i> Retiro en tienda a las ${hr}:${min} ${ampm}`;
    });

    btnDelivery.addEventListener('click', () => {
        btnDelivery.classList.add('btn-dark');
        btnDelivery.classList.remove('btn-outline-dark');
        btnRetiro.classList.remove('btn-dark');
        btnRetiro.classList.add('btn-outline-dark');

        seccionDelivery.style.display = 'block';
        seccionRetiro.style.display = 'none';

        if (direccion.value.trim() !== '') {
            resumen.innerHTML = `<i class="fa-solid fa-truck-moving"></i> Dirección: ${direccion.value}`;
        } else {
            resumen.textContent = '';
        }
    });

    horaRetiro.addEventListener('change', () => {
        const [h, m] = horaRetiro.value.split(':');
        const d = new Date();
        d.setHours(parseInt(h));
        d.setMinutes(parseInt(m));
        let hr = d.getHours();
        const min = d.getMinutes().toString().padStart(2, '0');
        const ampm = hr >= 12 ? 'pm' : 'am';
        hr = hr % 12;
        hr = hr ? hr : 12;
        resumen.innerHTML = `<i class="fa-solid fa-shop"></i> Retiro en tienda a las ${hr}:${min} ${ampm}`;
    });

    direccion.addEventListener('input', () => {
        if (direccion.value.trim() === '') {
            resumen.textContent = '';
        } else {
            resumen.innerHTML = `<i class="fa-solid fa-truck-moving"></i> Dirección: ${direccion.value}`;
        }
    });

    btnUbicacion.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Tu navegador no soporta geolocalización');
            return;
        }

        btnUbicacion.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Obteniendo ubicación...';

        navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                .then(response => response.json())
                .then(data => {
                    const direccionDetectada = data.display_name;
                    direccion.value = direccionDetectada;
                    resumen.innerHTML = `<i class="fa-solid fa-truck-moving"></i> Dirección: ${direccionDetectada}`;
                    btnUbicacion.innerHTML = '<i class="fa-solid fa-location-dot"></i> Usar mi ubicación actual';
                })
                .catch(() => {
                    alert('No se pudo traducir la ubicación en dirección');
                    btnUbicacion.innerHTML = '<i class="fa-solid fa-location-dot"></i> Usar mi ubicación actual';
                });
        }

        function error() {
            alert('No se pudo obtener tu ubicación');
            btnUbicacion.innerHTML = '<i class="fa-solid fa-location-dot"></i> Usar mi ubicación actual';
        }
    });
});
