const frases = [
    "“Programar no es solo aprender a usar una computadora; es aprender a construir tu propio futuro.”",
    "“Hoy puede parecer difícil, pero estás aprendiendo algo que te puede abrir puertas que nunca imaginaste.”",
    "“Cada vez que entendés algo nuevo, estás rompiendo una barrera que muchos nunca se animaron a cruzar.”",
    "“Aprender informática no es solo aprender de máquinas: es aprender a pensar, a crear, a imaginar lo imposible.”"
];

const texto = document.getElementById("changing-text");
let index = 0;

function cambiarFrase() {
    // 🔹 1. Aplicar efecto de salida
    texto.classList.remove("fade-in");
    texto.classList.add("fade-out");

    setTimeout(() => {
        // 🔹 2. Cambiar frase
        index = (index + 1) % frases.length;
        texto.textContent = frases[index];

        // 🔹 3. Preparar efecto de entrada
        texto.classList.remove("fade-out");
        texto.classList.add("fade-in");

        // 🔹 4. Limpiar clases al final de la animación
        setTimeout(() => {
            texto.classList.remove("fade-in");
        }, 800); // mismo tiempo que la transición
    }, 800); // espera a que termine el fade-out
}

setInterval(cambiarFrase, 8000);

// Efecto smooth en la pagina
// ==========================

const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 1.2
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelectorAll("iframe").forEach(iframe => {
    iframe.addEventListener("mouseenter", () => lenis.stop());
    iframe.addEventListener("mouseleave", () => lenis.start());
});

// Efecto smooth en las anclas
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Aparicion del boton para volver al top
// ======================================

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// INTERSECTION OBSERVER
// =====================

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal-top, .reveal-bot, .reveal-left, .reveal-right");

    // Detectar si es mobile (menor o igual a 768px)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Cambiar el threshold según el dispositivo
    const observerOptions = {
        threshold: isMobile ? 0.2 : 0.6
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // evita repetir la animación
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
});

// MENU HAMBURGUESA

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Abre / cierra el menú
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Cierra el menú al hacer clic en una opción
document.querySelectorAll('.menu-element a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('show');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Cierra el menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (
        menu.classList.contains('show') &&
        !menu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        menu.classList.remove('show');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// COPIADO DEL CODIGO DEL CLASSROOM

document.querySelectorAll(".copiar-codigo").forEach(h3 => {
    h3.addEventListener("click", () => {
        const span = h3.querySelector("span");
        if (span) {
            const originalHTML = h3.innerHTML;
            const textToCopy = span.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Fade out
                h3.classList.add("fade");

                // Esperar que se desvanezca
                setTimeout(() => {
                    h3.innerHTML = "¡Copiado!";
                    h3.classList.remove("fade"); // Fade in
                }, 300);

                // Volver al texto original
                setTimeout(() => {
                    h3.classList.add("fade");
                    setTimeout(() => {
                        h3.innerHTML = originalHTML;
                        h3.classList.remove("fade");
                    }, 300);
                }, 1500);
            });
        }
    });
});

