// 1. OBTENCIÓN DE ELEMENTOS DEL DOM
// Referencia al div donde se mostrarán los mensajes de estado (cargado/error).
const messageDiv = document.getElementById("message"); 
// Referencia al botón que se usará para reintentar la carga.
const retryButton = document.getElementById("retryButton"); 

// 2. FUNCIÓN PRINCIPAL DE PETICIÓN (Lógica de Fetch)
function fetchData() {
    // Intento de fetch: La URL utilizada es inválida y devolverá un status 404.
    fetch("https://jsonplaceholder.typicode.com/INVALIDO")
        .then((response) => {
            // PRIMER .THEN(): Manejo del estado HTTP (404, 500, etc.)
            // response.ok es FALSE para códigos fuera del rango 200-299.
            if (!response.ok) {
                // Si el status es 404 o 500, forzamos un rechazo (throw) de la promesa.
                // Esto dirige la ejecución directamente al bloque .catch().
                throw new Error("Network response was not ok (Status: " + response.status + ")");
            }
            // Si el status es OK (200), convertimos la respuesta a JSON y pasamos al siguiente .then().
            return response.json();
        })
        .then((data) => {
            // SEGUNDO .THEN(): Éxito en la carga de datos y parsing de JSON.
            // Informar al usuario que los datos se cargaron.
            messageDiv.innerHTML = "<p>Datos cargados correctamente.</p>";
            // Ocultar el botón de reintento, ya que la operación fue exitosa.
            retryButton.style.display = "none";
        })
        .catch((error) => {
            // .CATCH(): Manejo de Fallo (Red, CORS o error HTTP forzado por 'throw').
            // Registrar el error en la consola para depuración.
            console.error("Error al obtener datos:", error);
            // Informar al usuario sobre el fallo.
            messageDiv.innerHTML = "<p>No se pudieron cargar los datos.</p>";
            // Mostrar el botón para que el usuario pueda intentar de nuevo.
            retryButton.style.display = "block";
        });
}

// 3. MANEJADOR DE EVENTOS (Lógica de Reintento)
// Agrega un listener para manejar el clic en el botón de reintento.
retryButton.addEventListener("click", () => {
    // Limpia el mensaje de error anterior.
    messageDiv.innerHTML = "";
    // Vuelve a llamar a la función de obtención de datos.
    fetchData();
});


// 4. INICIO DE LA APLICACIÓN
// Llamada inicial para cargar los datos al inicio de la página.
fetchData();