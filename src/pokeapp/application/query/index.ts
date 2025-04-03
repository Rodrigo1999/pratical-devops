import dbJsonFile from "@pokeapp/infra/db/db-json";
import QueryPokemonJson from "./pokemon-json";
// import QueryPokemon from "./pokemon";

const pokeappQuery = {
    pokemon: new QueryPokemonJson(dbJsonFile)
}

export default pokeappQuery