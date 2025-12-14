## ℹ️ Actividad 6: Visualización de Metadatos

**Objetivo:** Implementar paginación real basada en la información del servidor.

### Metadatos Clave de PokeAPI

| Campo | Propósito | Uso en la Interfaz |
| :--- | :--- | :--- |
| **`count`** | El número total de recursos en la colección (ej: 1350). | Mostrar el total de resultados. |
| **`next`** | URL completa para la siguiente página de datos. | Asignado al evento del botón "Siguiente". |
| **`previous`** | URL completa para la página anterior de datos. | Asignado al evento del botón "Anterior". |

**Técnica:** La navegación se realiza pasando la URL (`next` o `previous`) directamente a la función `fetch()`. Esto implementa una **Paginación del Lado del Servidor**, reduciendo la carga de datos por cada petición.