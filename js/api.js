let offset = 0;

async function loadPokemon() {
	const spinner = document.getElementById("loading-spinner");
	spinner.classList.remove("hidden");

	const loadMoreBtn = document.getElementById("load-more-btn");
	loadMoreBtn.disabled = true;
	loadMoreBtn.textContent = "Loading...";

	try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
			const data = await response.json();
		  

			for (let i = 0; i < data.results.length; i++) {
				const pokemon = data.results[i];
				
				const detailResponse = await fetch(pokemon.url);
				const details = await detailResponse.json();

				allPokemon.push(details);

				const name = details.name;
				const image = details.sprites.other["official-artwork"].front_default;
				const types = details.types;

				const currentIndex = allPokemon.length - 1;

				const nameUpper = name.toUpperCase();
				const typesHTML = getTypesHTML(types);
				const primaryType = types[0].type.name;

				const html = getPokemonCardTemplate(currentIndex, nameUpper, image, typesHTML, primaryType);
				
				const container = document.getElementById("pokemon-container");
				container.innerHTML += html;
		}
		offset += 20;
		
	} catch (error) {
			console.error("Fehler beim Laden:", error);
	} finally {
		spinner.classList.add("hidden");
		loadMoreBtn.disabled = false;
		loadMoreBtn.textContent = "Load More Pokemon";
	}
	document.getElementById("load-more-btn").classList.remove("hidden");
}
