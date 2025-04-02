export default class ControllerGetPokemonById{

    constructor(private readonly pokemonQuery: Pick<Pokedex.Query.Pokemon, 'getPokemonById'>){

    }

    async gatewayProvider(poke_id: string){
        const result = await this.pokemonQuery.getPokemonById(poke_id)

        return {
            result
        }
    }
}