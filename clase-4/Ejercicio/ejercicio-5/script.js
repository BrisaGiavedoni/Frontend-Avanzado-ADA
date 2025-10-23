document.addEventListener("DOMContentLoaded", function() {
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");
    
    // 1. Obtenemos la cadena de consulta (query string) completa: ?nombre=Maria
    const queryString = window.location.search; 

    // 2. Usamos URLSearchParams para analizar los parámetros de forma fácil
    const params = new URLSearchParams(queryString);
    
    // 3. Obtenemos el valor asociado a la clave 'nombre'
    const nombre = params.get('nombre');

    // 4. Mostramos el mensaje de bienvenida
    if (nombre) {
        // Si hay un nombre, lo decodificamos por si tenía espacios y lo mostramos
        const nombreDecodificado = decodeURIComponent(nombre);
        mensajeBienvenida.textContent = `¡Bienvenido(a), ${nombreDecodificado}! 🎉`;
    } else {
        mensajeBienvenida.textContent = '¡Hola! Parece que no se proporcionó un nombre.';
    }
});