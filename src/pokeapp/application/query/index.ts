import dbJsonFile from "@pokeapp/infra/db/db-json";
import QueryPokemonJson from "./pokemon-json";
import QueryPokemon from "./pokemon";
import db from "@pokeapp/infra/db/db-mysql/db";
import ENV from "@config/env.config";
import AppHealth from "./app-health";

const pokeappQuery = {
    pokemon: ENV.DATABASE_TYPE === 'json' ? new QueryPokemonJson(dbJsonFile) : new QueryPokemon(db),
    health: new AppHealth()
}

export default pokeappQuery