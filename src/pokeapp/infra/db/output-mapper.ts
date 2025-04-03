import { Pokemon } from '@pokeapp/domain/entity';

class OutputMapperDatabase{

    pokemon(
        pokemon: Pokeapp.DbSchema.PokemonTable, 
        lastAddressCaptured: string,
        abilities: Pokeapp.DbSchema.AbilityTable[]
    ){
        return new Pokemon({
            id: pokemon.id,
            name: pokemon.name,
            score: pokemon.score,
            is_released: pokemon.is_released,
            poke_id: pokemon.poke_id,
            last_evolve_at: pokemon.last_evolve_at ? new Date(pokemon.last_evolve_at) : null,
            created_at: new Date(pokemon.created_at),
            updated_at: new Date(pokemon.updated_at),
            lastAddressCaptured: lastAddressCaptured,
            ability: abilities.map(ability => this.ability(ability))
        });
    }

    ability(ability: Pokeapp.DbSchema.AbilityTable): Pokemon['ability'][number]{
        return {
            name: ability.name,
            slot: ability.slot
        }
    }
}

const outputMapperDatabase = new OutputMapperDatabase()

export default outputMapperDatabase