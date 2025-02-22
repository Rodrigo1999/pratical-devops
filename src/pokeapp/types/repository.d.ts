import type * as Entities from '@pokeapp/domain/entity'
import { Id } from '@shared/domain/vo'

declare global{

    declare namespace Pokeapp.Repository{
        interface Pokemon{
            save(pokemon: Entities.Pokemon): Promise<void>
            getById(pokemonId: Id): Promise<Entities.Pokemon | null>
            wasAreadyCaptured(id: Id): Promise<boolean>
        }
    }
}