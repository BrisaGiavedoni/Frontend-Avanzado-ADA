
// Obtener elementos del DOM
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelModalBtn");
const confirmBtn = document.querySelector(".confirm-btn"); 


// Función para abrir el modal
function openModal() {
    modal.style.display = "flex"; 
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = "none";
}

// Event Listeners
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

//Cierra el modal al hacer clic en el botón "Sí, Aceptar"
confirmBtn.addEventListener('click', closeModal);


// Cierra el modal al hacer clic en el overlay (fuera del modal-content)
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});