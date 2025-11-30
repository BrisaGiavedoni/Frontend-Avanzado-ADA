// 1. OBTENCIÓN DE ELEMENTOS DEL DOM
// Referencia al div donde se muestra el mensaje de estado ("Cargando...").
const messageDiv = document.getElementById("message");
// Referencia a la lista (<ul>) donde se inyectarán los títulos de los posts.
const postList = document.getElementById("post-list");

// 2. INICIO DE LA PETICIÓN FETCH
// Se solicita el array de posts al endpoint de JSONPlaceholder.
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    // PRIMER .THEN(): Manejo del estado HTTP.
    // response.ok es true si el status es 200-299.
    if (!response.ok) {
        // Si el status es 404 o 500, lanzamos un error que salta al .catch().
        throw new Error("Error en la respuesta de la API (Status: " + response.status + ")");
    }
    // Si la respuesta es OK, se devuelve la promesa de conversión a JSON para el siguiente .then().
    return response.json();
  })
  .then((data) => {
    // SEGUNDO .THEN(): Recepción exitosa de los datos (el array de posts).
    // Ocultamos el mensaje de "Cargando..." o estado.
    messageDiv.style.display = "none"; 
    
    // Iteramos sobre el array de posts recibido.
    data.forEach((post) => {
      // Creamos un nuevo elemento <li> por cada post.
      const li = document.createElement("li");
      // Asignamos el título del post como contenido del <li>.
      li.textContent = post.title;
      // Agregamos el <li> a la lista <ul> en el DOM.
      postList.appendChild(li);
    });
  })
  .catch((error) => {
    // .CATCH(): Manejo de Fallo (Red, CORS, o error HTTP forzado en el primer .then()).
    // Registramos el error en la consola.
    console.error("Error al procesar la solicitud:", error);
    // Mostramos el mensaje de error en el div de estado al usuario.
    messageDiv.textContent = "Error al cargar los posts: " + error.message;
  });