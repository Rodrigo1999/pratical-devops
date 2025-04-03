import pokeAppRepository from "@pokeapp/infra/repository"
import UseCasePokemonCapture from "./pokemon-caputre"
import pokeAppGateway from "@pokeapp/application/gateway"
import UseCasePokemonEvolve from "./pokemon-evolve"
import UseCasePokemonRecapture from "./pokemon-recapture"
import UseCasePokemonRelease from "./pokemon-release"

const pokeAppUseCase = {
    capture: new UseCasePokemonCapture({
        pokemonRepository: pokeAppRepository.pokemon,
        geolocationGateway: pokeAppGateway.geolocation,
        pokedexGateway: pokeAppGateway.pokedex
    }),
    recapture: new UseCasePokemonRecapture({
        pokemonRepository: pokeAppRepository.pokemon,
        geolocationGateway: pokeAppGateway.geolocation
    }),
    envolve: new UseCasePokemonEvolve({
        pokemonRepository: pokeAppRepository.pokemon,
    }),
    release: new UseCasePokemonRelease({
        pokemonRepository: pokeAppRepository.pokemon,
    })
}

export default pokeAppUseCase

export type PokeAppUseCase = typeof pokeAppUseCase