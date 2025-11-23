document.getElementById("myButton").addEventListener("click", function () {

  console.log("Inicio"); // Se ejecuta primero (síncrono)

  // setTimeout es asíncrono → se envía a la "cola de tareas"
  setTimeout(() => console.log("Timeout"), 0);

  console.log("Fin"); // Se ejecuta segundo (síncrono)
});

/*
Explicación:
El orden es:
1. Inicio
2. Fin
3. Timeout

Esto pasa porque setTimeout es ASÍNCRONO:
aunque tenga 0 ms, espera a que termine el código síncrono antes de ejecutarse.
*/