document.addEventListener('DOMContentLoaded', () => {
    // 1. Definición de elementos DOM
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const metadataDisplay = document.getElementById('metadataDisplay');
    const pokemonList = document.getElementById('pokemonList');
    
    // Variables de estado global
    let currentUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    let nextUrl = null;
    let prevUrl = null;
    let totalCount = 0;

    // 2. Conexión de Eventos a la Lógica de Paginación
    prevButton.addEventListener('click', () => {
        if (prevUrl) {
            fetchPokemonPage(prevUrl);
        }
    });

    nextButton.addEventListener('click', () => {
        if (nextUrl) {
            fetchPokemonPage(nextUrl);
        }
    });

    // Función principal que maneja la petición y actualiza el estado y la interfaz
    async function fetchPokemonPage(url) {
        // Mostrar estado de carga (limpia el listado pero mantiene la información de paginación)
        pokemonList.innerHTML = '<li>Cargando Pokémon...</li>';
        metadataDisplay.textContent = 'Actualizando metadatos...';
        
        console.log("--- Actividad 6: Petición Real de Paginado ---");
        console.log("URL de Petición:", url);

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            // 1. EXTRACTAR METADATOS (PokeAPI fields)
            totalCount = data.count;
            nextUrl = data.next;
            prevUrl = data.previous;
            
            const currentPokemon = data.results;

            // 2. MOSTRAR METADATOS EN LA INTERFAZ
            // Obtener el offset de la URL para calcular el rango actual
            const urlObj = new URL(url);
            const currentOffset = parseInt(urlObj.searchParams.get('offset')) || 0;
            const currentLimit = currentPokemon.length;
            
            metadataDisplay.innerHTML = `
                Mostrando **${currentOffset + 1} a ${currentOffset + currentLimit}**
                de un total de **${totalCount}** resultados.
                <br><small>Siguiente URL: ${nextUrl ? nextUrl : 'N/A'}</small>
            `;
            
            // 3. RENDERIZAR LA LISTA (SOLUCIÓN DEL PROBLEMA)
            pokemonList.innerHTML = ''; // <-- Limpia el mensaje de "Cargando..."
            if (currentPokemon && currentPokemon.length > 0) {
                currentPokemon.forEach((pokemon, index) => {
                    const listItem = document.createElement('li');
                    const globalIndex = currentOffset + index + 1; // Calcula el N° real
                    listItem.textContent = `N° ${globalIndex}: ${pokemon.name.toUpperCase()}`;
                    pokemonList.appendChild(listItem);
                });
            } else {
                 pokemonList.innerHTML = '<li>No se encontraron Pokémon en esta página.</li>';
            }

            // 4. HABILITAR/DESHABILITAR BOTONES (SOLUCIÓN DEL PROBLEMA)
            prevButton.disabled = !prevUrl;
            nextButton.disabled = !nextUrl;

        } catch (error) {
            pokemonList.innerHTML = `<li>Error al obtener los datos de la API: ${error.message}</li>`;
            metadataDisplay.textContent = 'Error en la conexión. Revisar consola (F12).';
            console.error('Error en la petición o renderizado:', error);
            // Deshabilitar botones en caso de error
            prevButton.disabled = true;
            nextButton.disabled = true;
        }
    }

    // Iniciar el proceso cargando la primera página
    fetchPokemonPage(currentUrl);
});