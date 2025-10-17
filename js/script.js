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
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar la clase visible manteniendo el tipo de animación
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // evita repetir la animación
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
});