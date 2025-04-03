import pokeappQuery from "@pokeapp/application/query";
import ControllerGetAllCapturedPokemon from "./pokemon-list-all-captured";
import ControllerCapturePokemon from "./pokemon-capture";
import pokeAppUseCase from "@pokeapp/application/use-case";
import ControllerReleasePokemon from "./pokemon-release";
import ControllerEvolvePokemon from "./pokemon-evolve";
import ControllerRecapturePokemon from "./pokemon-recapture";

const pokeappController = {
    getAllCapturedPokemon: new ControllerGetAllCapturedPokemon(pokeappQuery.pokemon),
    capturePokemon: new ControllerCapturePokemon(pokeAppUseCase.capture),
    releasePokemon: new ControllerReleasePokemon(pokeAppUseCase.release),
    evolvePokemon: new ControllerEvolvePokemon(pokeAppUseCase.envolve),
    recapturePokemon: new ControllerRecapturePokemon(pokeAppUseCase.recapture)
}

export default pokeappController