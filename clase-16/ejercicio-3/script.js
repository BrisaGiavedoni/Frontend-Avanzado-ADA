document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const limitInput = document.getElementById('limitInput');
    const offsetInput = document.getElementById('offsetInput');
    const resultsList = document.getElementById('resultsList');
    
    // Base del endpoint de colección de PokeAPI
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

    searchButton.addEventListener('click', fetchDynamicPokemonList);
    
    // Ejecutar la búsqueda inicial con los valores por defecto al cargar la página
    fetchDynamicPokemonList(); 

    async function fetchDynamicPokemonList() {
        const limit = limitInput.value.trim();
        const offset = offsetInput.value.trim();
        resultsList.innerHTML = '<li>Cargando lista de Pokémon...</li>';

        // 1. CONSTRUCCIÓN DE LA URL DINÁMICA USANDO URLSearchParams
        const params = new URLSearchParams();
        
        // Adjuntamos los parámetros de paginación
        params.append('limit', limit); 
        params.append('offset', offset); 

        // Crea la URL final: https://pokeapi.co/api/v2/pokemon?limit=X&offset=Y
        const finalUrl = `${BASE_URL}?${params.toString()}`;

        console.log("--- Actividad 3: Petición Dinámica (Paginación) ---");
        console.log("URL Construida Dinámicamente:", finalUrl);
        // 
        
        try {
            const response = await fetch(finalUrl);
            const data = await response.json();

            // 2. MOSTRAR RESULTADOS
            resultsList.innerHTML = '';
            
            if (data.results && data.results.length > 0) {
                data.results.forEach((pokemon, index) => {
                    const listItem = document.createElement('li');
                    // Calcula el ID secuencial real para la lista
                    const currentId = parseInt(offset) + index + 1; 
                    listItem.textContent = `N° ${currentId} - ${pokemon.name.toUpperCase()} (URL: ${pokemon.url})`;
                    resultsList.appendChild(listItem);
                });
                console.log(`Paginación exitosa. Total de resultados: ${data.count}. Mostrando ${data.results.length} desde el offset ${offset}.`);
            } else {
                resultsList.innerHTML = `<li>No se encontraron Pokémon con los parámetros de inicio (${offset}) y límite (${limit}) dados.</li>`;
            }

        } catch (error) {
            resultsList.innerHTML = `<li>Error al obtener los datos: ${error.message}</li>`;
            console.error('Error en la petición:', error);
        }
    }
});