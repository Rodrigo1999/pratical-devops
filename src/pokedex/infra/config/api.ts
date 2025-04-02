import { HttpApi } from "@pokedex/infra/service";

export const pokeApi = new HttpApi({
    serviceName: 'pokeapi',
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})