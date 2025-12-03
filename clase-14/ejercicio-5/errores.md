# Actividad 5: Identificación de Errores Comunes 
## Consigna: 
Analiza las siguientes URIs y métodos HTTP, identifica qué errores 
rompen las convenciones REST y explica cómo corregirlos:

1.  GET /obtenerUsuario/25 
2.  POST /actualizarProducto/10 
3.  DELETE /usuarios?userId=5 
4.  GET /libros/ciencia-ficcion (para filtrar por género).

## Análisis y Correcciones:

1. **GET /obtenerUsuario/25**
   - **Error:** El verbo "obtener" en la URI es redundante, ya que el método HTTP GET ya implica una operación de obtención.
   - **Corrección:** La URI debería ser simplemente `/usuarios/25`.


2. **POST /actualizarProducto/10**
   - **Error:** El verbo "actualizar" en la URI es incorrecto para el método POST, que se utiliza para crear recursos. La actualización debería realizarse con el método PUT o PATCH.
   - **Corrección:** La URI debería ser `/productos/10` y el método debería ser PUT o PATCH.


3. **DELETE /usuarios?userId=5**
    - **Error:** El uso de un parámetro de consulta para identificar el recurso a eliminar no es una práctica REST adecuada. La identificación del recurso debe hacerse a través de la ruta.                            
    - **Corrección:** La URI debería ser `/usuarios/5`.  

4. **GET /libros/ciencia-ficcion (para filtrar por género)**
    - **Error:** Aunque es común usar rutas para filtrar, en REST es más apropiado utilizar parámetros de consulta para este propósito.
    - **Corrección:** La URI debería ser `/libros?genero=ciencia-ficcion`.

Estas correcciones aseguran que las URIs y los métodos HTTP sigan las convenciones REST, mejorando la claridad y la coherencia de la API.
