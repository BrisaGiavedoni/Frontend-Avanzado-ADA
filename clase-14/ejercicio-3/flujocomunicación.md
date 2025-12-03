# Actividad 3: Flujo de Comunicación Cliente-Servidor 

## Consigna: 
Describe paso a paso, desde la perspectiva del front-end, cómo se realizaría la siguiente acción: 

Un usuario quiere editar el título de una publicación en un blog (ID: 15) y guardar los cambios. 

## Incluye: 
● Método HTTP utilizado. 

● URI construida.

● Datos enviados al servidor. 

● Posibles respuestas del servidor (códigos de estado y su significado). 

● Cómo se actualizaría la interfaz según la respuesta recibida.


## Respuesta:

### Paso 1: Preparar la solicitud de edición
- Método HTTP utilizado: PATCH
- URI construida: `https://api.example.com/posts/15`
- Datos enviados al servidor: 
```json
{
  "title": "Nuevo título de la publicación"
}
```
### Paso 2: Enviar la solicitud al servidor
- Utilizar una función fetch o una librería como Axios para enviar la solicitud PATCH a la URI especificada con los datos del nuevo título.

### Paso 3: Manejar la respuesta del servidor
- Posibles respuestas del servidor:
  - **200 OK**: La publicación fue actualizada exitosamente.
    - Significado: El servidor ha procesado la solicitud y ha actualizado el título de la publicación.
  - **400 Bad Request**: Los datos enviados son inválidos.
    - Significado: El servidor no pudo procesar la solicitud debido a un error en los datos proporcionados (por ejemplo, el título está vacío).
  - **404 Not Found**: La publicación con ID 15 no existe.
    - Significado: No se encontró la publicación que se intenta editar.
  - **500 Internal Server Error**: Error en el servidor.
    - Significado: Ocurrió un error inesperado en el servidor al intentar procesar la solicitud.

### Paso 4: Actualizar la interfaz según la respuesta recibida
- Si la respuesta es **200 OK**:
  - Actualizar el título de la publicación en la interfaz de usuario para reflejar el nuevo título.
  - Mostrar un mensaje de éxito al usuario, como "El título de la publicación ha sido actualizado correctamente."   
- Si la respuesta es **400 Bad Request**:
  - Mostrar un mensaje de error al usuario, como "Error: El título no puede estar vacío. Por favor, ingrese un título válido."
- Si la respuesta es **404 Not Found**:
  - Mostrar un mensaje de error al usuario, como "Error: La publicación que intenta editar no existe."  
- Si la respuesta es **500 Internal Server Error**:
  - Mostrar un mensaje de error al usuario, como "Error: Ocurrió un problema en el servidor. Por favor, intente nuevamente más tarde."

---


