// Guarda en una variable el formulario con id="postForm"
const postForm = document.getElementById("postForm");

// Guarda el elemento donde se mostrará el mensaje (id="submitMessage")
const submitMessage = document.getElementById("submitMessage");


// Agrega un evento cuando se envía el formulario
postForm.addEventListener("submit", async (e) => {

  // Evita que el formulario recargue la página al enviarse
  e.preventDefault();

  // Muestra el mensaje mientras se envían los datos
  submitMessage.style.display = "block";
  submitMessage.textContent = "Enviando...";

  // Crea un objeto con los datos del formulario
  const postData = {
    title: document.getElementById("title").value, // Toma el valor del input "title"
    body: document.getElementById("body").value,   // Toma el valor del textarea "body"
    userId: 1                                      // Valor fijo para este ejemplo
  };

  try {
    // Envía los datos a la API con método POST
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",                                     // Tipo de petición
      headers: { "Content-Type": "application/json" },    // Indicamos que envíamos JSON
      body: JSON.stringify(postData)                      // Convertimos el objeto a JSON
    });

    // Si la API respondió bien (status 200–299)
    if (res.ok) {
      submitMessage.textContent = "¡Post creado!";        // Mensaje de éxito
    } else {
      submitMessage.textContent = "Error al crear el post"; // Error si no es ok
    }

    // Limpia los campos del formulario
    postForm.reset();

  } catch (err) {
    // Si hubo error en la conexión o en fetch
    submitMessage.textContent = "Error al crear el post";
  }
});
