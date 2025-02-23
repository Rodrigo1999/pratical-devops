import CustomError from "@shared/domain/service/custom-error"

export default class CEP{
    constructor(private readonly cep: string){
        Object.freeze(this)
        this.throwIfInvalid()
    }

    get value(){
        return this.cep.replace(/\D+/, '')
    }

    private throwIfInvalid(){
        const sanitizedCep = this.cep.replace(/\D+/g, '');
        if(!this.cep || sanitizedCep.length !== 8 || !/^[0-9]{8}$/.test(sanitizedCep)) {
            throw new CustomError('CEP inválido', 'invalid_params', 'cep-001')
        }
    }
}