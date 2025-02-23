import CustomError from "@shared/domain/service/custom-error"

export default class Address{
    /**
     * Rua, Bairro, Cidade, Estado, País, cep
     * @example
     * const capturedAddress = new CapturedAddress('Rua das flores, centro, SAL ciry, PI, BRA, 64640000')
     */
    constructor(private readonly address: string){
        Object.freeze(this)
        this.throwIfInvalid()
    }

    get value(){
        return this.address.replace(/,\s*/g, ', ').trim()
    }

    getAddressComponents(){
        const [street, neighborhood, city, state, country, cep] = this.value.split(',').map(component => component.trim())

        return {street, neighborhood, city, state, country, cep}
    }

    private throwIfInvalid(){
        const addressSplit = this.value.split(',')

        if(addressSplit.length !== 6) throw new CustomError('Endereço inválido', 'invalid_params', 'captured-address-001');

        const addressComponents = this.getAddressComponents()

        if(addressComponents.state.length !== 2) throw new CustomError('Nome do Estado é inválido', 'invalid_params', 'captured-address-002');
        if(addressComponents.country.length !== 3) throw new CustomError('Nome do País é inválido', 'invalid_params', 'captured-address-003');
    }
}