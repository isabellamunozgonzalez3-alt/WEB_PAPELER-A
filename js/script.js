
/* ========================================
   1. LOGO AL HACER SCROLL
======================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ========================================
   2. CARRUSEL DE IMÁGENES
======================================== */

const images = document.querySelectorAll(".carousel-image");

let currentImage = 0;

function changeImage() {
    if (images.length === 0) return;

    images[currentImage].classList.remove("active");

    currentImage = (currentImage + 1) % images.length;

    images[currentImage].classList.add("active");
}

if (images.length > 1) {
    setInterval(changeImage, 4000);
}


/* ========================================
   3. ANIMACIÓN DE ENTRADA DE CONÓCENOS
======================================== */

const aboutContent = document.querySelector(".about-content");

if (aboutContent) {

    const aboutObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                aboutObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    aboutObserver.observe(aboutContent);
}


/* ========================================
   4. MENÚ FLOTANTE
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const floatingMenu = document.querySelector(".floating-menu");

if (menuToggle && floatingMenu) {

    // ABRIR MENÚ

    function openMenu() {

        floatingMenu.classList.add("is-open");

        menuToggle.classList.add("is-active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute("aria-label", "Cerrar menú");
    }


    // CERRAR MENÚ

    function closeMenu() {

        floatingMenu.classList.remove("is-open");

        menuToggle.classList.remove("is-active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menú");
    }


    // CLICK EN HAMBURGUESA

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const menuIsOpen = floatingMenu.classList.contains("is-open");

        if (menuIsOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    // CLICK EN LOS ENLACES

    const menuLinks = floatingMenu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });


    // CLICK FUERA DEL MENÚ

    document.addEventListener("click", function (event) {

        if (
            !floatingMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    // CERRAR CON ESCAPE

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

}
