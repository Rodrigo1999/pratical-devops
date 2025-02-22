
type InputOutput = IInputOutput<Pokeapp.Gateway.Pokedex>

export default class PokedexGateway implements Pokeapp.Gateway.Pokedex{

    getPokemonById(id: InputOutput['getPokemonById']['input']): InputOutput['getPokemonById']['output'] {
        throw new Error("Method not implemented.");
    }
}