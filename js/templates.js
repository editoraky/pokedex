function getTypesHTML(types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        typesHTML += `<span class="type-badge type-${typeName}">${typeName}</span>`;
    }
    return typesHTML;
}


function getPokemonCardTemplate(name, image, types, index) {
    let typesHTML = getTypesHTML(types);
    let primaryType = types[0].type.name;

    return `
        <div class="pokemon-card bg-type-${primaryType}" onclick="openDialog(${index})">
            <h3 class="pokemon-name">${name.toUpperCase()}</h3>
            <img src="${image}" alt="${name}">
            <div class="pokemon-types">${typesHTML}</div>
        </div>
    `;
}

function getPokemonDetailTemplate(pokemon) {
    const typesHTML = getTypesHTML(pokemon.types);
    const primaryType = pokemon.types[0].type.name;
    const statsHTML = getStatsHTML(pokemon);

    return `
        <div class="pokemon-detail bg-type-${primaryType}">
            <h2 class="pokemon-detail-name">${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" 
            alt="${pokemon.name}" class="pokemon-detail-image">
            <div class="pokemon-types">${typesHTML}</div>
            ${statsHTML}
        </div> 
    `;
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