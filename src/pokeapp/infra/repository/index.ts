import dbJsonFile from "@pokeapp/infra/db/db-json";
import db from "@pokeapp/infra/db/db-mysql/db";
import PokemonRepository from "./repository-pokemon";
import PokemonRepositoryMock from "./repository-pokemon-mock";
import ENV from "@config/env.config";

const pokeAppRepository = {
    pokemon: ENV.DATABASE_TYPE === 'json' ? new PokemonRepositoryMock(dbJsonFile) : new PokemonRepository(db),
}

export default pokeAppRepository