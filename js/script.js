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

function openDialog(index) {
    currentPokemonIndex = index;
    const pokemon = allPokemon[index];

    const dialog = document.getElementById("pokemon-dialog");
    const content = document.getElementById("dialog-pokemon-content");

    content.innerHTML = getPokemonDetailTemplate(pokemon);
    dialog.showModal();
    document.body.classList.add("no-scroll");
}

function closeDialog() {
    const dialog = document.getElementById("pokemon-dialog");
    dialog.close();

    document.body.classList.remove("no-scroll");
}

function navigatePokemon(direction) {
    currentPokemonIndex = currentPokemonIndex + direction;

    if (currentPokemonIndex < 0) {
        currentPokemonIndex = 0;
    }
    if (currentPokemonIndex >= allPokemon.length) {
        currentPokemonIndex = allPokemon.length - 1;
    }

    const pokemon = allPokemon[currentPokemonIndex];
    const content = document.getElementById("dialog-pokemon-content");
    content.innerHTML = getPokemonDetailTemplate(pokemon);
}

function renderSearchResults(searchTerm, container) {
    let foundCount = 0;

    for (let i = 0; i < allPokemon.length; i++) {
			const pokemon = allPokemon[i];
			const name = pokemon.name;
			const nameLower = name.toLowerCase();

			if (nameLower.includes(searchTerm)) {
				const image = pokemon.sprites.other["official-artwork"].front_default;
				const types = pokemon.types;
				const html = getPokemonCardTemplate(name, image, types, i);
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
}

function showAllPokemon() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        const name = pokemon.name;
        const image = pokemon.sprites.other["official-artwork"].front_default;
        const types = pokemon.types;
        const html = getPokemonCardTemplate(name, image, types, i);
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