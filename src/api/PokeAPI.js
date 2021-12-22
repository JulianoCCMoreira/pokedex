import axios from "axios";

const PokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

const getPokemons = (initial, limit = 12) => {
  return PokeAPI.get("", {
    params: {
      offset: initial,
      limit: limit,
    },
  }).then((response) => {
    return response.data.results.map((element) => {
      const id = element.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", "");

      return {
        id,
        nome: element.name,
        url: element.url,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });
  });
};
const getBasicPokemonByName = (pokemonName) => {
  return PokeAPI.get(pokemonName)
    .then((response) => {
      const pokemon = response.data;
  
      return {
        id: pokemon.id,
        nome: pokemon.forms[0].name,
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon.forms[0].name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
      };
    })
    .catch((error) => {});
};

const getPokemonByName = (pokemonName) => {
  return PokeAPI.get(pokemonName)
    .then((response) => {
      const pokemon = response.data;

      return {
        id: pokemon.id,
        nome: pokemon.forms[0].name,
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon.forms[0].name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        tipo: pokemon.types[0].type,
        peso: pokemon.weight,
        altura: pokemon.height,
        abilidade: pokemon.abilities,
      };
    })
    .catch((error) => {});
};

module.exports = {
  getPokemons,
  getPokemonByName,
  getBasicPokemonByName
};

export default PokeAPI;
