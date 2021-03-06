const pokedex = document.getElementById('pokedex');
let data = [];
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites['front_shiny'],
      type: result.types.map((type) => type.type.name).join(', '),
      id: result.id,
    }));
    data = pokemon;
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (poke) => `
        <li class="card">
            <img class="card-image" src="${poke.image}"/>
            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
            <p class="card-subtitle">Type: ${poke.type}</p>
        </li>
    `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

const getPokemonData = (event, searchText) => {
  event.preventDefault();
  const filterData = data.filter(
    (item) => item.name.toUpperCase() == searchText.toUpperCase()
  );
  const pokemonHTMLString = filterData
    .map(
      (poke) => `
            <li class="card">
                <img class="card-image" src="${poke.image}"/>
                <h2 class="card-title">${poke.id}. ${poke.name}</h2>
                <p class="card-subtitle">Type: ${poke.type}</p>
            </li>
        `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

const search_term = document.getElementById('search-input');
const search_btn = document.getElementById('search-button');
search_btn.addEventListener('click', (e) =>
  getPokemonData(e, search_term.value)
);

fetchPokemon();
