// 🪄 Esperamos a que cargue todo el documento
window.onload = function() {

  // 1️⃣ Seleccioná los elementos del DOM que vas a usar:
  const titulo = document.getElementById('titulo'); // ✨ Tu código aquí
  const mensaje = document.querySelector('.mensaje'); // ✨ Tu código aquí
  const imagen = document.getElementById('imagen'); // ✨ Tu código aquí

  // 2️⃣ Seleccioná los botones
  const colorBtn = document.getElementById('colorBtn');
  const imagenBtn = document.getElementById('imagenBtn');
  const ocultarBtn = document.getElementById('ocultarBtn');

  // 3️⃣ Programá las acciones
  // Al hacer clic en el botón de color, alternar una clase CSS
  colorBtn.onclick = () => titulo.classList.toggle('colorido'); // ✨ Tu código aquí

  // Al hacer clic en el botón de imagen, cambiar el atributo src
  imagenBtn.onclick = () => imagen.setAttribute('src', 'https://picsum.photos/200?random=' + Math.random()); // ✨ Tu código aquí

  // Al hacer clic en el botón de ocultar, alternar la visibilidad del mensaje
  ocultarBtn.onclick = () => mensaje.classList.toggle('oculto'); // ✨ Tu código aquí
};
