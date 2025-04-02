import type * as Entities from '@pokeapp/domain/entity'
import { Id } from '@shared/domain/vo'

declare global{

    declare namespace Pokeapp.Repository{
        interface Pokemon{
            save(pokemon: Entities.Pokemon): Promise<void>
            getById(pokemonId: Id): Promise<Entities.Pokemon | null>
            getByPokeId(poke_id: string): Promise<Entities.Pokemon | null>
            wasAreadyCapturedByPokeId(poke_id: string): Promise<boolean>
        }
    }
}