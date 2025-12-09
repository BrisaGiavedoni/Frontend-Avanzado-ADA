// =========================================================
// CONFIGURACIÓN GLOBAL Y DECLARACIÓN DE VARIABLES
// =========================================================

// URL base de la API de posts de prueba (JSONPlaceholder).
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Referencia al elemento <ul> donde se mostrarán los posts (el feed principal).
const postsContainer = document.getElementById("posts-container");

// Referencia al botón para cargar los posts (operación GET).
const loadButton = document.getElementById("load-posts-btn");

// Referencia al elemento <p> donde se muestran los mensajes de estado del formulario POST.
const postStatusElement = document.getElementById("post-status");

// Referencia al elemento <p> donde se muestran los mensajes de estado de GET/PUT/DELETE.
const getStatusElement = document.getElementById("get-status");

// Array que almacenará todos los posts obtenidos de la API (almacenamiento local en memoria).
let allPosts = [];

// Límite por defecto de posts a mostrar en el feed.
const DEFAULT_LIMIT = 10;

// =========================================================
// FUNCIÓN AUXILIAR: Muestra y Oculta el Estado
// =========================================================

/**
 * Muestra un mensaje de estado en un elemento HTML.
 * Los mensajes de éxito desaparecen automáticamente después de 3 segundos.
 * * elementId: ID del elemento HTML (<p>) donde se mostrará el mensaje.
 * message: El texto del mensaje a mostrar.
 * isError: Si es true, aplica la clase 'error'. Si es false, aplica 'success'.
 */
function setStatus(elementId, message, isError = false) {
    // Busca el elemento HTML por su ID y lo guarda en la variable 'statusElement'.
    const statusElement = document.getElementById(elementId);

    // Si el elemento HTML no se encuentra en el DOM, la función termina.
    if (!statusElement) return;

    // Establece el texto del mensaje dentro del elemento de estado.
    statusElement.textContent = message;

    // Asigna las clases CSS dinámicamente: 'error' si es un error, 'success' si es éxito.
    statusElement.className = isError
        ? "error status-message"
        : "success status-message";

    // 🚨 LÓGICA DE AUTO-LIMPIEZA HARDCODEADA (Solo para mensajes de éxito)
    // Comprueba si NO es un mensaje de error.
    if (!isError) {
        // Define una constante de 3000 milisegundos (3 segundos).
        const DURATION = 3000; 

        // Programa una función que se ejecutará después del tiempo definido (3 segundos).
        setTimeout(() => {
            // Borra el texto del mensaje después de 3 segundos.
            statusElement.textContent = ""; 
            // Restablece la clase CSS del elemento a su valor base.
            statusElement.className = "status-message"; 
        }, DURATION);
    }
}

// ---------------------------------------------------------
// REUTILIZABLE: Función para renderizar los posts en el DOM
// ---------------------------------------------------------

/**
 * Limpia el contenedor de posts y renderiza la lista de posts proporcionada.
 * * posts: Array de objetos post a mostrar.
 */
function displayPosts(posts) {
    // Si la lista de posts está vacía, muestra un mensaje indicándolo.
    if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No se encontraron posts.</p>";
        return;
    }

    // Usa .map() para transformar cada objeto 'post' en una cadena de texto (HTML de un <li>).
    postsContainer.innerHTML = posts
        .map(
            (post) => `
                <li class="post-item" id="post-${post.id}"> 
                    <h3>${post.title}</h3>
                    <p id="body-${post.id}">${post.body.substring(
                        0,
                        100 // Limita el cuerpo del post a 100 caracteres.
                    )}...</p>
                    <div class="post-actions">
                        <small>Usuario ID: ${post.userId}</small>
                        
                        <div style="display: flex;">
                            <button 
                                onclick="handleEditClick(${post.id})" 
                                class="btn-action btn-edit"
                            >
                                Editar
                            </button>
                            <button 
                                onclick="handleDeleteClick(${post.id})" 
                                class="btn-action btn-delete"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </li>
            `
        )
        // Une todas las cadenas HTML generadas por .map() en una sola cadena.
        .join("");
}

// =========================================================
// A) CONSUMIR DATOS CON GET (Carga de Posts)
// =========================================================

/**
 * Obtiene los posts de la API y los muestra en el feed.
 * * limit: Número máximo de posts a mostrar.
 */
