import { Pokemon } from "@pokeapp/domain/entity";
import type { Id } from "@shared/domain/vo";
import type { Knex } from "knex";
import outputMapperDatabase from "@pokeapp/infra/db/output-mapper";
import inputMapperDatabase from "@pokeapp/infra/db/input-mapper";

type InputOutput = IInputOutput<Pokeapp.Repository.Pokemon>

export default class PokemonRepository implements Pokeapp.Repository.Pokemon{

    constructor(private readonly db: Knex){}

    async save(pokemon: Pokemon): InputOutput['save']['output'] {
        
        const isAnewPokemon = pokemon.Id.isGenratedId();

        const pokemonInput = inputMapperDatabase.pokemon(pokemon)

        //@ts-expect-error
        delete pokemonInput.id;

        if(isAnewPokemon){

            const [id] = await this.db('pokemon').insert(pokemonInput)
            pokemon.setId(id.toString())
            
            await this.db('ability').insert(pokemon.ability.map(ability => {
                const abilityInsert = inputMapperDatabase.ability(pokemon, ability)
                //@ts-expect-error
                delete abilityInsert.id
                return abilityInsert
            }))
           
        }else{

            await this.db('pokemon').update(pokemonInput)
        }

        if(pokemon['lastAddressCapturedShouldBeSave']){

            const addressInput = inputMapperDatabase.address(pokemon, pokemon['lastAddressCaptured'])
            //@ts-expect-error
            delete addressInput.id;
            await this.db('address').insert(addressInput)
        }
    }

    async getById(pokemonId: Id): InputOutput['getById']['output'] {

        const [pokemon, abilities, lastAddress] = await Promise.all([
            this.db('pokemon').where('id', pokemonId.value).first(),
            this.db('ability').where('pokemon_id', pokemonId.value),
            this.db('address').where('pokemon_id', pokemonId.value).orderBy('created_at', 'desc').first(),
        ])

        if(!pokemon) return null;

        return outputMapperDatabase.pokemon(
            pokemon, 
            lastAddress?.full_address || '', 
            abilities
        );
    }

    async getByPokeId(poke_id: string): InputOutput['getByPokeId']['output'] {

        const pokemon = await this.db('pokemon').where('poke_id', poke_id).first()

        if(!pokemon) return null;

        const [abilities, lastAddress] = await Promise.all([
            this.db('ability').where('pokemon_id', pokemon.id),
            this.db('address').where('pokemon_id', pokemon.id).orderBy('created_at', 'desc').first(),
        ])

        return outputMapperDatabase.pokemon(
            pokemon, 
            lastAddress?.full_address || '', 
            abilities
        );
    }

    async wasAreadyCapturedByPokeId(poke_id: string): InputOutput['wasAreadyCapturedByPokeId']['output'] {
        const pokemon = await this.db('pokemon').select('id').where('poke_id', poke_id).first()

        return !!pokemon
    }
}