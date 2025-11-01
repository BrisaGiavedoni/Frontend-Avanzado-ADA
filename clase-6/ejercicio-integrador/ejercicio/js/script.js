// =======================================================================
// 📌 1. CAPTURA DE NODOS DEL HTML Y PARÁMETROS DE URL
// =======================================================================
const formulario = document.getElementById('formulario');
const inputTarea = document.getElementById('tarea');
const selectCategoria = document.getElementById('categoria');
const listaTareas = document.getElementById('lista-tareas');
const btnBorrar = document.getElementById('borrar-todo');

// Objeto para leer los parámetros de la URL (Soluciona el Requisito de Filtrar por URL)
const parametrosURL = new URLSearchParams(window.location.search);
const categoriaFiltrada = parametrosURL.get('categoria'); 
// Ejemplo: index.html?categoria=Trabajo -> 'categoriaFiltrada' será "Trabajo"

// =======================================================================
// 📌 2. MANEJO DE DATOS Y LOCALSTORAGE
// =======================================================================
// Intenta cargar las tareas desde localStorage, si no hay nada, usa un array vacío.
let listadoTareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Función para guardar el array 'listadoTareas' en localStorage (en formato JSON string)
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(listadoTareas));
}

// =======================================================================
// 📌 3. FUNCIONES PARA MANIPULAR Y DIBUJAR TAREAS
// =======================================================================

/**
 * Filtra y luego dibuja las tareas en el DOM.
 * Aplica el filtro de URL si 'categoriaFiltrada' tiene un valor.
 */
function mostrarTareas() {
    // 1. Limpio el contenedor antes de dibujar para evitar duplicados
    listaTareas.innerHTML = '';

    // 2. Determino qué tareas voy a mostrar (aplico filtro si es necesario)
    let tareasParaMostrar = listadoTareas;

    // APLICACIÓN DEL FILTRO DE URL
    if (categoriaFiltrada) {
        // Filtro: solo las tareas cuya categoría (en minúsculas) coincida con el filtro URL (en minúsculas)
        tareasParaMostrar = listadoTareas.filter(tarea => 
            tarea.categoria.toLowerCase() === categoriaFiltrada.toLowerCase()
        );
    }

    // 3. Recorro la lista filtrada y creo el HTML para cada tarea
    tareasParaMostrar.forEach((tarea) => { // Usamos 'const' para el elemento creado
        const articleTarea = document.createElement('article');
        
        // Uso una clase 'tarea-completada' para estilizar si está hecha
        if (tarea.estaCompleta) {
            articleTarea.classList.add('tarea-completada');
        }

        // Estructura HTML de la tarea.
        // Los 'data-id' son esenciales para las funciones de manipulación (completar/eliminar)
        articleTarea.innerHTML = `
            <p>
                ${tarea.texto} - 
                <strong>Categoría: ${tarea.categoria}</strong>
            </p>
            <div class="acciones">
                <button class="btn-completar" data-id="${tarea.id}">
                    ${tarea.estaCompleta ? 'Desmarcar' : 'Completar'}
                </button>
                <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
            </div>
        `;
        
        // Agregar la tarea al contenedor principal
        listaTareas.appendChild(articleTarea);
    });
}

/**
 * Alterna el estado 'estaCompleta' de una tarea usando el ID.
 * @param {string | number} id - El ID único de la tarea.
 */
function completarTarea(id) {
    const tareaId = Number(id);

    // .map() para encontrar la tarea por ID y cambiar su estado de completada
    listadoTareas = listadoTareas.map((tarea) =>
        tarea.id === tareaId
            ? { ...tarea, estaCompleta: !tarea.estaCompleta } // Invertir el estado
            : tarea // Devolver la tarea sin cambios
    );

    guardarTareas();
    mostrarTareas(); // Redibujar la lista para reflejar el cambio en el DOM
}

/**
 * Elimina una tarea del array usando el ID.
 * @param {string | number} id - El ID único de la tarea.
 */
function eliminarTarea(id) {
    const tareaId = Number(id);
    
    // .filter() para crear un nuevo array SIN la tarea con el ID dado
    listadoTareas = listadoTareas.filter(tarea => tarea.id !== tareaId);

    guardarTareas();
    mostrarTareas(); // Redibujar la lista
}


// =======================================================================
// 📌 4. MANEJO DE EVENTOS PRINCIPALES
// =======================================================================

// A. EVENTO SUBMIT DEL FORMULARIO (Agregar nueva tarea)
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Detiene el envío por defecto del formulario

    const tareaTexto = inputTarea.value.trim();
    const categoria = selectCategoria.value.trim();

    // 1. VALIDACIÓN (No agregar tareas vacías)
    if (tareaTexto === '') {
        alert('¡La descripción de la tarea no puede estar vacía!');
        return; 
    }

    // 2. CREACIÓN DEL OBJETO TAREA
    const nuevaTarea = {
        id: Date.now(), // ID único (milésimas de segundo)
        texto: tareaTexto,
        categoria: categoria,
        estaCompleta: false,
    };

    // 3. ACTUALIZACIÓN DE DATOS Y VISUALIZACIÓN
    listadoTareas.push(nuevaTarea);
    inputTarea.value = ''; // Limpiar el input

    guardarTareas(); // Guardar en localStorage
    mostrarTareas(); // Mostrar en pantalla
});


// B. EVENTO CLICK EN EL CONTENEDOR DE TAREAS (Delegación de Eventos)
// Esto es eficiente: un solo listener para manejar muchos botones dinámicos.
listaTareas.addEventListener('click', (event) => {
    // Si el clic fue en el botón de Eliminar
    if (event.target.classList.contains('btn-eliminar')) {
        const id = event.target.dataset.id;
        eliminarTarea(id);
    } 
    // Si el clic fue en el botón de Completar
    else if (event.target.classList.contains('btn-completar')) {
        const id = event.target.dataset.id;
        completarTarea(id);
    }
});


// C. EVENTO CLICK EN EL BOTÓN "BORRAR TODO" 
btnBorrar.addEventListener('click', () => {
    if (confirm('¿Estás segura de que quieres borrar TODAS las tareas permanentemente?')) {
        listadoTareas = []; // Vacía el array
        guardarTareas(); // Guarda el array vacío en localStorage
        mostrarTareas(); // Actualiza la pantalla
    }
});



mostrarTareas();