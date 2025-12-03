
# Actividad 1: Diseño de URIs para una API REST 

Consigna: 

Imagina que estás construyendo una aplicación de gestión de 
bibliotecas. Diseña las URIs para los siguientes recursos, siguiendo 
las buenas prácticas de REST: 

● Obtener la lista de todos los libros. 

● Ver los detalles de un libro específico (ID: 58).

● Acceder a las reseñas de un libro (ID: 58). 

● Filtrar libros por género "ciencia ficción" y ordenarlos por fecha de publicación descendente. 

● Añadir una nueva reseña al libro (ID: 58). 
Justifica brevemente por qué cada URI cumple con las convenciones 
REST.

1 .

```js
// Obtener la lista de todos los libros (colección plural 'books', método GET)
const BOOKS_API = 'https://api.example.com/books';
```

Usa un sustantivo en plural ('books') para representar la colección. (Método GET)

2 .
```js
// Ver los detalles de un libro específico (ID: 58)

const BOOK_DETAILS_API = (bookId) => `https://api.example.com/books/${bookId}`;

// Ejemplo:
// BOOK_DETAILS_API(58) // => 'https://api.example.com/books/58'
```
Usa la colección plural ('books') y la ID única para el recurso singular (método GET).

3 .

```js
// Acceder a las reseñas de un libro (ID: 58)

const BOOK_REVIEWS_API = (bookId) => `https://api.example.com/books/${bookId}/reviews`;

// Ejemplo:
// BOOK_REVIEWS_API(58) // => 'https://api.example.com/books/58/reviews'
```
 Utiliza la jerarquía para anidar la sub-colección de reseñas ('reviews') dentro del libro.


4 .

```js
// Filtrar libros por género "ciencia ficción" y ordenarlos por fecha de publicación descendente

const FILTERED_BOOKS_API = 'https://api.example.com/books?genre=science-fiction&sort=publication_date_desc';

```

Mantiene la URI de la colección y usa parámetros de consulta ('?') para filtros y ordenación.


5 .
```js
// Añadir una nueva reseña al libro (ID: 58)
const ADD_REVIEW_API = (bookId) => `https://api.example.com/books/${bookId}/reviews`;
```
La URI es idéntica a la de lectura, ya que la acción de creación se define con el método POST.










