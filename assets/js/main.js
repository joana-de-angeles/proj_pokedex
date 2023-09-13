const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0
const maxRecords = 151

let idCard = document.getElementById('idCard')
idCard.hidden = true;
let idClose = document.getElementById('idClose')
const cardHtml = document.getElementById('cardHtml')

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

function convertPokemonToDiv(pokemon){
    return `
        <div id="cardHtml" class="bodyCard">
        <div class="contentCard">
            <div id="idClose" class="close">X</div>
            <div  class="detailHeadCard">
                <div class="titlePlusId">
                    <h1>${pokemon.photo}</h1>
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
                                <td>${pokemon.species}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>${pokemon.height}</td>
                            </tr>
                            <tr>
                                <td>Wheight</td>
                                <td>${pokemon.wheight}</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                ${pokemon.abilities.map((ability) => `<td ${ability}">${ability}</td>`).join()}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')

        pokemonList.innerHTML += newHtml
    })
    .then(() => {
        // Abertura e fechamento do modal
        let cliqueLi = document.getElementsByClassName("pokemon");
        for(let i = 0; i < cliqueLi.length; i++){
            cliqueLi[i].addEventListener('click', () =>{
                idCard.hidden = false;
            })
        }
        idClose.addEventListener('click', () =>{
            idCard.hidden = true;
        })
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




