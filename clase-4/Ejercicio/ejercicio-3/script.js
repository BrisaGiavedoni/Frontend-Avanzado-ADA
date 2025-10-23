document.addEventListener("DOMContentLoaded", function () {
  // Constantes y referencias
  const MAX_CARACTERES = 150;
  const textarea = document.getElementById("comentario");
  const restantesSpan = document.getElementById("restantes");

  // Función para actualizar el contador
  function actualizarContador() {
    const longitudActual = textarea.value.length;
    const restantes = MAX_CARACTERES - longitudActual;

    // Actualiza el texto del contador en tiempo real
    restantesSpan.textContent = restantes;

    // Aplica una clase de alerta si se llega al límite
    if (restantes === 0) {
      restantesSpan.classList.add("alerta");
    } else {
      restantesSpan.classList.remove("alerta");
    }
  }

  // Escucha el evento 'input' (disparado cada vez que el contenido cambia)
  textarea.addEventListener("input", actualizarContador);

  // Inicializar el contador al cargar la página
  actualizarContador();
});
