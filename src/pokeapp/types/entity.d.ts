declare namespace Pokeapp.Entity{
    interface PokemonDTO extends Shared.IEntityDTO{
        name: string
        score: number
        lastAddressCaptured: string
        last_evolve_at: Date | null
        is_released: boolean
    }

    type PokemonDTOCreate = PartialRange<Omit<Pokeapp.Entity.PokemonDTO, keyof Shared.IEntityDTO | 'lastAddressCaptured' | 'is_released'>, 'score' | 'last_evolve_at'> & {
        capturedAddress: string
    }
}