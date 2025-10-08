const frases = [
    "Programar no es solo aprender a usar una computadora; es aprender a construir tu propio futuro.",
    "Hoy puede parecer difícil, pero estás aprendiendo algo que te puede abrir puertas que nunca imaginaste.",
    "Cada vez que entendés algo nuevo, estás rompiendo una barrera que muchos nunca se animaron a cruzar.",
    "Aprender informática no es solo aprender de máquinas: es aprender a pensar, a crear, a imaginar lo imposible."
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

// Cambia cada 5 segundos
setInterval(cambiarFrase, 8000);