document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("opcionesForm");
    const resultadoDiv = document.getElementById("resultado");

    form.addEventListener("submit", function (event) {
        // Evita que el formulario se envíe y recargue la página
        event.preventDefault();

        // 1. Capturar el Color Seleccionado (Radio Button)
        // Usamos document.querySelector() con el selector CSS ":checked" para encontrar el radio button marcado.
        const colorSeleccionadoInput = form.querySelector('input[name="color"]:checked');
        
        let colorElegido = "No se seleccionó color.";
        if (colorSeleccionadoInput) {
            colorElegido = colorSeleccionadoInput.value;
        }

        // 2. Capturar los Pasatiempos Seleccionados (Checkboxes)
        // Usamos document.querySelectorAll() para obtener una NodeList de TODOS los checkboxes con name="pasatiempo" que estén marcados.
        const pasatiemposSeleccionadosInputs = form.querySelectorAll('input[name="pasatiempo"]:checked');
        
        const pasatiemposElegidos = [];
        
        // Iteramos sobre la lista de checkboxes marcados para obtener sus valores
        pasatiemposSeleccionadosInputs.forEach(checkbox => {
            pasatiemposElegidos.push(checkbox.value);
        });

        // 3. Mostrar la Selección o Advertencia
        
        // Comprobación de advertencia
        if (!colorSeleccionadoInput && pasatiemposElegidos.length === 0) {
            resultadoDiv.innerHTML = '<p class="advertencia">⚠️ ¡Advertencia! No has seleccionado ninguna opción en ambas categorías.</p>';
            return; // Detiene la ejecución si no hay nada seleccionado
        }

        // Construir el HTML de resultados
        let htmlResultado = '<h2>✅ Tu Selección:</h2>';
        
        // Mostrar el color (siempre habrá un valor gracias al "required" en el HTML, pero lo verificamos por robustez)
        htmlResultado += `<p><strong>Color:</strong> ${colorElegido}</p>`;

        // Mostrar los pasatiempos
        if (pasatiemposElegidos.length > 0) {
            htmlResultado += '<p><strong>Pasatiempos:</strong></p><ul>';
            pasatiemposElegidos.forEach(p => {
                htmlResultado += `<li>${p}</li>`;
            });
            htmlResultado += '</ul>';
        } else {
             htmlResultado += '<p><strong>Pasatiempos:</strong> Ninguno seleccionado.</p>';
        }

        resultadoDiv.innerHTML = htmlResultado;
    });
});