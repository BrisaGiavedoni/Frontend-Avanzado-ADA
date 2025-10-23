document.addEventListener("DOMContentLoaded", function () {
  // Capturar elementos
  const form = document.getElementById("loginForm");
  const successMessage = document.getElementById("successMessage");

  // Escuchador del evento 'submit'
  form.addEventListener("submit", function (event) {
    // --- 1. Inicializar el estado y limpiar mensajes ---
    let isValid = true;
    successMessage.textContent = "";

    // Referencias a los contenedores de error
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Limpiar mensajes de error de la ejecución anterior
    emailError.textContent = "";
    passwordError.textContent = "";

    // Obtener valores de los campos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // --- 2. Validaciones Específicas ---

    // a. Validar Email: debe contener @
    if (!email.includes("@")) {
      emailError.textContent = 'El email debe contener el símbolo "@".';
      isValid = false;
    }

    // b. Validar Contraseña: debe tener al menos 6 caracteres
    if (password.length < 6) {
      passwordError.textContent =
        "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    // --- 3. Prevenir el Envío si hay errores ---

    if (!isValid) {
      // Si hay errores, frenamos el envío del formulario [cite: 320, 332, 488]
      event.preventDefault();
    } else {
      // Si es válido, frenamos el envío solo para simular el éxito en el cliente
      event.preventDefault();
      successMessage.textContent =
        "✅ Validación exitosa. Datos listos para ser enviados al servidor.";
      form.reset();
    }
  });
});
