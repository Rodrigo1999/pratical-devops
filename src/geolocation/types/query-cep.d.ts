declare namespace Geolocation.Query{
    interface Cep{
        getInfoByCep(cep: string): Promise<{
            full_address: string
            cep: string
        }>
    }
}