import type { Pokemon } from "@pokeapp/domain/entity";
import type { Id } from "@shared/domain/vo";

type InputOutput = IInputOutput<Pokeapp.Repository.Pokemon>

export default class PokemonRepository implements Pokeapp.Repository.Pokemon{

    save(pokemon: Pokemon): InputOutput['save']['output'] {
        throw new Error("Method not implemented.");
    }

    getById(pokemonId: Id): InputOutput['getById']['output'] {
        throw new Error("Method not implemented.");
    }

    wasAreadyCaptured(id: Id): InputOutput['wasAreadyCaptured']['output'] {
        throw new Error("Method not implemented.");
    }

}