declare namespace Pokeapp.Query{
    interface Pokemon{
        listAllMyPokemon(): Promise<Array<{
            id: string
            poke_id: string
            name: string
            level: Pokeapp.PokeLevel
            score: number
            last_address_captured: string
            ability: Array<{
                name: string
                slot: number
            }>
        }>>
    }
}