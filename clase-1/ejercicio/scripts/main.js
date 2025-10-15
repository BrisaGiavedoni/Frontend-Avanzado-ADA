// console.log('Hola Mundo')

// Acceder al nodo
// acceder por querySelector con id
// let btn = document.querySelector('#btn')

// acceder con get element
let btn = document.getElementById('btn');
// impresion de elemento por consola
console.log(btn);
// acceder al div 
let contenedor = document.querySelector('.contenedor');

// evento -> el boton escucha el evento click
btn.addEventListener("click", () => {
    // se crea una variable que contiene un nuevo nodo -> <p></p>
      const nuevoParrafo = document.createElement("p");
      // a la variable se le agrega contenido
      nuevoParrafo.textContent = "Este es un nuevo párrafo agregado.";
      // al contenedor de los botones se le agrega un nuevo hijo (appendChild), en este caso es el nuevo parrafo
      contenedor.appendChild(nuevoParrafo);
    });

