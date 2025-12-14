# 💻 Actividad 2: Realización de Peticiones y Análisis de Respuesta

**Objetivo:** Realizar peticiones HTTP a la API elegida y analizar las diferencias estructurales entre la respuesta de una colección y la de un recurso específico.

---

## 1. Peticiones Realizadas (Usando PokeAPI y `fetch`)

Se utilizaron los siguientes *endpoints* en la consola del navegador o terminal para obtener las respuestas:

| Tipo de Petición | Endpoint URL | Descripción |
| :--- | :--- | :--- |
| **Colección/Lista** | `https://pokeapi.co/api/v2/pokemon?limit=10` | Obtiene una lista paginada (los primeros 10 Pokémon). |
| **Recurso Específico** | `https://pokeapi.co/api/v2/pokemon/25/` | Obtiene los detalles completos del Pokémon con ID 25 (Pikachu). |

---

## 2. 📊 Comparación de Respuestas JSON

Los resultados obtenidos de las dos peticiones revelan diferencias clave en la estructura y el contenido de los datos:

| Característica | Respuesta de Colección (`/pokemon?limit=10`) | Respuesta de Recurso Específico (`/pokemon/25/`) |
| :--- | :--- | :--- |
| **Objeto Principal** | Objeto que actúa como **envoltorio** para la lista de resultados y la paginación. | **Objeto único** que es el recurso en sí mismo (Pikachu). |
| **Claves Raíz** | `count` (1350), `next`, `previous`, y el array de datos **`results`**. | `id`, `name`, `height`, `weight`, `abilities`, `moves`, `sprites`, etc. |
| **Tamaño/Complejidad** | **Pequeño.** Contiene solo el `name` y la `url` de los 10 recursos listados. | **Grande.** Contiene toda la información detallada (habilidades, movimientos, *sprites* y estadísticas). |
| **Propósito** | **Descubrimiento y Navegación** (Permite saber qué recursos existen). | **Información Completa** (Devuelve todos los datos requeridos para mostrar el detalle del elemento). |

---

## Conclusión

Se verifica el patrón común en las APIs REST:

* Las colecciones (`GET /recursos`) devuelven respuestas **ligeras y paginadas**, optimizadas para el listado.
* Los recursos específicos (`GET /recursos/{id}`) devuelven respuestas **pesadas y detalladas**, optimizadas para mostrar toda la información de un solo elemento.