
// 1. Seleccionar todos los botones de título del acordeón
const titles = document.querySelectorAll('.accordion-title');

// 2. Iterar sobre cada título para añadir el evento click
titles.forEach(title => {
    title.addEventListener('click', function() {
        
        // 3. Obtener el contenido colapsable asociado (la respuesta)
        // nextElementSibling selecciona el div.accordion-content que sigue inmediatamente al botón
        const content = this.nextElementSibling;
        
        // 4. Alternar la visibilidad
        if (content.style.display === 'block') {
            // Si está visible, ocultarlo
            content.style.display = 'none';
        } else {
            // Si está oculto, mostrarlo
            content.style.display = 'block';
        }
        
        // Opcional: Alternar una clase 'active' en el título para cambiar su estilo visual (ej. un ícono)
        this.classList.toggle('active');
    });
});