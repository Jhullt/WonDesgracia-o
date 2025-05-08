document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.productos-swiper', {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: false, // ❌ Evita clonar slides (problemas con modales)
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 1,
            },
        },
    });
});
