document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pageInfo = document.getElementById('pageInfo');
    const pokemonList = document.getElementById('pokemonList');
    
    // Configuración del paginado
    const PAGE_SIZE = 10; // Mostrar 10 elementos por página
    let allPokemon = []; // Almacenará la colección completa (100 Pokémon)
    let currentPage = 1;

    // Endpoint para obtener la colección completa (100 Pokémon en una sola llamada)
    const COLLECTION_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100';

    function renderPokemonList() {
        // Cálculo de índices para el paginado (Consigna)
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        
        // Uso del método .slice() para obtener el bloque actual
        const currentPokemon = allPokemon.slice(startIndex, endIndex);

        // 

        // Actualizar la lista en el HTML
        pokemonList.innerHTML = '';
        currentPokemon.forEach((pokemon, index) => {
            const listItem = document.createElement('li');
            const globalIndex = startIndex + index + 1;
            listItem.innerHTML = `<strong>N° ${globalIndex}</strong>: ${pokemon.name.toUpperCase()} <br><small>URL: ${pokemon.url}</small>`;
            pokemonList.appendChild(listItem);
        });

        // Actualizar la información de la página
        const totalPages = Math.ceil(allPokemon.length / PAGE_SIZE);
        pageInfo.textContent = `Página ${currentPage} de ${totalPages} (Total: ${allPokemon.length} Pokémon)`;

        // Control de los botones de Anterior/Siguiente
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;

        console.log(`Paginado en Front-End: Mostrando Pokémon desde el índice ${startIndex} hasta el ${endIndex - 1}.`);
    }

    // Manejadores de eventos para los botones
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPokemonList();
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(allPokemon.length / PAGE_SIZE);
        if (currentPage < totalPages) {
            currentPage++;
            renderPokemonList();
        }
    });

    // Función de inicialización: Obtiene todos los datos una sola vez
    async function initialize() {
        try {
            const response = await fetch(COLLECTION_URL);
            const data = await response.json();
            
            // ALMACENAR SOLO EL ARRAY DE RESULTADOS (los 100 Pokémon)
            allPokemon = data.results;
            
            console.log(`Colección completa descargada de PokeAPI. Total de elementos: ${allPokemon.length}`);
            
            // Renderizar la primera página
            renderPokemonList();
            
        } catch (error) {
            pokemonList.innerHTML = `<li>Error al cargar la colección completa de PokeAPI: ${error.message}</li>`;
            pageInfo.textContent = 'Error';
            console.error('Error de inicialización:', error);
        }
    }

    initialize();
});