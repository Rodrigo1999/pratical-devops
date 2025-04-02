import { pokeApi } from "@pokedex/infra/config/api";
import QueryPokemon from "./pokemon";

const pokedexQuery = {
    pokemon: new QueryPokemon(pokeApi)
}

export default pokedexQuery