$(function () {

    AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });

    if (window.matchMedia('(hover: hover)').matches) {
        $('.tarjeta')
            .on('mousemove', function (e) {
                const $marco = $(this).find('.marco');
                const caja = this.getBoundingClientRect();
                const x = (e.clientX - caja.left) / caja.width - 0.5;
                const y = (e.clientY - caja.top) / caja.height - 0.5;
                $marco.addClass('tilt-activo').css('transform',
                    'perspective(700px) translateY(-6px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg)');
            })
            .on('mouseleave', function () {
                $(this).find('.marco').removeClass('tilt-activo').css('transform', '');
            });
    }

    $(window).on('scroll', function () {
        const px = Math.min($(this).scrollTop() * 0.02, 5) + 'px';
        document.querySelectorAll('.damasco').forEach(function (el) {
            el.style.setProperty('--desplazo', px);
        });
    });

    
    $('.marco img').each(function () {
        const img = this;
        function respaldo() {
            $(img).replaceWith('<span class="emoji-respaldo" aria-hidden="true">' + $(img).data('emoji') + '</span>');
        }
        $(img).on('error', respaldo);
        if (img.complete && img.naturalWidth === 0) respaldo();
    });
});
