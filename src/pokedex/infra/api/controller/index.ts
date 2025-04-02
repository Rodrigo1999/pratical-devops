import pokedexQuery from "@pokedex/application/query";
import ControllerGetPokemonById from "./pokemon-get-by-id";

const pokedexController = {
    getPokemonById: new ControllerGetPokemonById(pokedexQuery.pokemon)
}

export default pokedexController