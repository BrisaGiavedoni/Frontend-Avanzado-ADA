// NOTA: Inicialmente, el <body> ya tiene la clase 'light-mode' en el HTML.

// 1. Obtener elementos del DOM
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// 2. Definir los nombres de las clases
const lightClass = 'light-mode';
const darkClass = 'dark-mode';

// Función que se ejecuta al hacer clic
function toggleTheme() {
    
    // 🚩 Pista 1: Usar classList.toggle
    // Alternar la presencia de las clases en el <body>
    body.classList.toggle(lightClass);
    body.classList.toggle(darkClass);

    // 🚩 Pista 2: Actualizar el texto del botón
    // Comprobar si el body tiene la clase dark-mode DESPUÉS del toggle
    if (body.classList.contains(darkClass)) {
        // Si ahora está en modo oscuro, el botón debe ofrecer volver al modo claro
        themeToggleBtn.textContent = 'Activar Modo Claro ☀️';
    } else {
        // Si ahora está en modo claro, el botón debe ofrecer ir al modo oscuro
        themeToggleBtn.textContent = 'Activar Modo Oscuro 🌙';
    }
}

// 3. Asignar el evento click
themeToggleBtn.addEventListener('click', toggleTheme);

