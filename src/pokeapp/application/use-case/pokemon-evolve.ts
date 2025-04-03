import { Id } from '@shared/domain/vo'
import CustomError from 'src/shared/domain/service/custom-error'

interface InputDTO{
    id: string
}

interface OutputDTO{
    id: string
    score: number
    level: Pokeapp.PokeLevel
}

interface Dependencies{
    pokemonRepository: Pick<Pokeapp.Repository.Pokemon, 'getById' | 'save'>
}

/**
    Responsável por evoluir um pokemon
*/
export default class UseCasePokemonEvolve{
    constructor(private readonly deps: Dependencies){
        this.execute = this.execute.bind(this)
    }

    async execute(input: InputDTO): Promise<OutputDTO>{

        const pokemonId = new Id(input.id)

        const pokemon = await this.deps.pokemonRepository.getById(pokemonId);

        if(!pokemon) throw new CustomError('Pokemon não encontrado', 'not_found', 'pokemon-002');
        if(pokemon.isReleased()) throw new CustomError('Lamento, você abandonou este pokemon', 'not_found', 'pokemon-004');

        const resultPokemonEvolve = pokemon.evolve()

        if(resultPokemonEvolve === 'max_envolve_rached') {
            throw new CustomError('Pokemon já atingiu o limite máximo de evolução', 'failed', 'pokemon-003');
        }

        await this.deps.pokemonRepository.save(pokemon)

        return {
            id: pokemon.getId(),
            score: pokemon.getScore(),
            level: pokemon.getLevel()
        }
    }
}