import geolocationController from "@geolocation/infra/api/controller"

type InputOutput = IInputOutput<Pokeapp.Gateway.Geolocation>

export default class GeolocationGateway implements Pokeapp.Gateway.Geolocation{

    async getFullAddressByCep(cep: InputOutput['getFullAddressByCep']['input'][0]): InputOutput['getFullAddressByCep']['output'] {
        const {result} = await geolocationController.cep.gatewayProvider(cep)

        return {
            cep: result.cep,
            full_address: result.full_address
        }
    }
}