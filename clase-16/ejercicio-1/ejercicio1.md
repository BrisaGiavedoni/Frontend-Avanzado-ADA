# 🚀 Actividad 1: Exploración de Documentación de APIs (PokeAPI)

**Objetivo:** Familiarizarse con la estructura de documentación de una API pública.

---

## 📋 Tabla Resumen de Endpoints de Colección (PokeAPI)

| Endpoint (Colección/Lista) | Propósito del Endpoint | Método HTTP Soportado | Parámetros de Búsqueda (Paginado, Filtro, Orden) |
| :--- | :--- | :--- | :--- |
| `/api/v2/pokemon/` | Lista paginada de todos los Pokémon disponibles. | `GET` | **Paginación:** `limit` (número de resultados por página), `offset` (punto de inicio para la lista). |
| `/api/v2/ability/` | Lista paginada de todas las Habilidades de Pokémon. | `GET` | **Paginación:** `limit`, `offset`. |
| `/api/v2/move/` | Lista paginada de todos los Movimientos de Pokémon. | `GET` | **Paginación:** `limit`, `offset`. |
| `/api/v2/item/` | Lista paginada de todos los Objetos (Items) de Pokémon. | `GET` | **Paginación:** `limit`, `offset`. |
| `/api/v2/type/` | Lista de todos los Tipos elementales. | `GET` | **Ninguno:** Lista estática devuelta completa sin paginación. |
| `/api/v2/generation/` | Lista de todas las Generaciones de juegos. | `GET` | **Ninguno:** Lista estática devuelta completa. |

---

### Conclusiones de la Exploración

* **Método Principal:** La PokeAPI utiliza predominantemente el método `GET` (solo lectura).
* **Paginación:** Las colecciones grandes (`/pokemon`, `/ability`, etc.) utilizan los parámetros **`limit`** y **`offset`** para la paginación.
* **Filtros Avanzados:** No se observan parámetros para filtros o para ordenamiento (`sort`) complejos directamente en los *endpoints* de colección.