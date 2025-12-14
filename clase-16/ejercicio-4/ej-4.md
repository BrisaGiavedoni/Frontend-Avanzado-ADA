## 🧩 Actividad 4: Implementación de Filtros Múltiples (Paginación y Tipo)

**Objetivo:** Aplicar filtros combinados, lidiando con las estructuras específicas de PokeAPI.

### Mecanismos de Filtrado Combinados

| Tipo de Filtro | Parámetro Usado | Mecanismo en la URL | Aplicación |
| :--- | :--- | :--- | :--- |
| **Filtro Restrictivo** | `typeId` (Ej: 3 para Vuelo) | **Path Parameter** (`/type/{id}`). | Restringe el conjunto total de Pokémon. |
| **Paginación** | `limit` y `offset` | **Lógica en el Cliente** (`.slice()`). | Controla qué segmento de la lista ya filtrada se muestra. |

**Nota:** La PokeAPI requiere cambiar el *endpoint* base (`/type/`) para filtrar por tipo, y no soporta ordenamiento (`_sort`) en el mismo nivel que la paginación.