fetch("https://api.ejemplo-sin-cors.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

//
// Resultados en la consola del navegador:

// Mensaje de error que aparece:
// Error: TypeError: Failed to fetch

// La parte del error que indica que es un problema de CORS es "TypeError: Failed to fetch".
// Esto ocurre porque el servidor de la API no incluye los encabezados CORS necesarios para permitir solicitudes desde dominios diferentes al suyo. Para solucionarlo, el servidor de la API tendría que configurar los encabezados CORS adecuados, como "Access-Control-Allow-Origin", para permitir solicitudes desde el dominio de la página web que está intentando acceder a la API.

//
