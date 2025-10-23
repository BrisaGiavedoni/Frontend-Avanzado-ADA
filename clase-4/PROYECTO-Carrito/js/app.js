// === REFERENCIAS DEL DOM (DOCUMENT OBJECT MODEL) ===
// Obtenemos los elementos del HTML que vamos a manipular.
const listaCursos = document.getElementById("lista-cursos");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const carrito = document.getElementById("carrito"); // Contenedor del carrito (dropdown)
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); // El cuerpo de la tabla (tbody) donde se insertarán las filas.

// === DATOS GLOBALES ===
// Array que actúa como la "base de datos" del carrito.
let articulosCarrito = [];

// === FUNCIÓN DE INICIO ===
cargarEventListeners();

function cargarEventListeners() {
  // 1. Evento para AGREGAR curso: Delegación al contenedor principal.
  listaCursos.addEventListener("click", agregarCurso);

  // 2. Evento para VACIAR carrito: Asignado al botón.
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // 3. Evento para ELIMINAR curso: Delegación al contenedor del carrito.
  carrito.addEventListener("click", eliminarCurso);
}

// ==========================================================
// === 1. FUNCIONALIDAD: AGREGAR CURSO ===
// ==========================================================

function agregarCurso(e) {
  e.preventDefault(); // Evita el salto de página del enlace (#).

  // Delegación: verifica que el clic se haya hecho en el botón de agregar.
  if (e.target.classList.contains("agregar-carrito")) {
    // Obtenemos el contenedor completo del curso (subiendo dos niveles en el DOM).
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function leerDatosCurso(curso) {
  // Extraemos la información del HTML para crear un objeto limpio.
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1, // Inicializamos la cantidad.
  };
  console.log(infoCurso);

  insertarCarrito(infoCurso); // Pasamos el objeto a la función de lógica.
}

function insertarCarrito(curso) {
  // 1. Lógica principal: Verificar si el curso ya existe (devuelve true o false).
  const existe = articulosCarrito.some((articulo) => articulo.id === curso.id);

  if (existe) {
    // Opción A: El curso ya existe, actualizamos la cantidad con map().
    articulosCarrito = articulosCarrito.map((articulo) => {
      if (articulo.id === curso.id) {
        articulo.cantidad++; // Aumentamos la cantidad.
        return articulo;
      } else {
        return articulo; // Los demás artículos se devuelven sin cambios.
      }
    });
  } else {
    // Opción B: El curso no existe, lo agregamos con el Spread Operator.
    articulosCarrito = [...articulosCarrito, curso];
  }

  console.log(articulosCarrito);

  // 2. Una vez actualizado el array, redibujamos el HTML.
  actualizarHTMLCarrito();
}

// ==========================================================
// === 2. FUNCIONALIDAD: ELIMINAR CURSO ===
// ==========================================================

function eliminarCurso(e) { 
    e.preventDefault();

    const cursoId = e.target.getAttribute("data-id"); 

    // === Lógica 1: ELIMINAR COMPLETAMENTE (Botón X) ===
    if (e.target.classList.contains("borrar-curso")) {
        // Filter: crea un nuevo array que EXCLUYE el curso con ese ID.
        articulosCarrito = articulosCarrito.filter(
            (articulo) => articulo.id !== cursoId
        );
    } 
    
    // === Lógica 2: AUMENTAR CANTIDAD (Botón +) ===
    else if (e.target.classList.contains("aumentar-cantidad")) {
        articulosCarrito = articulosCarrito.map((articulo) => {
            if (articulo.id === cursoId) {
                articulo.cantidad++; // Aumenta la cantidad en 1.
                return articulo; 
            }
            return articulo; 
        });
    }

    // === Lógica 3: DISMINUIR CANTIDAD (Botón -) ===
    else if (e.target.classList.contains("disminuir-cantidad")) {
        
        articulosCarrito = articulosCarrito.map(articulo => {
            if (articulo.id === cursoId) {
                
                // Si la cantidad es mayor a 1, restamos 1.
                if (articulo.cantidad > 1) { 
                    articulo.cantidad--; // ¡Restamos 1!
                }
                return articulo;
            }
            return articulo;
        });

        // 4. Último Filter: Después de restar, eliminamos cualquier artículo que haya llegado a 0.
        // (Esto sucede si la cantidad era 1, y no pasó el 'if (cantidad > 1)', pero el filter del final lo saca)
        articulosCarrito = articulosCarrito.filter(articulo => articulo.cantidad > 0);
    }

    // Redibujamos el carrito para reflejar el cambio.
    actualizarHTMLCarrito();
}
// ==========================================================
// === 3. FUNCIONALIDAD: DIBUJAR Y LIMPIAR HTML ===
// ==========================================================

function actualizarHTMLCarrito() {
  // 1. Limpiamos el HTML previo para que no se dupliquen las filas.
  limpiarHTML();

  // 2. Recorremos el array de artículos (la fuente de la verdad) para generar las filas.
  articulosCarrito.forEach((curso) => {
    // Desestructuración para usar las propiedades de forma más legible.
    const { imagen, titulo, precio, cantidad, id } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>
                <a href="#" class="disminuir-cantidad" data-id="${id}"> - </a>
                ${cantidad}
                <a href="#" class="aumentar-cantidad" data-id="${id}"> + </a>
            </td> 
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
    // Adjuntamos la fila al cuerpo de la tabla.
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  // Método eficiente: eliminamos el primer hijo mientras exista alguno.
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
// ==========================================================
// === 4. FUNCIONALIDAD: VACIAR CARRITO ===
// ==========================================================

function vaciarCarrito() {
  // 1. Reiniciamos el array de datos.
  articulosCarrito = [];
  // 2. Limpiamos la interfaz de usuario.
  limpiarHTML();
}
