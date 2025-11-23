const loadPosts = document.getElementById("loadPosts"); // Obtener el botón que carga los posts
const loading = document.getElementById("loadingMessage"); // Obtener el elemento donde mostraremos "Cargando..."
const error = document.getElementById("errorMessage"); // Obtener el elemento donde mostraremos errores
const postsList = document.getElementById("postsList"); // Obtener el <ul> donde iremos agregando los <li> con títulos

loadPosts.addEventListener("click", () => { // Añadir un listener al botón que se ejecuta al hacer clic

  loading.textContent = "Cargando..."; // Mostrar texto de carga al usuario
  error.textContent = ""; // Limpiar cualquier mensaje de error previo
  postsList.innerHTML = ""; // Vaciar la lista de posts antes de cargar nuevos

  // Llamado a la API con fetch
  fetch("https://jsonplaceholder.typicode.com/posts") // Hacer la petición GET a la API pública
    .then(res => res.json()) // Convertir la respuesta (Response) a JSON (promesa que resuelve con los datos)
    .then(posts => { // Cuando los datos estén listos, ejecutamos esta función con "posts"
      loading.textContent = ""; // Quitar el mensaje de "Cargando..." porque ya llegó la respuesta

      posts.forEach(post => { // Recorrer cada post del array recibido
        const li = document.createElement("li"); // Crear un elemento <li> nuevo
        li.textContent = post.title; // Poner el título del post como texto del <li>
        postsList.appendChild(li); // Agregar el <li> al <ul> en el DOM
      });
    })
    .catch(() => { // Si ocurre cualquier error (red, parseo, etc.), entramos aquí
      loading.textContent = ""; // Quitar el mensaje de "Cargando..."
      error.textContent = "Error al cargar los posts"; // Mostrar mensaje de error al usuario
    });
}); // Fin del listener del botón

/*
Flujo:
1. Se muestra "Cargando..."                // Indica al usuario que la petición está en curso
2. fetch realiza petición ASÍNCRONA        // La petición no bloquea el hilo principal
3. then maneja respuesta exitosa          // Cuando llega la respuesta, la procesamos y actualizamos el DOM
4. catch se ejecuta si hay error          // Si algo falla, informamos al usuario
*/
