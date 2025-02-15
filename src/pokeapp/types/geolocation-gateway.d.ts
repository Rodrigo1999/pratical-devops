declare namespace Pokeapp.Gateway{
    interface Geolocation{
        getFullAddressByCep(cep: string): Promise<{
            cep: string
            full_address: string
        } | null>
    }
}