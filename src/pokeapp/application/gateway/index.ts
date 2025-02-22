import GeolocationGateway from "./geolocation-gateway";
import PokedexGateway from "./pokedex-gateway";

const pokeAppGateway = {
    pokedex: new PokedexGateway(),
    geolocation: new GeolocationGateway()
}

export default pokeAppGateway