async function fetchPosts(limit = DEFAULT_LIMIT) {
    // Guarda el límite final de posts a mostrar.
    const finalLimit = limit;

    // Inicia un bloque try/catch para manejar errores de red o API.
    try {
        // Muestra un mensaje de carga en el contenedor principal.
        postsContainer.innerHTML = "Cargando posts...";

        // Realiza la solicitud GET a la URL base de la API.
        const response = await fetch(API_BASE_URL);

        // Si la respuesta HTTP no es exitosa (ej. 404, 500), lanza un error.
        if (!response.ok) {
            const statusText = response.statusText || "Error desconocido";
            throw new Error(`Error HTTP: ${response.status}. ${statusText}`);
        }

        // Convierte la respuesta a un objeto JavaScript (JSON).
        const data = await response.json();

        // 1. ALMACENAR DATOS LOCALMENTE
        // Almacena el array completo de posts en la variable local.
        allPosts = data;

        // Limita el array de posts para la visualización (por defecto, los primeros 10).
        const limitedData = allPosts.slice(0, finalLimit);

        // Renderiza los posts limitados en el DOM.
        displayPosts(limitedData);

        // 🚨 MENSAJE DE ÉXITO (GET): Muestra un mensaje de éxito que se auto-limpia.
        setStatus("get-status", `✅ ${limitedData.length} posts cargados.`, false);
    } catch (error) {
        // Muestra un mensaje de error en el contenedor de posts.
        postsContainer.innerHTML =
            '<p class="error">Error al cargar los posts.</p>';
        // Muestra un mensaje de error en el estado GET que NO se auto-limpia.
        setStatus("get-status", `❌ ${error.message}`, true);
        // Imprime el error completo en la consola.
        console.error("Error al obtener posts:", error);
    }
}

// Listener del botón "Cargar Posts"
// Asigna un manejador de eventos al botón para ejecutar fetchPosts al hacer clic.
loadButton.addEventListener("click", () => {
    fetchPosts(DEFAULT_LIMIT);
});

// =========================================================
// B) MANIPULAR RECURSOS (POST, PUT, DELETE)
// =========================================================

