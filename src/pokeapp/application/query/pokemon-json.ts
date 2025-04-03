import { PokeScore } from '@pokeapp/domain/vo';
import dayjs from 'dayjs';

type InputOutput = IInputOutput<Pokeapp.Query.Pokemon>

class QueryPokemonUtils{
    // Obtem o endereço mais recente de um pokemon
    getLastAddressByPokemon(pokemon_id: string, addressList: Pokeapp.DbSchema.AddressTable[]){
        
        let currentAddress: Pokeapp.DbSchema.AddressTable | undefined;
        for(const address of addressList){

            if(address.pokemon_id !== pokemon_id) continue;

            if(currentAddress && dayjs(currentAddress.created_at).isAfter(address.created_at)) continue;

            currentAddress = address
        }

        return currentAddress?.full_address
    }

    getAllAbilityByPokemonId(pokemon_id: string, abilityList: Pokeapp.DbSchema.AbilityTable[]){
        
        const allAbility = abilityList.filter(ability => ability.pokemon_id === pokemon_id)

        return allAbility
    }
}

export default class QueryPokemonJson implements Pokeapp.Query.Pokemon{

    private queryPokemonUtils = new QueryPokemonUtils()

    constructor(private readonly db: Pokeapp.DbJsonPersist){}
    
    async listAllMyPokemon(): InputOutput['listAllMyPokemon']['output'] {
        
        const dbJson = await this.db.get()

        return dbJson.pokemon
        .filter(pokemon => pokemon.is_released === false)
        .map(pokemon => ({
            id: String(pokemon.id),
            name: pokemon.name,
            level: PokeScore.scoreToLevel(pokemon.score),
            poke_id: pokemon.poke_id,
            score: pokemon.score,
            last_address_captured: this.queryPokemonUtils.getLastAddressByPokemon(pokemon.id, dbJson.address) || '',
            ability: this.queryPokemonUtils.getAllAbilityByPokemonId(pokemon.id, dbJson.ability).map(ability => ({
                name: ability.name,
                slot: ability.slot
            }))
        }))
    }
}