# Actividad 2: Selección de Métodos HTTP y Manejo de Respuestas

## Consigna: 
 Para cada escenario, indica: 

 1.  El método HTTP adecuado (GET, POST, PUT, PATCH, 
 DELETE). 
 2.  Un código de estado HTTP probable que recibirías (ej: 200, 404, 
 201). 
 3.  Cómo mostrarías la respuesta al usuario en la interfaz (ej: 
 mensaje de éxito, redirección, alerta). 
## Escenarios: 
 ● Un usuario envía un formulario de registro. 

 ● Intentas eliminar un producto que no existe. 

 ● Actualizas el correo electrónico de un perfil. 

● Solicitas la lista de pedidos recientes.


## Respuestas:

### Escenario 1: Un usuario envía un formulario de registro.
1. Método HTTP: POST
2. Código de estado HTTP probable: 201 (Created)
3. Mostraría la respuesta al usuario: Mostraría un mensaje de éxito indicando que el registro fue exitoso y redirigiría al usuario a la página de inicio de sesión.

### Escenario 2: Intentas eliminar un producto que no existe.
 1. Método HTTP: DELETE
 2. Código de estado HTTP probable: 404 (Not Found)
 3. Mostraría la respuesta al usuario: Mostraría una alerta indicando que el producto no fue encontrado y no se pudo eliminar.

### Escenario 3: Actualizas el correo electrónico de un perfil.
1. Método HTTP: PATCH
2. Código de estado HTTP probable: 200 (OK)
3. Mostraría la respuesta al usuario: Mostraría un mensaje de éxito indicando que el correo electrónico fue actualizado correctamente.

### Escenario 4: Solicitas la lista de pedidos recientes.
1. Método HTTP: GET
2. Código de estado HTTP probable: 200 (OK)
3. Mostraría la respuesta al usuario: Mostraría la lista de pedidos recientes en la interfaz, posiblemente con una notificación de que los datos se cargaron correctamente.