// --- POST: Crear un nuevo recurso (con actualización local) ---
// Busca el formulario de creación de posts y añade un listener para el evento 'submit'.
document
    .getElementById("create-post-form")
    .addEventListener("submit", async (e) => {
        // Previene la acción por defecto del formulario (recargar la página).
        e.preventDefault();

        // Obtiene los valores de los campos de título y cuerpo del nuevo post.
        const title = document.getElementById("new-title").value;
        const body = document.getElementById("new-body").value;
        // Crea el objeto de datos a enviar.
        const newPost = { title, body, userId: 1 };

        try {
            // Realiza la solicitud POST a la API.
            const response = await fetch(API_BASE_URL, {
                method: "POST", // Especifica el método POST.
                headers: { "Content-Type": "application/json" }, // Indica que el cuerpo es JSON.
                body: JSON.stringify(newPost), // Convierte el objeto a una cadena JSON.
            });

            // Lanza un error si la solicitud POST no fue exitosa.
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: Falló la creación.`);
            }

            // Parsea la respuesta del servidor (contiene el post creado con ID simulada).
            const createdPost = await response.json();

            // 1. Actualización Local
            // Añade el nuevo post al principio del array local.
            allPosts.unshift(createdPost);

            // Refresca la vista
            // Vuelve a renderizar la lista con los primeros 10 posts (incluyendo el nuevo).
            const limitedData = allPosts.slice(0, DEFAULT_LIMIT);
            displayPosts(limitedData);

            // 🚨 MENSAJE DE ÉXITO (POST): Muestra mensaje de éxito.
            setStatus(
                "post-status",
                `✅ POST exitoso. Post creado, Lista actualizada.`,
                false
            );
            // Limpia los campos del formulario.
            e.target.reset(); 
        } catch (error) {
            // Muestra mensaje de error si falla la creación.
            setStatus("post-status", `❌ Error: ${error.message}`, true);
            console.error("Error en POST:", error);
        }
    });

// --- PUT: Manejo de Edición Directa (PUT) ---
/**
 * Solicita un nuevo título y cuerpo al usuario y realiza la actualización (PUT).
 * * id: ID del post a editar.
 */
async function handleEditClick(id) {
    // Busca el post en el array local por su ID.
    const post = allPosts.find((p) => p.id === id);
    // Si no lo encuentra, termina la función.
    if (!post) return;

    // 1. Solicitar el nuevo título usando un prompt, con el valor actual como default.
    const newTitle = prompt(
        `Editando Post ${id}: Ingresa nuevo título:`,
        post.title
    );

    // 2. Solicitar el nuevo cuerpo (contenido) usando un prompt.
    const newbody = prompt(
        `Editando Post ${id}: Ingresa nuevo contenido:`,
        post.body
    );

    // 3. Validaciones
    // Valida que el título no sea nulo o vacío después de quitar espacios.
    if (newTitle === null || newTitle.trim() === "") {
        if (newTitle !== null) alert("El título no puede estar vacío.");
        return;
    }

    // Valida que el cuerpo no sea nulo o vacío.
    if (newbody === null || newbody.trim() === "") {
        if (newbody !== null) alert("El contenido no puede estar vacío.");
        return;
    }

    // Crea el objeto de datos con los nuevos valores para el PUT.
    const updatedData = {
        id: id,
        title: newTitle,
        body: newbody, 
        userId: post.userId,
    };

    try {
        // Realiza la solicitud PUT al endpoint específico del post.
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT", // Especifica el método PUT.
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        // Lanza un error si la actualización no fue exitosa.
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: Falló la actualización.`);
        }

        // 1. Actualización Local
        // Encuentra el índice del post en el array.
        const postIndex = allPosts.findIndex((p) => p.id === id);
        if (postIndex !== -1) {
            // Actualiza el post en el array local con los nuevos datos.
            allPosts[postIndex] = { ...allPosts[postIndex], ...updatedData };

            // 2. Actualización Directa del DOM
            // Obtiene el elemento <li> del post.
            const postElement = document.getElementById(`post-${id}`);
            if (postElement) {
                // Actualiza el texto del <h3> (título).
                postElement.querySelector("h3").textContent = newTitle;

                // Obtiene el elemento <p> del cuerpo.
                const bodyElement = postElement.querySelector(`#body-${id}`);
                if (bodyElement) {
                     // Actualiza el texto del cuerpo, truncándolo si es necesario.
                    bodyElement.textContent = newbody.substring(0, 100) + '...';
                }
            }
        }

        // 🚨 MENSAJE DE ÉXITO (PUT): Muestra mensaje de éxito.
        setStatus(
            "get-status",
            `✅ Post ID ${id} actualizado directamente.`,
            false
        );
    } catch (error) {
        // Muestra mensaje de error si falla el PUT.
        setStatus(
            "get-status",
            `❌ Error al editar Post ${id}: ${error.message}`,
            true
        );
        console.error("Error en PUT (directo):", error);
    }
}

// --- DELETE: Manejo de Eliminación Directa (DELETE) ---
/**
 * Solicita confirmación y elimina un post (DELETE).
 * * id: ID del post a eliminar.
 */
async function handleDeleteClick(id) {
    // Pide confirmación al usuario antes de proceder; si cancela, termina.
    if (!confirm(`¿Estás seguro de que quieres eliminar el Post ID ${id}?`)) {
        return;
    }

    try {
        // Realiza la solicitud DELETE al endpoint específico del post.
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE", // Especifica el método DELETE.
        });

        // Lanza un error si la eliminación no fue exitosa.
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: Falló la eliminación.`);
        }

        // 1. Actualización Local
        // Guarda la longitud inicial del array para verificar el cambio.
        const initialLength = allPosts.length;
        // Crea un nuevo array excluyendo el post con la ID eliminada.
        allPosts = allPosts.filter((post) => post.id !== id);

        // 2. Eliminación del DOM
        // Si el array local se redujo (es decir, el post existía y fue eliminado):
        if (initialLength > allPosts.length) {
            // Busca el elemento <li> en el DOM.
            const postElement = document.getElementById(`post-${id}`);
            if (postElement) {
                // Elimina el elemento <li> del DOM inmediatamente.
                postElement.remove();
            }
        }

        // 🚨 MENSAJE DE ÉXITO (DELETE): Muestra mensaje de éxito.
        setStatus("get-status", `✅ Post ID ${id} eliminado directamente.`, false);
    } catch (error) {
        // Muestra mensaje de error si falla el DELETE.
        setStatus(
            "get-status",
            `❌ Error al eliminar Post ${id}: ${error.message}`,
            true
        );
        console.error("Error en DELETE (directo):", error);
    }
}