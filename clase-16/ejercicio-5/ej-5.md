## 🖱️ Actividad 5: Simulación de Paginado en Front End

**Objetivo:** Manejar grandes conjuntos de datos con lógica de paginación en el cliente.

### Técnica de Paginado Client-Side

* **Petición Inicial:** Única petición `GET /pokemon?limit=100` para descargar todos los datos.
* **Lógica Clave:** Uso de las variables `currentPage` y `PAGE_SIZE` para calcular los índices de inicio y fin.
* **Cálculo:** `bloque_actual = allPokemon.slice( (currentPage - 1) * PAGE_SIZE, startIndex + PAGE_SIZE )`

**Impacto:** Permite navegación instantánea después de la carga inicial, pero puede ser ineficiente para colecciones extremadamente grandes.