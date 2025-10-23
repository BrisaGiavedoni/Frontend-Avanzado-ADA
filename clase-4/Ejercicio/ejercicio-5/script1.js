document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("nombreForm");

    form.addEventListener("submit", function(event) {
        // 1. Previene el envío por defecto que podría romper la lógica
        event.preventDefault(); 

        const nombreInput = document.getElementById("nombre").value;
        
        // 2. Codifica el nombre para manejar espacios o caracteres especiales (URL encoding)
        const nombreCodificado = encodeURIComponent(nombreInput);

        // 3. Construye la URL de destino con el parámetro de consulta (query parameter)
        // La URL debe coincidir con el nombre del segundo archivo HTML (bienvenida.html)
        const urlDestino = `bienvenida.html?nombre=${nombreCodificado}`;
        
        // 4. Redirige al usuario
        window.location.href = urlDestino;
    });
});