// Selecciona el botón con id="waitButton" y lo guarda en una variable
const waitButton = document.getElementById("waitButton");

// Agrega un evento que se ejecuta cuando el usuario hace clic en el botón
waitButton.addEventListener("click", () => {

  // Desactiva el botón para que no se pueda hacer clic nuevamente
  waitButton.disabled = true;

  // Cambia el texto del botón para avisar al usuario
  waitButton.textContent = "Espere 3 segundos...";

  // Inicia un temporizador asíncrono de 3 segundos (3000 milisegundos)
  setTimeout(() => {

    // Cuando pasan los 3 segundos → se vuelve a activar el botón
    waitButton.disabled = false;

    // Y se cambia nuevamente el texto del botón
    waitButton.textContent = "¡Listo!";

  }, 3000); // Tiempo de espera: 3000ms = 3 segundos
});
