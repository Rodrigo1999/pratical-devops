import { Id } from '@shared/domain/vo'
import CustomError from 'src/shared/domain/service/custom-error'

interface InputDTO{
    id: string
    cep: string
}

interface OutputDTO{
    id: string
    name: string
    full_captured_address: string
    level: Pokeapp.PokeLevel
}

interface Dependencies{
    geolocationGateway: Pick<Pokeapp.Gateway.Geolocation, 'getFullAddressByCep'>
    pokemonRepository: Pick<Pokeapp.Repository.Pokemon, 'getById' | 'save'>
}

/**
    - Verificarei se esse pokemon existe no banco de dados, mesmo ele já estando excluído, se sim, considerarei uma recaptura.
    - Mudar status do pokemon para ativo novamente
    - Salvar ultimo endereço de recaptura na lista de endereços de captura daquele polemon seguindos os padrões do fluxo de "captura".
*/
export default class UseCasePokemonRecapture{
    constructor(private readonly deps: Dependencies){
        this.execute = this.execute.bind(this)
    }

    async execute(input: InputDTO): Promise<OutputDTO>{

        const pokemonId = new Id(input.id)

        const pokemon = await this.deps.pokemonRepository.getById(pokemonId);
        
        if(!pokemon) throw new CustomError('Não foi possível recapturar um pokemon que você nunca teve', 'not_found', 'pokemon-005');
        if(!pokemon.isReleased()) throw new CustomError('Você já se encontra com esse pokemon capturado', 'failed', 'pokemon-006');

        const addressInfo = await this.deps.geolocationGateway.getFullAddressByCep(input.cep)
        
        if(!addressInfo) throw new CustomError('Endereço do cep não encontrado', 'not_found', 'poke-003');
        
        pokemon.recapture(addressInfo.full_address)

        await this.deps.pokemonRepository.save(pokemon)

        return {
            id: pokemon.getId(),
            name: pokemon.getName(),
            level: pokemon.getLevel(),
            full_captured_address: pokemon.getFullLastCapturedAddress()
        }
    }
}