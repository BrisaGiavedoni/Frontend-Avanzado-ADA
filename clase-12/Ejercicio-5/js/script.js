// Selecciona el botón del HTML
const loadData = document.getElementById("loadData");

// Selecciona el párrafo donde mostraremos mensajes
const message = document.getElementById("message");

// Agregamos un evento al botón
loadData.addEventListener("click", async () => {

  // Mostramos mensaje temporal
  message.textContent = "Cargando datos...";

  try {
    // Intentamos hacer una petición a una URL INCORRECTA
    const res = await fetch("https://jsonplaceholder.typicode.com/INVALIDO");

    // Si la respuesta no es válida (404, 500, etc.)
    if (!res.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    // Convertimos la respuesta a JSON
    const data = await res.json();

    // Mostramos algo del resultado si funcionara (pero nunca funcionará)
    message.textContent = "Datos cargados correctamente (aunque la URL es inválida)";

  } catch (error) {
    // Si ocurre CUALQUIER error, se ejecuta este bloque

    message.textContent = "No se pudieron cargar los datos. Intente más tarde.";
  }
});


/*
Flujo asíncrono:
1. Al hacer clic, mostramos "Cargando datos..."
2. Intentamos pedir datos con fetch usando async/await.
3. Como la URL es incorrecta, fetch o res.ok fallan.
4. El error es capturado por catch.
5. Se muestra un mensaje amigable al usuario.
*/
