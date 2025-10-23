// 2.	Cuando la usuaria presione el botón, muestra los datos ingresados en la página sin recargarla.

// script.js
document.addEventListener("DOMContentLoaded", function () {
  // 1. Capturamos el formulario por su ID (userForm)
  const form = document.getElementById("userForm");

  // 2. Escuchamos el evento 'submit'
  form.addEventListener("submit", function (event) {
    // 🔑 CLAVE: Detiene el envío por defecto del formulario (GET o POST)
    // y, por lo tanto, evita la recarga de la página.
    event.preventDefault();
    // 3. Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    // 4. Capturar el contenedor de resultados
    const resultadoDiv = document.getElementById("resultado");

    // 5. Mostrar los datos sin recargar la página
    resultadoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Edad:</strong> ${edad}</p>
        `;

    // Opcional: Limpiar el formulario
    form.reset();
  });
});
