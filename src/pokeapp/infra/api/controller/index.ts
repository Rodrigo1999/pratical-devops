import pokeappQuery from "@pokeapp/application/query";
import ControllerGetAllCapturedPokemon from "./pokemon-list-all-captured";

const pokeappController = {
    getAllCapturedPokemon: new ControllerGetAllCapturedPokemon(pokeappQuery.pokemon)
}

export default pokeappController