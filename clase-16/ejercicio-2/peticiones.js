console.log("--- Petición 1: Colección (10 Pokémon) ---");

fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
  .then((response) => response.json()) // Convierte la respuesta a formato JSON
  .then((data) => {
    console.log("Estructura de la Colección:", data);
    console.log("Primer elemento del Array 'results':", data.results[0]);
  })
  .catch((error) => console.error("Error al obtener la colección:", error));

console.log("\n--- Petición 2: Recurso Específico (Pikachu, ID 25) ---");

fetch("https://pokeapi.co/api/v2/pokemon/25/")
  .then((response) => response.json())
  .then((data) => {
    console.log("Estructura del Recurso Específico:", data);
    console.log("Algunas habilidades de Pikachu:", data.abilities);
  })
  .catch((error) =>
    console.error("Error al obtener el recurso específico:", error)
  );
