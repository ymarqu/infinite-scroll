const linkContainer = document.querySelector(".link");
let pokemonContainer = document.querySelector(".pokemon-main-container")


function createTypes(list, ul){
    list.forEach(function(type){
        let itemLi = document.createElement('li');
        let text = type['type']['name']
        itemLi.innerText = text.toUpperCase();
        ul.append(itemLi);

    });
}

function renderPokemon(data){
    //Create card container
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('card');
    pokeContainer.style.width = "25rem"
    pokeContainer.style.height = "40rem"
    //create image
    let image = document.createElement('img');
    image.classList.add('card-img-top')
    let imgURL = data.sprites['front_default'];
    image.src = `${imgURL}`;
    // image.style.height = "16rem"
    //Create card title
    let textContainer = document.createElement('div');
    textContainer.classList.add('card-body');
    let pokeName = document.createElement('h4')
    pokeName.innerText = data.name.toUpperCase();
    //Create Pokemon Id number
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${data.id}`
    //Create list of pokemon abilities
    let pokeTypes = document.createElement('ul')
    createTypes(data.types, pokeTypes)
    let btn = document.createElement('button');
    btn.innerText = "See more"
    btn.classList.add('btn', 'btn-warning', 'btn-lg');
    textContainer.append(pokeName, pokeNumber, pokeTypes, btn);
    // helper function to go through the types array and create li tags for each one
    pokeContainer.append(image, textContainer);
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
