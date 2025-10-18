document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. Identificando Eventos en la Página
    // ----------------------------------------------------------------------
    document.body.addEventListener('click', function(evento) {
        // Usamos document.body para capturar clics en casi toda la ventana
        const elementoClickeado = evento.target;
        
        console.log("--- Actividad 1 ---");
        console.log("¡Clic Detectado!");
        console.log("Elemento (target):", elementoClickeado.tagName, elementoClickeado.id ? `(ID: ${elementoClickeado.id})` : '');

        // Ejemplo de filtrar clics a botones específicos (pregunta reflexiva)
        if (elementoClickeado.tagName === 'BUTTON') {
            console.log("-> ¡Es un botón! 🎉");
        }
    });

    // ----------------------------------------------------------------------
    // 2. Evitando el Comportamiento por Defecto (preventDefault)
    // ----------------------------------------------------------------------
    const enlace = document.getElementById('enlaceBloqueado');
    const resultado2 = document.getElementById('resultado2');

    enlace.addEventListener('click', function(evento) {
        // Pregunta reflexiva: Permitir la redirección solo si el usuario confirma
        const confirmarRedireccion = confirm("¿Estás seguro de que quieres salir de esta página e ir a Google?");
        
        if (!confirmarRedireccion) {
            evento.preventDefault(); // ¡Bloquea la acción predeterminada del enlace!
            resultado2.textContent = "Redirección BLOQUEADA por preventDefault() y confirmación.";
        } else {
            resultado2.textContent = "Redirección PERMITIDA por confirmación del usuario.";
            // El navegador seguirá el 'href' normalmente
        }
    });

    // ----------------------------------------------------------------------
    // 3. Resaltando Elementos con Eventos del Mouse
    // ----------------------------------------------------------------------
    const listaItems = document.querySelectorAll('#listaColores li');
    const coloresDiferentes = ['#ff6f69', '#ffcc5c', '#88d8b0']; // Colores para la pregunta reflexiva

    listaItems.forEach((item, index) => {
        // Guardamos el color original por si el CSS no lo establece (mejor práctica)
        item.dataset.originalColor = window.getComputedStyle(item).backgroundColor; 

        item.addEventListener('mouseover', function() {
            // Pregunta reflexiva: Cada elemento un color diferente
            this.style.backgroundColor = coloresDiferentes[index % coloresDiferentes.length];
            this.style.color = 'white';
        });

        item.addEventListener('mouseout', function() {
            // Restaurar el color original al salir
            this.style.backgroundColor = this.dataset.originalColor;
            this.style.color = '#333';
        });
    });

    // ----------------------------------------------------------------------
    // 4. Detección de Teclas Presionadas
    // ----------------------------------------------------------------------
    const campoTexto = document.getElementById('campoTexto');
    const resultado4 = document.getElementById('resultado4');

    campoTexto.addEventListener('keydown', function(evento) {
        console.log("--- Actividad 4 (Keydown) ---");
        console.log(`Tecla presionada: ${evento.key} (Código: ${evento.code})`);

        // Pregunta reflexiva: Mostrar mensaje al presionar "Enter"
        if (evento.key === 'Enter') {
            resultado4.textContent = `¡Se presionó la tecla "Enter"! Contenido del campo: ${campoTexto.value}`;
            evento.preventDefault(); // Evita el comportamiento por defecto de algunos formularios
        }
    });

    // ----------------------------------------------------------------------
    // 5. Controlando la Propagación de Eventos (Burbujeo)
    // ----------------------------------------------------------------------
    const abuelo = document.getElementById('abuelo');
    const padre = document.getElementById('padre');
    const hijo = document.getElementById('hijo');
    const resultado5 = document.getElementById('resultado5');

    // Eventos para ver el burbujeo
    abuelo.addEventListener('click', () => {
        console.log("--> Clic en ABUELO");
        resultado5.textContent += " ABUELO |";
    });

    padre.addEventListener('click', () => {
        console.log("--> Clic en PADRE");
        resultado5.textContent += " PADRE |";
    });

    hijo.addEventListener('click', (evento) => {
        resultado5.textContent = "Clic detectado: HIJO |";
        console.log("--> Clic en HIJO (Origen)");
        evento.stopPropagation(); 


    // Resetear el resultado antes de cada prueba de burbujeo
    document.getElementById('actividad5').addEventListener('click', () => {
        if (!resultado5.textContent.includes("Origen")) {
             resultado5.textContent = "Abre la Consola (F12) y haz clic en 'Hijo'.";
        }
    }, true); // Usamos captura para resetear antes que el burbujeo

    // ----------------------------------------------------------------------
    // 🔥 Desafío Extra: Secuencia Secreta
    // ----------------------------------------------------------------------
    const SECUENCIA_OBJETIVO = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'a', 'b', 'Enter'];
    let secuenciaActual = [];
    const mensajeDesafio = document.getElementById('mensajeDesafio');
    
    // Muestra la secuencia en el mensaje de inicio
    mensajeDesafio.innerHTML = `Secuencia: <span style="color:red;">${SECUENCIA_OBJETIVO.join(', ')}</span>`;

    document.addEventListener('keydown', function(evento) {
        // Asegúrate de que no estamos escribiendo en el campo de texto de la actividad 4
        if (evento.target.id === 'campoTexto') {
            return; 
        }

        const tecla = evento.key;
        
        // Usamos preventDefault() para evitar el desplazamiento de la página al usar las flechas
        if (tecla.includes('Arrow') || tecla === 'Enter') {
            evento.preventDefault();
        }

        // 1. Agregar la tecla si es la siguiente esperada
        if (tecla === SECUENCIA_OBJETIVO[secuenciaActual.length]) {
            secuenciaActual.push(tecla);
        } else {
            // 2. Si se presiona una tecla incorrecta, reiniciamos (a menos que sea el inicio de la secuencia)
            if (tecla !== SECUENCIA_OBJETIVO[0]) {
                 secuenciaActual = []; 
                 mensajeDesafio.innerHTML = `🚫 Incorrecto. Reinicia. Secuencia: <span style="color:red;">${SECUENCIA_OBJETIVO.join(', ')}</span>`;
            }
        }

        console.log("Secuencia del Desafío:", secuenciaActual);
        
        // 3. Comprobación de victoria
        if (secuenciaActual.length === SECUENCIA_OBJETIVO.length) {
            mensajeDesafio.textContent = "🎉 ¡FELICIDADES! ¡SECUENCIA SECRETA DESBLOQUEADA! 🚀";
            document.body.style.backgroundColor = '#d4edda'; // Color verde de victoria
            secuenciaActual = []; // Reiniciar
            setTimeout(() => {
                document.body.style.backgroundColor = '#f4f4f9';
            }, 3000);
        }
    });

})
});