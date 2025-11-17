// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

  // Selecciona el botón hamburguesa del navbar (Bulma)
  const navbarBurger = document.querySelector(".navbar-burger");

  // Agrega un evento de click al botón hamburguesa
  navbarBurger.addEventListener("click", () => {

    // Obtiene el target indicado en el atributo data-target del botón
    const target = navbarBurger.dataset.target;

    // Busca el menú que debe abrirse/cerrarse según el id del target
    const menu = document.getElementById(target);

    // Activa o desactiva la clase "is-active" en el botón
    navbarBurger.classList.toggle("is-active");

    // Activa o desactiva la clase "is-active" en el menú
    menu.classList.toggle("is-active");
  });

  // Obtiene el usuario actual ya sea de localStorage o sessionStorage
  const currentUser =
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");

  // Si hay un usuario logueado...
  if (currentUser) {
    // Oculta el botón grande de login
    document.getElementById("login-button").classList.add("is-hidden");

    // Oculta también el link de login del navbar
    document.getElementById("login-link-nav").classList.add("is-hidden");

    // Muestra el botón de logout
    document.getElementById("logout-button").classList.remove("is-hidden");

  // Si NO hay usuario logueado...
  } else {
    // Muestra el botón grande de login
    document.getElementById("login-button").classList.remove("is-hidden");

    // Muestra el link de login del navbar
    document.getElementById("login-link-nav").classList.remove("is-hidden");

    // Oculta el botón de logout
    document.getElementById("logout-button").classList.add("is-hidden");
  }
});

// Función que se ejecuta al hacer logout
function handleLogout(event) {
  // Evita que el botón recargue la página por defecto
  event.preventDefault();

  // Elimina el usuario del localStorage
  localStorage.removeItem("currentUser");

  // Elimina el usuario del sessionStorage
  sessionStorage.removeItem("currentUser");

  // Recarga la página para actualizar los elementos visibles
  window.location.reload();
}
