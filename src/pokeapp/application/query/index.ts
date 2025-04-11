import dbJsonFile from "@pokeapp/infra/db/db-json";
import QueryPokemonJson from "./pokemon-json";
import QueryPokemon from "./pokemon";
import db from "@pokeapp/infra/db/db-mysql/db";

const pokeappQuery = {
    // pokemon: new QueryPokemonJson(dbJsonFile),
    pokemon: new QueryPokemon(db),
}

export default pokeappQuery