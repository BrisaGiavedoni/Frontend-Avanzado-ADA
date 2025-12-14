## 🔗 Actividad 3: URLs Dinámicas con searchParams (Paginación)

**Objetivo:** Practicar la construcción de URLs de consulta (`query parameters`).

### Parámetros Usados y Técnica

| Endpoint Base | Parámetros `searchParams` | Construcción de URL |
| :--- | :--- | :--- |
| `/api/v2/pokemon` | `limit` (Cantidad), `offset` (Inicio) | Se usa la clase **`URLSearchParams`** en JavaScript. |

**Implementación:** Los valores de `limit` y `offset` ingresados por el usuario se convierten en una cadena de consulta que se adjunta a la URL base.