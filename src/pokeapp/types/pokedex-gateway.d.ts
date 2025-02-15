declare namespace Pokeapp.Gateway{
    interface Pokedex{
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