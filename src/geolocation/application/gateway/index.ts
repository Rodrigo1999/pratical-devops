import { viacepApi } from "@geolocation/infra/config/api";
import GetInfoCepGateway from "./get-info-cep";

const geolocationGateway = {
    infoCEP: new GetInfoCepGateway(viacepApi)
}

export default geolocationGateway