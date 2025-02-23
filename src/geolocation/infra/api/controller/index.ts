import geolocationQuery from "@geolocation/application/query";
import ControllerGetInfoCep from "./controller-get-info-cep";

const geolocationController = {
    cep: new ControllerGetInfoCep(geolocationQuery.cep)
}

export default geolocationController