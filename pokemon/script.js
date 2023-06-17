const linkContainer = document.querySelector(".link");
let pokemonContainer = document.querySelector(".pokemon-main-container")


function createTypes(list, ul){
    list.forEach(function(type){
        let itemLi = document.createElement('li');
        itemLi.innerText = type['type']['name'];
        ul.append(itemLi);

    });
}

function renderPokemon(data){
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    let pokeName = document.createElement('h4')
    pokeName.innerText = data.name
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${data.id}`
    let pokeTypes = document.createElement('ul')
    let image = document.createElement('img');
    let imgURL = data.sprites['front_default'];
    image.src = `${imgURL}`;
    //ul list will hold the pokemon types
    createTypes(data.types, pokeTypes)
    // helper function to go through the types array and create li tags for each one
    pokeContainer.append(pokeName,image,pokeNumber, pokeTypes);
    // pokeContainer.append(pokeName, pokeNumber)
    // //appending all details to the pokeContainer div
    pokemonContainer.appendChild(pokeContainer);
    //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}


async function getPokemon(){
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
    try{
    const call = await fetch(url);
    const res = await call.json();
    const pokemons = res.results;
     for(const pokemon of pokemons){
        const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        let infoInJson = await info.json();
        renderPokemon(infoInJson);
     }
    }
    catch(err){
        console.log(err);
    }
}



getPokemon();
