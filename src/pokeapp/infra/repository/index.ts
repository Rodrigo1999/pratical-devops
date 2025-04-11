import dbJsonFile from "../db/db-json";
import db from "@pokeapp/infra/db/db-mysql/db";
import PokemonRepository from "./repository-pokemon";
import PokemonRepositoryMock from "./repository-pokemon-mock";

const pokeAppRepository = {
    // pokemon: new PokemonRepositoryMock(dbJsonFile),
    pokemon: new PokemonRepository(db),
}

export default pokeAppRepository