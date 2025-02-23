import CustomError from '@shared/domain/service/custom-error'
import axios from 'axios'

type InputOutput = IInputOutput<Geolocation.HttpApi>

export default class HttpApi implements Geolocation.HttpApi{

    api
    constructor(private readonly config: Geolocation.HttpApiCreate){
        this.api = axios.create({
            baseURL: config.baseURL
        })
    }

    async get<T>(url: string, configs?: InputOutput['get']['input'][1]): Promise<{
        data: T,
        status: number
    }> {
        try {
            const result = await this.api.get<T>(url, {
                params: configs?.queryParams
            })

            return {
                data: result.data,
                status: result.status
            }
        } catch (error) {

            const errorData = (error as any)?.response?.data
            
            throw new CustomError(errorData || 'Ops. um erro inesperado ocorreu ao tentar se comunicar com o serviço '+this.config.serviceName, 'failed')
        }        
    }

}