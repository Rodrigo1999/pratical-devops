declare namespace Pokedex.Query{
    interface Pokemon{
        getPokemonById(id: string): Promise<{
            id: string
            name: string
            ability: Array<{
                name: string
                slot: number
            }>
        } | null>
    }
}