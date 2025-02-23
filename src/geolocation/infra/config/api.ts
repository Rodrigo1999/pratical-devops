import { HttpApi } from "@geolocation/infra/service";

export const viacepApi = new HttpApi({
    serviceName: 'viacep',
    baseURL: 'https://viacep.com.br/ws'
})