import type * as Entities from '@pokeapp/domain/entity'
import type { CapturedAddress } from '@pokeapp/domain/vo';
import PokemonRepositoryMock from '../repository/repository-pokemon-mock';

class InputMapperDatabase{

    pokemon(pokemon: Entities.Pokemon): Pokeapp.DbSchema.PokemonTable{
        
        return {
            id: pokemon.getId(),
            name: pokemon.getName(),
            score: pokemon.getScore(),
            poke_id: pokemon.poke_id,
            last_evolve_at: pokemon.last_evolve_at,
            is_released: pokemon.isReleased(),
            created_at: pokemon.created_at,
            updated_at: pokemon.updated_at
        }
    }

    ability(
        pokemon: Entities.Pokemon, 
        ability: Entities.Pokemon['ability'][number]
    ): Pokeapp.DbSchema.AbilityTable{
        
        return {
            id: PokemonRepositoryMock.generateId(),
            name: ability.name,
            slot: ability.slot,
            pokemon_id: pokemon.getId(),
            created_at: pokemon.created_at,
            updated_at: pokemon.updated_at
        }
    }

    address(
        pokemon: Entities.Pokemon, 
        address: CapturedAddress
    ): Pokeapp.DbSchema.AddressTable{
        return {
            id: PokemonRepositoryMock.generateId(),
            full_address: address.getCompressedFullAddress(),
            pokemon_id: pokemon.getId(),
            created_at: new Date(),
            updated_at: new Date()
        }
    }
}

const inputMapperDatabase = new InputMapperDatabase()

export default inputMapperDatabase