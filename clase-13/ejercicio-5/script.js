const RESULTADO_DIV = document.getElementById('resultado');
const URL_A_BUSCAR = 'https://jsonplaceholder.typicode.com/posts/9999'; // URL que devuelve 404

// 1. Iniciar la búsqueda del post.
fetch(URL_A_BUSCAR)
    .then(response => {
        // La promesa fetch SÍ se resuelve aunque el status sea 404.

        // CASO 1: Post no encontrado (Status 404)
        if (response.status === 404) {
            RESULTADO_DIV.textContent = 'Post no encontrado';
            // Detenemos el flujo aquí, el .catch() maneja este rechazo.
            return Promise.reject('Post no encontrado'); 
        } 
        
        // CASO 2: Post encontrado (Status 200)
        // response.ok es true para status 200-299.
        if (response.ok) {
            // Pasamos la respuesta al siguiente .then() como objeto JSON.
            return response.json(); 
        } 
        
        // CASO 3: Otro Error HTTP (ej: 500)
        // Rechazamos la promesa para que el .catch() lo atrape.
        return Promise.reject('Error de servidor: ' + response.status);
    })
    
    // 2. Ejecutar si se recibe el JSON (Solo ocurre en el CASO 2 / Status 200)
    .then(data => {
        // Mostramos el título del post.
        RESULTADO_DIV.textContent = data.title;
    })
    
    // 3. Atrapar Errores (Se ejecuta en el CASO 1, CASO 3, o fallo de red)
    .catch(error => {
        // Solo mostramos un mensaje genérico si no fue el 404 que ya manejamos.
        if (error !== 'Post no encontrado') {
            console.error('Fallo grave:', error);
            RESULTADO_DIV.textContent = 'Ocurrió un error al cargar el post.';
        }
    });