function getPokemonCardTemplate(index, name, image, typesHTML, primaryType) {
    return `
        <div class="pokemon-card bg-type-${primaryType}" onclick="openDialog(${index})">
            <h3 class="pokemon-name">${name}</h3>
            <img src="${image}" alt="${name}">
            <div class="pokemon-types">${typesHTML}</div>
        </div>
    `;
}

function getPokemonDetailTemplate(name, image, typesHTML, statsHTML, primaryType) {
    return `
        <div class="pokemon-detail bg-type-${primaryType}">
            <h2 class="pokemon-detail-name">${name}</h2>
            <img src="${image}" alt="${name}" class="pokemon-detail-image">
            <div class="pokemon-types">${typesHTML}</div>
            ${statsHTML}
        </div> 
    `;
}