declare namespace Pokeapp.DbSchema{
    interface PokemonTable{
        id: string
        name: string
        score: number
        poke_id: string
        last_evolve_at: Date | null
        is_released: boolean
        created_at: Date
        updated_at: Date
    }

    interface AbilityTable{
        id: string
        name: string
        slot: number
        pokemon_id: string
        created_at: Date
        updated_at: Date
    }

    interface AddressTable{
        id: string
        full_address: string
        pokemon_id: string
        created_at: Date
        updated_at: Date
    }

    interface Db{
        pokemon: Pokeapp.DbSchema.PokemonTable[]
        address: Pokeapp.DbSchema.AddressTable[]
        ability: Pokeapp.DbSchema.AbilityTable[]
    }
}