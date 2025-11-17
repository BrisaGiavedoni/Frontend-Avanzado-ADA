// Cuando todo el DOM termina de cargarse, se ejecutan las funciones iniciales
document.addEventListener("DOMContentLoaded", function () {
  initUsers(); // Inicializa usuarios por defecto si no existen
  setupEventListeners(); // Configura los listeners de los formularios
});

// Función que crea usuarios iniciales si aún no hay guardados en localStorage
function initUsers() {
  // Si NO existe la clave "users" en localStorage...
  if (!localStorage.getItem("users")) {
    // Crea dos usuarios iniciales para prueba
    const initialUsers = [
      {
        username: "admin",
        email: "admin@ejemplo.com",
        password: "admin123",
      },
      {
        username: "estudiante",
        email: "estudiante@ejemplo.com",
        password: "estudiante123",
      },
    ];

    // Guarda los usuarios iniciales como JSON en localStorage
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }
}

// Configura los eventos para los formularios de login y registro
function setupEventListeners() {
  const loginForm = document.getElementById("login-form"); // Formulario login
  const registerForm = document.getElementById("register-form"); // Formulario registro

  // Si existe el formulario de login, le agregamos el submit
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Si existe el formulario de registro, le agregamos el submit
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
}

// Maneja el evento de inicio de sesión
function handleLogin(e) {
  e.preventDefault(); // Evita recargar la página

  const username = document.getElementById("username").value.trim(); // Usuario/email
  const password = document.getElementById("password").value; // Contraseña
  const remember = document.getElementById("remember").checked; // Checkbox "recordarme"

  // Validación básica
  if (!username || !password) {
    showError("Por favor, completa todos los campos");
    return;
  }

  // Obtiene lista de usuarios guardados
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Busca un usuario cuyo username o email coincida, y que la contraseña sea correcta
  const user = users.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );

  // Si encontró usuario válido
  if (user) {
    showSuccess("¡Inicio de sesión exitoso! Redirigiendo...");

    // Guarda usuario según si tildó "recordarme" o no
    if (remember) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: user.username, email: user.email })
      );
    } else {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ username: user.username, email: user.email })
      );
    }

    // Redirige al inicio después de 1 segundo
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } else {
    // Si no coincide, error
    showError("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
  }
}

// Maneja el registro de un nuevo usuario
function handleRegister(e) {
  e.preventDefault(); // Evita recargar la página

  // Obtiene valores del formulario
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const passwordConfirm = document.getElementById("reg-password-confirm").value;

  // Validaciones
  if (!username || !email || !password || !passwordConfirm) {
    showError("Por favor, completa todos los campos");
    return;
  }

  if (username.length < 3) {
    showError("El nombre de usuario debe tener al menos 3 caracteres");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Por favor, ingresa un email válido");
    return;
  }

  if (password.length < 6) {
    showError("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  if (password !== passwordConfirm) {
    showError("Las contraseñas no coinciden");
    return;
  }

  // Obtiene usuarios existentes
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Verifica si ya existe username o email
  const userExists = users.some(
    (u) => u.username === username || u.email === email
  );

  if (userExists) {
    showError("El usuario o email ya está registrado. Por favor, usa otro.");
    return;
  }

  // Crea un nuevo usuario
  const newUser = {
    username: username,
    email: email,
    password: password,
  };

  // Lo agrega al array y lo guarda
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");

  // Limpia formulario de registro
  document.getElementById("register-form").reset();

  // Después de 2 segundos vuelve al login y completa el username automáticamente
  setTimeout(() => {
    showLogin();
    document.getElementById("username").value = username;
  }, 2000);
}

// Valida formato de email con regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Muestra mensajes de error según si estás en login o registro
function showError(message) {
  const registerBox = document.getElementById("register-box");

  // Detecta en qué vista está el usuario
  const isRegisterVisible =
    registerBox && !registerBox.classList.contains("is-hidden");

  let errorDiv, errorText, successDiv;

  if (isRegisterVisible) {
    errorDiv = document.getElementById("error-message-register");
    errorText = document.getElementById("error-text-register");
    successDiv = document.getElementById("success-message-register");
  } else {
    errorDiv = document.getElementById("error-message");
    errorText = document.getElementById("error-text");
    successDiv = document.getElementById("success-message");
  }

  // Si existen los elementos, muestra el error
  if (errorDiv && errorText) {
    errorText.textContent = message;
    errorDiv.classList.remove("is-hidden");

    // Oculta el mensaje de éxito si estaba visible
    if (successDiv) {
      successDiv.classList.add("is-hidden");
    }

    // Cierra automáticamente el error después de 5 segundos
    setTimeout(() => {
      if (isRegisterVisible) {
        closeErrorRegister();
      } else {
        closeError();
      }
    }, 5000);
  }
}

// Muestra mensajes de éxito
function showSuccess(message) {
  const registerBox = document.getElementById("register-box");
  const isRegisterVisible =
    registerBox && !registerBox.classList.contains("is-hidden");

  let successDiv, successText, errorDiv;

  if (isRegisterVisible) {
    successDiv = document.getElementById("success-message-register");
    successText = document.getElementById("success-text-register");
    errorDiv = document.getElementById("error-message-register");
  } else {
    successDiv = document.getElementById("success-message");
    successText = document.getElementById("success-text");
    errorDiv = document.getElementById("error-message");
  }

  if (successDiv && successText) {
    successText.textContent = message;
    successDiv.classList.remove("is-hidden");

    // Oculta el error si estaba visible
    if (errorDiv) {
      errorDiv.classList.add("is-hidden");
    }
  }
}

// Oculta el mensaje de error del login
function closeError() {
  const errorDiv = document.getElementById("error-message");
  if (errorDiv) {
    errorDiv.classList.add("is-hidden");
  }
}

// Oculta el mensaje de error del registro
function closeErrorRegister() {
  const errorDiv = document.getElementById("error-message-register");
  if (errorDiv) {
    errorDiv.classList.add("is-hidden");
  }
}

// Muestra el formulario de registro y oculta el login
function showRegister() {
  const loginBox = document.querySelector(".box");
  const registerBox = document.getElementById("register-box");

  if (loginBox && registerBox) {
    loginBox.classList.add("is-hidden");
    registerBox.classList.remove("is-hidden");
    closeError();
    closeErrorRegister();
  }
}

// Muestra el formulario de login y oculta el de registro
function showLogin() {
  const loginBox = document.querySelector(".box");
  const registerBox = document.getElementById("register-box");

  if (loginBox && registerBox) {
    loginBox.classList.remove("is-hidden");
    registerBox.classList.add("is-hidden");
    closeError();
    closeErrorRegister();
  }
}
