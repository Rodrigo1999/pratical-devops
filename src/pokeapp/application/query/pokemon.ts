import { PokeScore } from "@pokeapp/domain/vo"
import { Knex } from "knex"

type InputOutput = IInputOutput<Pokeapp.Query.Pokemon>

export default class QueryPokemon implements Pokeapp.Query.Pokemon{

    constructor(private readonly db: Knex){}

    async listAllMyPokemon(): InputOutput['listAllMyPokemon']['output'] {
        
        const lastAddressSubquery = this.db('address')
        .select('full_address')
        .where('address.pokemon_id', this.db.raw('pokemon.id'))
        .orderBy('created_at', 'desc')
        .limit(1);

        const pokemons: (Pokeapp.DbSchema.PokemonTable & {ability_slot: number, ability_name: string, last_address_captured: string})[] = await this.db('pokemon')
        .select(
            'pokemon.*', 
            'ability.name as ability_name', 
            'ability.slot as ability_slot',
            lastAddressSubquery.as('last_address_captured')
        )
        .leftJoin('ability', 'pokemon.id', 'ability.pokemon_id')
        .where('pokemon.is_released', false)

        const pokemonsMaper = new Map<string, Awaited<InputOutput['listAllMyPokemon']['output']>[number]>()

        for(const pokemon of pokemons){
            let pokemonMaper = pokemonsMaper.get(pokemon.id)

            if(!pokemonMaper) {
                pokemonsMaper.set(pokemon.id, pokemonMaper = {
                    id: String(pokemon.id),
                    ability: [],
                    last_address_captured: pokemon.last_address_captured,
                    level: PokeScore.scoreToLevel(pokemon.score),
                    name: pokemon.name,
                    poke_id: pokemon.poke_id,
                    score: pokemon.score
                })
            }
            
            pokemonMaper.ability.push({
                name: pokemon.ability_name,
                slot: pokemon.ability_slot
            })
        }

        return [...pokemonsMaper.values()]
    }
}