import pokedexController from "@pokedex/infra/api/controller"
type InputOutput = IInputOutput<Pokeapp.Gateway.Pokedex>

export default class PokedexGateway implements Pokeapp.Gateway.Pokedex{

    async getPokemonById(poke_id: InputOutput['getPokemonById']['input'][0]): InputOutput['getPokemonById']['output'] {
        const {result} = await pokedexController.getPokemonById.gatewayProvider(poke_id)

        return result
    }
}