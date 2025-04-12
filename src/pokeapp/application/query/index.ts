import dbJsonFile from "@pokeapp/infra/db/db-json";
import QueryPokemonJson from "./pokemon-json";
import QueryPokemon from "./pokemon";
import db from "@pokeapp/infra/db/db-mysql/db";
import ENV from "@config/env.config";

const pokeappQuery = {
    pokemon: ENV.isTest ? new QueryPokemonJson(dbJsonFile) : new QueryPokemon(db),
}

export default pokeappQuery