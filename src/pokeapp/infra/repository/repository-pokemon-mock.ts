import type { Pokemon } from "@pokeapp/domain/entity";
import CustomError from "@shared/domain/service/custom-error";
import { Id } from "@shared/domain/vo";
import dayjs from "dayjs";
import inputMapperDatabase from "../db/input-mapper";
import outputMapperDatabase from "../db/output-mapper";

type InputOutput = IInputOutput<Pokeapp.Repository.Pokemon>

class RepositoryPokemonUtils{
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

export default class PokemonRepositoryMock implements Pokeapp.Repository.Pokemon{

    private queryPokemonUtils = new RepositoryPokemonUtils()

    constructor(private readonly db: Pokeapp.DbJsonPersist){}
    
    static generateId(){
        return Math.random().toString(32).substring(2)
    }

    async save(pokemon: Pokemon): InputOutput['save']['output'] {

        const dbJson = await this.db.get();
        
        const isAnewPokemon = pokemon.Id.isGenratedId();

        if(isAnewPokemon){

            const id = PokemonRepositoryMock.generateId();

            pokemon.setId(id)
            // ----cria um novo pokemon no banco
            const newPokemon = inputMapperDatabase.pokemon(pokemon)
            dbJson.pokemon.push(newPokemon)

            for(const ability of pokemon.ability){
                const newAbility = inputMapperDatabase.ability(pokemon, ability);
                dbJson.ability.push(newAbility)
            }
        }else{
            // ----atualiza um pokemon já existente no banco
            const currentPokemonTable = dbJson.pokemon.map(pokemonFromDb => {
                if(!pokemon.Id.compare(pokemonFromDb.id)) return pokemonFromDb;

                return inputMapperDatabase.pokemon(pokemon)
            })

            dbJson.pokemon = currentPokemonTable
        }

        if(pokemon['lastAddressCapturedShouldBeSave']){
            const newAddress = inputMapperDatabase.address(pokemon, pokemon['lastAddressCaptured'])
            dbJson.address.push(newAddress)
        }

        await this.db.write(dbJson)
    }

    async getById(pokemonId: Id): InputOutput['getById']['output'] {

        const dbJson = await this.db.get();

        const pokemon = dbJson.pokemon.find(pokemon => pokemonId.compare(pokemon.id));

        if(!pokemon) return null;

        const lastFullAdressNameCaptured = this.queryPokemonUtils.getLastAddressByPokemon(pokemonId.value, dbJson.address)

        if(!lastFullAdressNameCaptured) throw new CustomError('Pokemon sem endereço não pode meu parceiro', 'implementation_failure');

        const allAbility = this.queryPokemonUtils.getAllAbilityByPokemonId(pokemonId.value, dbJson.ability);

        return outputMapperDatabase.pokemon(
            pokemon, 
            lastFullAdressNameCaptured, 
            allAbility
        );   
    }

    async getByPokeId(poke_id: string): InputOutput['getByPokeId']['output'] {

        const dbJson = await this.db.get();

        const pokemon = dbJson.pokemon.find(pokemon => pokemon.poke_id === poke_id);

        if(!pokemon) return null;

        const lastFullAdressNameCaptured = this.queryPokemonUtils.getLastAddressByPokemon(pokemon.id, dbJson.address)

        if(!lastFullAdressNameCaptured) throw new CustomError('Pokemon sem endereço não pode meu parceiro', 'implementation_failure');

        const allAbility = this.queryPokemonUtils.getAllAbilityByPokemonId(pokemon.id, dbJson.ability);

        return outputMapperDatabase.pokemon(
            pokemon, 
            lastFullAdressNameCaptured, 
            allAbility
        );   
    }

    async wasAreadyCapturedByPokeId(poke_id: string): InputOutput['wasAreadyCapturedByPokeId']['output'] {

        const dbJson = await this.db.get();

        const pokemon = dbJson.pokemon.find(pokemon => pokemon.poke_id === poke_id)

        return !!pokemon
    }
}