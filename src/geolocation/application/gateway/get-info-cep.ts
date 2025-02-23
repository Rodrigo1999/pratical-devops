import CustomError from "@shared/domain/service/custom-error";

type InputOutput = IInputOutput<Geolocation.Gateway.InfoCep>

export default class GetInfoCepGateway implements Geolocation.Gateway.InfoCep{

    constructor(private readonly httpApi: Geolocation.HttpApi){

    }

    async getInfoByCep(cep: string): InputOutput['getInfoByCep']['output'] {
        try {
            const result = await this.httpApi.get<{
                cep: string;
                logradouro: string;
                bairro: string;
                localidade: string;
                uf: string;
                error?: string
            }>(`/${cep}/json`)
    
            if(result.data.error) throw Error('')

            return {
                cep: result.data.cep.replace(/\D+/, ''),
                city: result.data.localidade,
                street: result.data.logradouro,
                country: 'BRA',
                neighborhood: result.data.bairro,
                state: result.data.uf
            }
        } catch (error) {
            if(error instanceof CustomError) throw error
            
            throw new CustomError('Ops, não foi possível consultar o cep informado')
        }
    }
    
}