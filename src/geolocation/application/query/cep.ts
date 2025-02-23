import { Address, CEP } from "@geolocation/domain/vo"

type InputOutput = IInputOutput<Geolocation.Query.Cep>

interface Dependencies{
    infoCepGateway: Pick<Geolocation.Gateway.InfoCep, 'getInfoByCep'>
}
export default class QueryCEP implements Geolocation.Query.Cep{

    constructor(private readonly deps: Dependencies){}
    
    async getInfoByCep(_cep: string): InputOutput['getInfoByCep']['output'] {
        
        const cep = new CEP(_cep)

        const cepInfo = await this.deps.infoCepGateway.getInfoByCep(cep.value)

        const fullAddress = new Address(`
            ${cepInfo.street || 'N/A'},
            ${cepInfo.neighborhood || 'N/A'},
            ${cepInfo.city},
            ${cepInfo.state},
            ${cepInfo.country},
            ${cep.value}
        `)

        return {
            cep: cep.value,
            full_address: fullAddress.value
        }
    }
}