
type InputOutput = IInputOutput<Pokeapp.Gateway.Geolocation>

export default class GeolocationGateway implements Pokeapp.Gateway.Geolocation{

    getFullAddressByCep(cep: InputOutput['getFullAddressByCep']['input']): InputOutput['getFullAddressByCep']['output'] {
        throw new Error("Method not implemented.");
    }
}