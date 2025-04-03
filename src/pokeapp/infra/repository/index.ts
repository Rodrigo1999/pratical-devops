import dbJsonFile from "../db/db-json";
import PokemonRepository from "./repository-pokemon";
import PokemonRepositoryMock from "./repository-pokemon-mock";

const pokeAppRepository = {
    pokemon: new PokemonRepositoryMock(dbJsonFile)
}

export default pokeAppRepository