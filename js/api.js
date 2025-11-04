async function loadInitialPokemon() {
	try {
		console.log("Starte Pokemon-Laden...");

			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
			);
			const data = await response.json();
		
		console.log("Liste geladen:", data);
		console.log("Anzahl Pokemon:", data.results.length);

			for (let i = 0; i < data.results.length; i++) {
				const pokemon = data.results[i];

				console.log(`Lade Details für:  ${pokemon.name}...`);

				const detailResponse = await fetch(pokemon.url);
				const details = await detailResponse.json();

				console.log(`${details.name} geladen`, details);

				// renderPokemonCard(details);
		}
			console.log("Alle Pokemon geladen!");
		
	} catch (error) {
			console.error("Fehler beim Laden:", error);
		}
}

function renderPokemonCard() {
	const pokemonContainerRef = document.getElementById("pokemon-container");

	pokemonContainerRef.innerHTML = `

	`;
}

function init() {
	console.log("App startet!");
	loadInitialPokemon();
}