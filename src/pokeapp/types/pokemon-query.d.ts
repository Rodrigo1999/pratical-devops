declare namespace Pokeapp.Query{
    interface Pokemon{
        listAllMyPokemon(): Promise<Array<{
            id: string
            poke_id: string
            name: string
            level: Pokeapp.PokeLevel
            score: number
            ability: Array<{
                name: string
                slot: number
            }>
            last_address_captured: string
        }>>
    }
}