
const sidebar = document.getElementById("mySidebar");
const openBtn = document.getElementById("openSidebarBtn");
const closeBtn = document.getElementById("closeSidebarBtn");

// Define el ancho deseado del menú abierto
const sidebarWidth = "250px"; 
const sidebarClosed = "0";

// --- Funciones de Apertura y Cierre ---

function openNav() {
    // 🚩 Abrir: Asigna el ancho definido al sidebar
    sidebar.style.width = sidebarWidth;
}

function closeNav() {
    // 🚩 Cerrar: Asigna 0 al ancho
    sidebar.style.width = sidebarClosed;
}

// --- Event Listeners ---

// 1. Abre el sidebar al hacer clic en el botón
openBtn.addEventListener('click', openNav);

// 2. Cierra el sidebar al hacer clic en la 'x'
closeBtn.addEventListener('click', closeNav);

// --- Pista Opcional: Cerrar al hacer clic fuera ---
// Este código es más avanzado, pero implementa la pista
document.addEventListener('click', function(event) {
    // Si el sidebar está abierto (ancho > 0)
    if (sidebar.style.width === sidebarWidth) {
        // Comprueba si el clic NO fue en el sidebar y NO fue en el botón de abrir
        if (!sidebar.contains(event.target) && event.target !== openBtn) {
            closeNav();
        }
    }
});