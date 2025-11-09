let currentPokemonIndex = 0;
let allPokemon = [];

function init() {
	loadPokemon();

	const dialog = document.getElementById("pokemon-dialog");

	dialog.addEventListener("click", function (event) {
		if (event.target === dialog) {
			closeDialog();
		}
	});
}

function getTypesHTML(types) {
	let typesHTML = "";
	for (let i = 0; i < types.length; i++) {
		const typeName = types[i].type.name;
		typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
	}
	return typesHTML;
}

function getStatsHTML(pokemon) {
	const hp = pokemon.stats[0].base_stat;
	const attack = pokemon.stats[1].base_stat;
	const defense = pokemon.stats[2].base_stat;
	const speed = pokemon.stats[5].base_stat;

	return `
        <div class="pokemon-stats">
            <div class="stat-item">
                <span class="stat-label">HP:</span>
                <span class="stat-value">${hp}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Attack:</span>
                <span class="stat-value">${attack}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Defense:</span>
                <span class="stat-value">${defense}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Speed:</span>
                <span class="stat-value">${speed}</span>
            </div>
    `;
}

function openDialog(index) {
    currentPokemonIndex = index;
    const pokemon = allPokemon[index];
    const dialogContent = document.getElementById("dialog-pokemon-content");
    
    const name = pokemon.name.toUpperCase();
    const image = pokemon.sprites.other["official-artwork"].front_default;
    const typesHTML = getTypesHTML(pokemon.types);
    const statsHTML = getStatsHTML(pokemon);
    const primaryType = pokemon.types[0].type.name;

    dialogContent.innerHTML = getPokemonDetailTemplate(name, image, typesHTML, statsHTML, primaryType);
    updateNavButtons(index);

    const dialog = document.getElementById("pokemon-dialog");
    dialog.showModal();

    document.body.classList.add("no-scroll");
}

function closeDialog() {
    const dialog = document.getElementById("pokemon-dialog");
    dialog.close();

    document.body.classList.remove("no-scroll");
 }

function navigatePokemon(direction) {
    const newIndex = currentPokemonIndex + direction;

    if (newIndex >= 0 && newIndex < allPokemon.length) {
        openDialog(newIndex);
    }
}

function updateNavButtons(index) {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const totalPokemon = allPokemon.length;

    prevButton.disabled = (index === 0);
    nextButton.disabled = (index === totalPokemon - 1);
}

function renderSearchResults(searchTerm, container) {
    let foundCount = 0;

    for (let i = 0; i < allPokemon.length; i++) {
			const pokemon = allPokemon[i];
			const name = pokemon.name;
			const nameLower = name.toLowerCase();

			if (nameLower.includes(searchTerm)) {
				const image = pokemon.sprites.other["official-artwork"].front_default;
                const typesHTML = getTypesHTML(pokemon.types);
                const nameUpper = pokemon.name.toUpperCase();
                const primaryType = pokemon.types[0].type.name;
                const index = i;
				
                const html = getPokemonCardTemplate(index, nameUpper, image, typesHTML, primaryType);
				container.innerHTML += html;
				foundCount++;
			}
    }
    return foundCount;
}

function searchPokemon() {
	const input = document.getElementById("search-input");
	const searchTerm = input.value.toLowerCase();

	const container = document.getElementById("pokemon-container");
	container.innerHTML = "";

    const foundCount = renderSearchResults(searchTerm, container);
	
    if (foundCount === 0) {
		container.innerHTML =
			'<p class="no-results">No Pokemon found! Try another name.</p>';
    }
    document.getElementById("load-more-btn").classList.add("hidden");
    document.getElementById("reset-button").classList.remove("hidden");
    input.value = "";
}

function showAllPokemon() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        const nameUpper = pokemon.name.toUpperCase();
        const image = pokemon.sprites.other["official-artwork"].front_default;
        const typesHTML = getTypesHTML(pokemon.types);
        const primaryType = pokemon.types[0].type.name;
        const index = i;
        const html = getPokemonCardTemplate(index, nameUpper, image, typesHTML, primaryType);
        container.innerHTML += html;
    }
    document.getElementById("load-more-btn").classList.remove("hidden");
    document.getElementById("reset-button").classList.add("hidden");
}

function checkSearchInput() {
    const input = document.getElementById("search-input");
    const button = document.getElementById("search-btn");

    if (input.value.length >= 3) {
        button.disabled = false;
    } else {
        button.disabled = true;

        if (input.value.length === 0) {
            showAllPokemon();
        }
    }
}

function loadMorePokemon() {
    loadPokemon();
}