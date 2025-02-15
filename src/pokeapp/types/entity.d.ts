declare namespace Pokeapp.Entity{
    interface PokemonDTO extends Shared.IEntityDTO{
        name: string
        score: number
        lastAddressCaptured: unknown
    }

    type PokemonDTOCreate = PartialRange<Omit<Pokeapp.Entity.PokemonDTO, keyof Shared.IEntityDTO | 'lastAddressCaptured'>, 'score'> & {
        capturedAddress: string
    }
}