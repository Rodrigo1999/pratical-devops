import CustomError from "@shared/domain/service/custom-error"

type InputOutput = IInputOutput<Pokedex.Query.Pokemon>

export default class QueryPokemon implements Pokedex.Query.Pokemon {

    constructor(private readonly httpApi: Shared.HttpApi) { }

    async getPokemonById(id: string): InputOutput['getPokemonById']['output'] {

        try {
            const result = await this.httpApi.get<{
                name: string
                abilities: Array<{
                    ability: {
                        name: string
                    }
                    slot: number
                }>
            }>(`/${id.replace('poke_', '')}`)

            if(result.status === 404) throw new CustomError('Ops, não foi possível consultar este pokemon');
            
            return {
                id,
                name: result.data.name,
                ability: result.data.abilities.map(ability => ({
                    name: ability.ability.name,
                    slot: ability.slot
                }))
            }
        } catch (error) {
            if (error instanceof CustomError) throw error

            throw new CustomError('Ops, não foi possível consultar este pokemon')
        }
    }
}