const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 15
let offset = 0
const maxRecords = 151

let idCard = document.getElementById('idCard')
idCard.hidden = true;

const cardHtml = document.getElementById('cardHtml')

const elementSelected = []
let pokemonArray = []



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    ` 
}

function showDetailsCard(pokemon){
    return `
        <div id="cardHtml" class="bodyCard">
        <div class="contentCard">
            <div class="close">X</div>
            <div  class="detailHeadCard">
                <div class="titlePlusId">
                    <h1>${pokemon.name}</h1>
                    <p>#${pokemon.number}</p>
                </div>
                <div class="detachDetail ${pokemon.type}">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
            <div class="detailBodyCard">
                <div class="typeDetail ${pokemon.type}">
                    <p>${pokemon.type}</p>
                </div>
                <div class="tableList">
                    <table>
                        <tbody>
                            <tr>
                                <td>Species</td>
                                <td>${pokemon.speciesName}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>${pokemon.height} inch | ${pokemon.height * 2.54} cm </td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>${pokemon.weight} lbs | ${pokemon.weight * 0.45359237.toFixed(1)} kg</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                ${pokemon.abilities.map((ability) => `<td>${ability}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `
    
}

function showCard(){
    
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        pokemonArray = [...pokemons]
        // console.log(pokemonArray)
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        
        pokemonList.innerHTML += newHtml
    })
    .then(() => {
        
        // Abertura e fechamento do modal
        let cliqueLi = document.getElementsByClassName("pokemon");

        for(let i = 0; i < cliqueLi.length; i++){
            cliqueLi[i].addEventListener('click', () =>{
            
                let idSelectedPokemon = document.getElementsByClassName('number')
                
                let filterPokemonArray = pokemonArray.filter((item) => item.number == idSelectedPokemon[i].innerHTML.substring(1))
                // let pokemonsCards = filterPokemonArray[0]
                

                const newHtmlCard = filterPokemonArray.map(showDetailsCard).join('');

                idCard.hidden = false;

                // const newHtmlCard = showDetailsCard(pokemonsCards)

              
                idCard.innerHTML += newHtmlCard
                
                let buttonClose = document.getElementsByClassName('close')

            
                if(buttonClose){
                    for(let i = 0; i < buttonClose.length; i++){
                        buttonClose[i].addEventListener('click', () =>{
                            idCard.hidden = true;
                        })
                    }
                }
            })
        }
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }  
})










