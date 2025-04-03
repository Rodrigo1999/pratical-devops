import CustomError from 'src/shared/domain/service/custom-error'

interface InputDTO{
    poke_id: string
    cep: string
}

interface OutputDTO{
    id: string
    poke_id: string
    name: string
    level: Pokeapp.PokeLevel
    score: number
    full_captured_address: string
    ability: Array<{
        name: string
        slot: number
    }>
}

interface Dependencies{
    geolocationGateway: Pick<Pokeapp.Gateway.Geolocation, 'getFullAddressByCep'>
    pokemonRepository: Pick<Pokeapp.Repository.Pokemon, 'getByPokeId' | 'save'>
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

        const pokemon = await this.deps.pokemonRepository.getByPokeId(input.poke_id);
        
        if(!pokemon) throw new CustomError('Não foi possível recapturar um pokemon que você nunca teve', 'not_found', 'pokemon-005');
        if(!pokemon.isReleased()) throw new CustomError('Você já se encontra com esse pokemon capturado', 'failed', 'pokemon-006');

        const addressInfo = await this.deps.geolocationGateway.getFullAddressByCep(input.cep)
        
        if(!addressInfo) throw new CustomError('Endereço do cep não encontrado', 'not_found', 'poke-003');
        
        pokemon.recapture(addressInfo.full_address)

        await this.deps.pokemonRepository.save(pokemon)

        return {
            id: pokemon.getId(),
            poke_id: pokemon.poke_id,
            name: pokemon.getName(),
            level: pokemon.getLevel(),
            full_captured_address: pokemon.getFullLastCapturedAddress(),
            score: pokemon.getScore(),
            ability: pokemon.ability
        }
    }
}