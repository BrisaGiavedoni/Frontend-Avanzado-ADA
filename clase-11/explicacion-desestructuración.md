### 1. Desestructuración (Destructuring)

La desestructuración es una forma de extraer valores de arrays u objetos en distintas variables de una manera más directa y legible.

#### Desestructuración de Arrays
Se extraen valores según su posición en el array.

```javascript
// Array original
const numeros = [10, 20, 30, 40];

// Extraemos los dos primeros valores en variables 'primero' y 'segundo'
const [primero, segundo] = numeros;

console.log(primero); // Muestra 10
console.log(segundo); // Muestra 20

// Para omitir un elemento, dejamos un espacio vacío
const [a, , c] = numeros;

console.log(a); // Muestra 10
console.log(c); // Muestra 30
```

#### Desestructuración de Objetos
Se extraen valores según el nombre de la propiedad.

```javascript
// Objeto original
const usuario = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Madrid"
};

// Extraemos las propiedades en variables con el mismo nombre
const { nombre, edad } = usuario;

console.log(nombre); // Muestra "Ana"
console.log(edad); // Muestra 25

// Asignar un valor por defecto si una propiedad no existe
const { pais = "No especificado" } = usuario;
console.log(pais); // Muestra "No especificado" porque 'pais' no está en el objeto

// Renombrar una variable durante la desestructuración
const { nombre: nombreUsuario } = usuario;
console.log(nombreUsuario); // Muestra "Ana"
```

#### Desestructuración Anidada
Permite acceder a valores dentro de estructuras complejas.

```javascript
const datos = {
  usuario: "María",
  direccion: {
    ciudad: "Barcelona",
    pais: "España"
  }
};

// Extraemos 'usuario' y la propiedad 'ciudad' del objeto anidado 'direccion'
const { usuario, direccion: { ciudad } } = datos;

console.log(usuario); // Muestra "María"
console.log(ciudad); // Muestra "Barcelona"```

### 2. Operador de Propagación (Spread Operator `...`)

El operador `...` expande los elementos de un array u objeto. Es muy útil para hacer copias y combinar datos sin modificar los originales (inmutabilidad).

#### Uso en Arrays
Permite crear un nuevo array combinando o copiando otros.

```javascript
const frutas1 = ["manzana", "pera"];
const frutas2 = ["banana", "uva"];

// Combinar dos arrays en uno nuevo
const frutasCombinadas = [...frutas1, ...frutas2];
console.log(frutasCombinadas); // Muestra ["manzana", "pera", "banana", "uva"]

// Crear una copia de un array
const copiaFrutas1 = [...frutas1];
console.log(copiaFrutas1); // Muestra ["manzana", "pera"]
```

#### Uso en Objetos
Permite clonar o fusionar objetos.

```javascript
const configBase = {
  tema: "oscuro",
  fuente: "Arial"
};

// Crear un nuevo objeto con propiedades adicionales
const configUsuario = {
  ...configBase,
  idioma: "es" // Añade o sobrescribe propiedades
};

console.log(configUsuario); // Muestra { tema: "oscuro", fuente: "Arial", idioma: "es" }
```

### 3. Parámetros Rest (Rest Parameters `...`)

Aunque utiliza la misma sintaxis `...`, el operador *rest* agrupa múltiples elementos en un único array. Se usa principalmente en la definición de funciones para aceptar un número variable de argumentos.

```javascript
// La función 'sumar' acepta cualquier cantidad de números
// y los agrupa en un array llamado 'numeros'
function sumar(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

console.log(sumar(1, 2, 3));      // Muestra 6
console.log(sumar(10, 20, 30, 40)); // Muestra 100
```

### 4. Inmutabilidad, Pasaje por Valor y por Referencia

*   **Pasaje por Valor (Tipos Primitivos):** Los valores como números, strings o booleanos se copian. Modificar la copia no afecta al original.

    ```javascript
    let a = 10;
    let b = a; // 'b' es una copia de 'a'
    b = 20;    // Modificar 'b' no cambia 'a'

    console.log(a); // Muestra 10
    console.log(b); // Muestra 20
    ```

*   **Pasaje por Referencia (Objetos y Arrays):** Los objetos y arrays se pasan como una referencia (una dirección a la ubicación en memoria). Modificarlo a través de una variable afecta a todas las demás que apunten al mismo objeto.

    ```javascript
    const persona1 = { nombre: "Juan" };
    const persona2 = persona1; // 'persona2' apunta al MISMO objeto que 'persona1'

    persona2.nombre = "Carlos"; // Al modificarlo, se cambia el objeto original

    console.log(persona1.nombre); // Muestra "Carlos"
    ```

    Para evitar esto y mantener la **inmutabilidad**, se crean copias con el operador de propagación.

    ```javascript
    const persona1 = { nombre: "Juan" };
    const persona2 = { ...persona1 }; // 'persona2' es una COPIA de 'persona1'

    persona2.nombre = "Carlos";

    console.log(persona1.nombre); // Muestra "Juan" (el original no cambió)
    console.log(persona2.nombre); // Muestra "Carlos"
    ```

### 5. Copia Superficial (Shallow Copy) vs. Copia Profunda (Deep Copy)

El operador de propagación `...` crea una **copia superficial**. Esto significa que solo copia el primer nivel de propiedades. Si hay objetos o arrays anidados, estos seguirán siendo referencias.

#### Ejemplo de Shallow Copy

```javascript
const usuario1 = {
  nombre: "Ana",
  direccion: { ciudad: "Madrid" }
};

const usuario2 = { ...usuario1 }; // Copia superficial

// Modificamos una propiedad anidada
usuario2.direccion.ciudad = "Barcelona";

// El cambio se refleja en el objeto original, porque 'direccion' es una referencia compartida
console.log(usuario1.direccion.ciudad); // Muestra "Barcelona" ¡Cuidado!
```

#### Ejemplo de Deep Copy

Para crear una **copia profunda**, donde incluso los objetos anidados son copias independientes, un método común es usar `JSON`.

```javascript
const usuario1 = {
  nombre: "Ana",
  direccion: { ciudad: "Madrid" }
};

// Creamos una copia profunda
const usuario2 = JSON.parse(JSON.stringify(usuario1));

// Modificamos la propiedad anidada
usuario2.direccion.ciudad = "Barcelona";

// El objeto original permanece intacto
console.log(usuario1.direccion.ciudad); // Muestra "Madrid"
console.log(usuario2.direccion.ciudad); // Muestra "Barcelona"
```