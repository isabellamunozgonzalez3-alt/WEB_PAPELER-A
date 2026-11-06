

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// CARRUSEL

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



const menuToggle = document.querySelector(".menu-toggle");
const floatingMenu = document.querySelector(".floating-menu");

if (menuToggle && floatingMenu) {


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


const pressItems = document.querySelectorAll(".press-item");
const pressPreview = document.querySelector(".press-preview");

if (pressItems.length && pressPreview) {

    const previewSource = pressPreview.querySelector(".press-source");
    const previewQuote = pressPreview.querySelector(".press-quote");
    const previewText = pressPreview.querySelector(".press-text");
    const previewLink = pressPreview.querySelector(".press-read");

    pressItems.forEach(item => {

        item.addEventListener("click", function () {

            if (item.classList.contains("active")) return;

            pressItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            pressPreview.classList.add("is-changing");

            setTimeout(function () {
                previewSource.textContent = item.dataset.source;
                previewQuote.textContent = item.dataset.quote;
                previewText.textContent = item.dataset.excerpt;
                previewLink.href = item.dataset.url;

                pressPreview.classList.remove("is-changing");
            }, 200);

        });

    });
}


const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {

    if (!("IntersectionObserver" in window)) {

        revealItems.forEach(item => item.classList.add("is-visible"));

    } else {

        const revealObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.2
        });

        revealItems.forEach(item => revealObserver.observe(item));
    }
}


// MODO OSCURO

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {

    const root = document.documentElement;

    function updateThemeButton() {

        const isDark = root.classList.contains("dark");

        themeToggle.setAttribute("aria-pressed", String(isDark));

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Activar modo claro" : "Activar modo oscuro"
        );
    }

    updateThemeButton();

    themeToggle.addEventListener("click", function () {

        const isDark = root.classList.toggle("dark");

        try {
            localStorage.setItem("tema", isDark ? "dark" : "light");
        } catch (error) {}

        updateThemeButton();
    });
}