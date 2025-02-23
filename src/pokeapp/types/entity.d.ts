declare namespace Pokeapp.Entity{
    interface PokemonDTO extends Shared.IEntityDTO{
        name: string
        score: number
        lastAddressCaptured: string
        last_evolve_at: Date | null
        is_released: boolean
        ability: Array<{
            name: string
            slot: number
        }>
        poke_id: string
    }

    type PokemonDTOCreate = PartialRange<Omit<Pokeapp.Entity.PokemonDTO, keyof Shared.IEntityDTO | 'lastAddressCaptured' | 'is_released'>, 'score' | 'last_evolve_at' | 'ability'> & {
        capturedAddress: string
    }
}