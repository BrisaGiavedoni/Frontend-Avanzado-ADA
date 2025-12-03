# Actividad 4: Interpretación de Respuestas JSON

## Consigna:

Supón que una API responde con el siguiente JSON al obtener detalles de un usuario: 

```json
{
    "id": 101,
    "nombre": "Ana López",
    "email": "ana@example.com",
    "ultimo_acceso": "2023-10-05"
}
```

Diseña un esquema visual (puedes dibujarlo o describirlo con 
palabras) de cómo mostrarías estos datos en una interfaz de perfil de 
usuario. Indica qué campos usarías y cómo los organizarías (ej: 
tarjetas, tablas, texto destacado).


## Respuesta:

Para mostrar los datos del usuario en una interfaz de perfil, diseñaría una tarjeta de perfil con la siguiente estructura:

```-------------------------------------------------
|            Perfil de Usuario                   
-------------------------------------------------
|                             
|        [Foto de perfil Ana López]

|  -------------------------------------------------              
|   Nombre: Ana López        
|   Email: ana@example.com  
|   Último Acceso: 2023-10-05                 

-------------------------------------------------
```



### Descripción de la Organización:
1. **Encabezado de la Tarjeta**: Un título claro que indique que es el "Perfil de Usuario". 
2. **Foto de Perfil**: Un espacio reservado para una foto de perfil del usuario, que puede ser un avatar o una imagen subida por el usuario.
3. **Información del Usuario**:
    - **Nombre**: Mostrado en un tamaño de fuente más grande y en negrita para destacarlo.
    - **Email**: Presentado justo debajo del nombre, en un tamaño de fuente estándar.
    - **Último Acceso**: Colocado al final, en un tamaño de fuente ligeramente más pequeño para indicar que es información adicional.

### Estilo Visual:
- La tarjeta tendría un borde suave y un fondo claro para facilitar la lectura.
- Utilizaría colores contrastantes para el texto y el fondo para mejorar la legibilidad.
- Espaciado adecuado entre los elementos para evitar que la información se vea amontonada.


Este diseño proporciona una vista clara y organizada de la información del usuario, facilitando la comprensión rápida de los datos más relevantes.




