import geolocationGateway from "@geolocation/application/gateway";
import QueryCEP from "./cep";

const geolocationQuery = {
    cep: new QueryCEP({
        infoCepGateway: geolocationGateway.infoCEP
    })
}

export default geolocationQuery