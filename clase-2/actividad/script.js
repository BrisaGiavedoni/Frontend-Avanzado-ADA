// EJERCICIO 1: Explorando las relaciones entre elementos
console.log('--- EJERCICIO 1: Relaciones DOM ---');

const parrafoSeleccionado = document.getElementById('p-dos');

// o Su elemento padre.
const padre = parrafoSeleccionado.parentElement;
console.log('Elemento Padre:', padre);

// o Su primer hijo (si lo tiene).
// Un párrafo solo tiene un nodo de texto, no un "elemento" hijo.
const primerHijoElemento = parrafoSeleccionado.firstElementChild; 
console.log('Primer Hijo (Elemento):', primerHijoElemento); // Será null

// o Su hermano anterior y su hermano siguiente.
const hermanoAnterior = parrafoSeleccionado.previousElementSibling;
const hermanoSiguiente = parrafoSeleccionado.nextElementSibling;
console.log('Hermano Anterior:', hermanoAnterior);
console.log('Hermano Siguiente:', hermanoSiguiente);


// EJERCICIO 2: Creando y agregando elementos dinámicamente
console.log('\n--- EJERCICIO 2: Creación Dinámica ---');

const btnAgregar = document.getElementById('btn-agregar');
const contenedorDinamico = document.getElementById('contenedor-dinamico');

// Textos aleatorios para el ejemplo
const textos = [
    "¡Nuevo párrafo creado!", 
    "Esto es un texto aleatorio.", 
    "DOM Manipulation rocks!", 
    "Otro elemento añadido."
];

btnAgregar.addEventListener('click', function() {
    // 1. Crear un nuevo párrafo
    const nuevoParrafo = document.createElement('p');

    // 2. Obtener un texto aleatorio
    const indiceAleatorio = Math.floor(Math.random() * textos.length);
    
    // 3. Asignar el texto
    nuevoParrafo.textContent = textos[indiceAleatorio];
    nuevoParrafo.style.color = '#333';
    nuevoParrafo.style.padding = '5px';

    // 4. Agregar el nuevo párrafo al div
    contenedorDinamico.appendChild(nuevoParrafo);
});

// EJERCICIO 3: innerHTML vs innerText
console.log('\n--- EJERCICIO 3: innerHTML vs innerText ---');

const btnText = document.getElementById('btn-text');
const btnHtml = document.getElementById('btn-html');
const divModificar = document.getElementById('contenido-a-modificar');

btnText.addEventListener('click', function() {
    // Usando innerText (seguro, trata todo como texto plano)
    divModificar.innerText = 'El texto ha sido cambiado solo con innerText. No hay etiquetas.';
});

btnHtml.addEventListener('click', function() {
    // Usando innerHTML (interpreta etiquetas HTML)
    divModificar.innerHTML = 'El contenido ha sido cambiado con <strong>innerHTML</strong>, ¡notar el texto en negrita!';
});

// EJERCICIO 4: Template Strings
console.log('\n--- EJERCICIO 4: Template Strings ---');

const inputNombre = document.getElementById('input-nombre');
const btnMensaje = document.getElementById('btn-mensaje');
const mensajeSalida = document.getElementById('mensaje-salida');

btnMensaje.addEventListener('click', function() {
    const nombre = inputNombre.value || 'Invitado(a)'; // Usa 'Invitado' si está vacío

    // 3. Usar Template Strings (backticks) para construir el mensaje
    const mensaje = `Hola ${nombre}, bienvenida a la clase de JavaScript!`;

    mensajeSalida.textContent = mensaje;
});

// EJERCICIO 5: Generador de tarjetas dinámicas
console.log('\n--- EJERCICIO 5: Generador de Tarjetas ---');

const formTarjeta = document.getElementById('form-tarjeta');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const btnEliminarUltima = document.getElementById('btn-eliminar-ultima');

// Función para generar un color aleatorio (Desafío Extra)
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}, 0.2)`; // Baja opacidad para que sea legible
}

formTarjeta.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    const nombre = document.getElementById('card-nombre').value;
    const descripcion = document.getElementById('card-desc').value;

    // 1. Crear el contenedor principal de la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-item';
    tarjeta.style.border = '1px solid #333';
    tarjeta.style.padding = '15px';
    tarjeta.style.width = '200px';
    tarjeta.style.backgroundColor = getRandomColor(); // Desafío Extra

    // 2. Usar Template String y innerHTML para construir el contenido
    tarjeta.innerHTML = `
        <h2>${nombre}</h2>
        <p>${descripcion}</p>
        <button class="btn-eliminar-tarjeta" style="margin-top: 10px;">Eliminar Tarjeta</button>
    `;

    // 3. Agregar la tarjeta al contenedor principal
    contenedorTarjetas.appendChild(tarjeta);

    // 4. Limpiar los inputs del formulario
    formTarjeta.reset();
});


// Desafío Extra: Eliminar Última Tarjeta
btnEliminarUltima.addEventListener('click', function() {
    const tarjetas = contenedorTarjetas.querySelectorAll('.tarjeta-item');
    if (tarjetas.length > 0) {
        contenedorTarjetas.removeChild(tarjetas[tarjetas.length - 1]);
        console.log('Última tarjeta eliminada.');
    } else {
        console.log('No hay tarjetas para eliminar.');
    }
});


// Desafío Extra: Eliminar tarjeta individualmente (Delegación de Eventos)
contenedorTarjetas.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-eliminar-tarjeta')) {
        // Elimina el elemento padre del botón (que es la tarjeta)
        e.target.parentElement.remove();
        console.log('Tarjeta individual eliminada.');
    }
});