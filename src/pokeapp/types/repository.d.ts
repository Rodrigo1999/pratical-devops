import type * as Entities from '@pokeapp/domain/entity'

declare global{

    declare namespace Pokeapp.Repository{
        interface Pokemon{
            save(pokemon: Entities.Pokemon): Promise<void>
            wasAreadyCaptured(id: Id): Promise<boolean>
        }
    }
}