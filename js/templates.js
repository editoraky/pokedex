function getPokemonCardTemplate(name, image, types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        typesHTML += `<span class="type-badge" style="background: var(--type-${typeName})">${typeName}</span>`;
    }    
    return `
        <div class="pokemon-card" style="background: var(--type-${types[0].type.name})">
                    <h3 class="pokemon-name">${name}</h3>
                    <img src="${image}" alt="${name}">
                    <div class="pokemon-types">${typesHTML}</div>
                </div>
    `;
}