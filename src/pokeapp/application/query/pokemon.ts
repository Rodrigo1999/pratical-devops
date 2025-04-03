type InputOutput = IInputOutput<Pokeapp.Query.Pokemon>

export default class QueryPokemon implements Pokeapp.Query.Pokemon{

    async listAllMyPokemon(): InputOutput['listAllMyPokemon']['output'] {
        
        throw new Error('not implemented')
    }
}