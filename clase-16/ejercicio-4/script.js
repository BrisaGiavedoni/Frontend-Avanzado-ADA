document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const typeIdInput = document.getElementById('typeIdInput');
    const limitInput = document.getElementById('limitInput');
    const offsetInput = document.getElementById('offsetInput');
    const resultsList = document.getElementById('resultsList');
    
    // Base del endpoint para el FILTRADO por Tipo
    const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

    searchButton.addEventListener('click', fetchFilteredAndPaginatedPokemon);

    fetchFilteredAndPaginatedPokemon(); 

    async function fetchFilteredAndPaginatedPokemon() {
        const typeId = typeIdInput.value;
        const limit = parseInt(limitInput.value);
        const offset = parseInt(offsetInput.value);
        
        resultsList.innerHTML = '<li>Cargando lista de Pokémon...</li>';

        // 1. CONSTRUCCIÓN DE LA URL DINÁMICA (SOLO FILTRO DE TIPO)
        // La URL de filtrado por Tipo incluye el ID del Tipo directamente en el path, no como query param
        const filterUrl = `${TYPE_BASE_URL}${typeId}`;

        console.log("--- Actividad 4: Petición Combinada de Filtros ---");
        console.log("URL de Filtrado (Path Parameter):", filterUrl);

        try {
            // Petición 1: Obtener TODOS los Pokémon del Tipo X
            const response = await fetch(filterUrl);
            const typeData = await response.json();
            
            // La lista de Pokémon para un Tipo está dentro de typeData.pokemon
            const allPokemonOfType = typeData.pokemon;

            // 2. APLICAR PAGINACIÓN (limit y offset) en el cliente
            // La PokeAPI devuelve la lista completa del Tipo, por lo que debemos aplicar limit/offset manualmente
            const start = offset;
            const end = offset + limit;
            const paginatedPokemon = allPokemonOfType.slice(start, end);
            
            console.log(`- Filtro de Tipo: Aplicado al Endpoint: /type/${typeId}`);
            console.log(`- Paginación: Aplicada en el cliente. Mostrando ${paginatedPokemon.length} de un total de ${allPokemonOfType.length} (desde offset ${offset}).`);
            
            // 3. MOSTRAR RESULTADOS
            resultsList.innerHTML = '';
            
            if (paginatedPokemon.length === 0) {
                resultsList.innerHTML = `<li>No se encontraron Pokémon en el rango de paginación (${offset} a ${end}) para el Tipo ID: ${typeId}.</li>`;
            } else {
                paginatedPokemon.forEach((item, index) => {
                    const listItem = document.createElement('li');
                    // El índice real en la lista completa
                    const currentId = offset + index + 1; 
                    listItem.textContent = `N° ${currentId}. ${item.pokemon.name.toUpperCase()} | Tipo ID: ${typeId}`;
                    resultsList.appendChild(listItem);
                });
            }

        } catch (error) {
            resultsList.innerHTML = `<li>Error al obtener los datos: ${error.message}</li>`;
            console.error('Error en la petición:', error);
        }
    }
});