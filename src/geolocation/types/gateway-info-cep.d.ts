declare namespace Geolocation.Gateway{
    interface InfoCep{
        getInfoByCep(cep: string): Promise<{
            street: string
            neighborhood: string
            city: string
            state: string
            country: string
            cep: string
        }>
    }
}