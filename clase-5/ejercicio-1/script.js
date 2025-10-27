// script.js

// 1. Obtener todos los botones de preguntas
const preguntas = document.querySelectorAll('.faq-pregunta');

// 2. Iterar sobre cada botón para adjuntar el 'click listener'
preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', function() {
        
        // 3. Identificar la respuesta asociada usando nextElementSibling
        // 'this' es el botón pulsado
        const respuesta = this.nextElementSibling;
        
        // 4. Alternar la visibilidad entre 'block' (visible) y 'none' (oculto)
        if (respuesta.style.display === 'block') {
            // Si está visible, ocúltala
            respuesta.style.display = 'none';
        } else {
            // Si está oculta, muéstrala
            respuesta.style.display = 'block';
        }
    });
});