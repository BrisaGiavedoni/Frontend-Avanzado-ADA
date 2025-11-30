// 1. OBTENCIÓN DE ELEMENTOS DEL DOM
// Referencia al formulario HTML (debe tener id="postForm").
const form = document.getElementById("postForm");
// Referencia al elemento donde se mostrarán los mensajes de estado (éxito/error).
const message = document.getElementById("message");

// 2. MANEJADOR DEL EVENTO SUBMIT
// Agregamos un listener para interceptar el envío del formulario.
form.addEventListener("submit", function (event) {
    // Detenemos la acción por defecto del formulario (que es recargar la página).
    event.preventDefault();
    // 📢 Informamos al usuario que la operación está en curso.
    message.textContent = "Enviando...";

    // 📦 PREPARACIÓN DE DATOS
    // Creamos el objeto con los datos obtenidos de los campos del formulario.
    const postData = {
        // Asume que el formulario tiene campos nombrados 'title' y 'body'.
        title: form.title.value,
        body: form.body.value,
    };

    // 🚀 INICIO DEL FETCH (MÉTODO POST)
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // 👈 Especificamos que queremos CREAR un nuevo recurso.
        headers: {
            // Indicamos al servidor que el cuerpo de la solicitud es JSON.
            "Content-Type": "application/json",
        },
        // Convertimos el objeto JavaScript a una cadena de texto JSON.
        body: JSON.stringify(postData),
    })
        // 3. MANEJO DE LA RESPUESTA HTTP
        .then((response) => {
            // response.ok es true para status 200 (OK) o 201 (Created).
            if (response.ok) {
                // ✅ ÉXITO: Informar al usuario del éxito de la creación.
                message.textContent = "¡Post creado!";
            } else {
                // ❌ FALLO HTTP: Si es 4xx o 5xx, forzamos el flujo al .catch().
                throw new Error("Error al enviar (Status: " + response.status + ")");
            }
        })
        // 4. MANEJO DE ERRORES FINALES
        .catch((error) => {
            // Este bloque se ejecuta ante fallos de red, CORS o el error forzado por el 'throw'.
            console.error("Fallo en la petición POST:", error);
            message.textContent = "Error al enviar";
        });
});