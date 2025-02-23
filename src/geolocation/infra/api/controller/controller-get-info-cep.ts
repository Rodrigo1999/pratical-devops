export default class ControllerGetInfoCep{

    constructor(private readonly infoCepQuery: Pick<Geolocation.Query.Cep, 'getInfoByCep'>){

    }

    async gatewayProvider(cep: string){
        const result = await this.infoCepQuery.getInfoByCep(cep)

        return {
            result
        }
    }
}