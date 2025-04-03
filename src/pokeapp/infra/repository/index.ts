import PokemonRepository from "./repository-pokemon";
import PokemonRepositoryMock from "./repository-pokemon-mock";

const pokeAppRepository = {
    pokemon: new PokemonRepositoryMock()
}

export default pokeAppRepository