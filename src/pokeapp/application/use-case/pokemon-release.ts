import { Id } from '@shared/domain/vo'
import CustomError from 'src/shared/domain/service/custom-error'

interface InputDTO{
    id: string
}

interface Dependencies{
    pokemonRepository: Pick<Pokeapp.Repository.Pokemon, 'getById' | 'save'>
}

/**
    Responsável por liberar um pokemon na natureza.
*/
export default class UseCasePokemonRelease{
    constructor(private readonly deps: Dependencies){
        this.execute = this.execute.bind(this)
    }

    async execute(input: InputDTO): Promise<boolean>{

        const pokemonId = new Id(input.id)

        const pokemon = await this.deps.pokemonRepository.getById(pokemonId);

        if(!pokemon) throw new CustomError('Pokemon não encontrado', 'not_found', 'pokemon-002');

        pokemon.release()

        await this.deps.pokemonRepository.save(pokemon)

        return true
    }
}