
import { Pokemon } from '@pokeapp/domain/entity'
import CustomError from '@shared/domain/service/custom-error'

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
    pokedexGateway: Pick<Pokeapp.Gateway.Pokedex, 'getPokemonById'>
    geolocationGateway: Pick<Pokeapp.Gateway.Geolocation, 'getFullAddressByCep'>
    pokemonRepository: Pick<Pokeapp.Repository.Pokemon, 'save' | 'wasAreadyCapturedByPokeId'>
}

/**
    - Verificar se já tenho o pokemon capturado.
    - Chamarei o serviço do pokedex para buscar o dados do pokemon que capturei.
    - Buscarei os dados de endereço com base em meu cep.
    - Salvarei no banco de dados o pokemon, registrando assim que capturei.

    Obs.: Ao capturar um pokemon, se o pokemon começar com a letra E, ele automaticamente será nível deus, 
    se começar com a letra R, será considerado nível deus supremo.
*/
export default class UseCasePokemonCapture{
    constructor(private readonly deps: Dependencies){
        this.execute = this.execute.bind(this)
    }

    async execute(input: InputDTO): Promise<OutputDTO>{

        const wasAreadyCaptured = await this.deps.pokemonRepository.wasAreadyCapturedByPokeId(input.poke_id);

        if(wasAreadyCaptured) throw new CustomError('Pokemon já foi capturado uma vez', 'conflict', 'poke-001');

        const pokemonInfo = await this.deps.pokedexGateway.getPokemonById(input.poke_id);
        
        if(!pokemonInfo) throw new CustomError('Pokemon não encontrado', 'not_found', 'poke-002');

        const addressInfo = await this.deps.geolocationGateway.getFullAddressByCep(input.cep)

        if(!addressInfo) throw new CustomError('Endereço do cep não encontrado', 'not_found', 'poke-003');

        const pokemon = Pokemon.create({
            name: pokemonInfo.name,
            capturedAddress: addressInfo.full_address,
            poke_id: pokemonInfo.id,
            ability: pokemonInfo.ability
        })

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