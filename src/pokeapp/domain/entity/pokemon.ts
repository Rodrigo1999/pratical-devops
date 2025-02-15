import { PokeScore } from "@pokeapp/domain/vo";
import EntityBase from "./base";
import CustomError from "@shared/domain/service/custom-error";

export default class Pokemon extends EntityBase<Pokemon>{
    static SCORE_INCREMENT_PER_EVOLVE = 10
    static TIME_AWAIT_PER_EVOLVE = 1000 * 60
    private name;
    private score;
    private lastAddressCaptured;
    private lastEvolve = 0;

    constructor(private readonly data: Pokeapp.Entity.PokemonDTO){

        super({
            id: data.id || null,
            created_at: data.created_at || new Date(),
            updated_at: data.updated_at || new Date(),
        })
        this.name = data.name
        this.score = new PokeScore(data.score)
        this.lastAddressCaptured = data.lastAddressCaptured
    }

    getLevel(){
        return this.score.getLevel()
    }

    getName(){
        return this.name
    }

    getLastCapturedAddress(){
        return ''
    }

    static create(data: Pokeapp.Entity.PokemonDTOCreate){
        const dateNow = new Date()
        const pokemon = new Pokemon({
            id: null,
            created_at: dateNow,
            updated_at: dateNow,
            name: data.name,
            score: data.score || 0,
            lastAddressCaptured: null
        })

        pokemon.normalizeScoreByPokemonName()

        return pokemon
    }

    private normalizeScoreByPokemonName(){
        if(this.score.value > 0) return;

        if(this.name.toLowerCase().startsWith('g')){
            this.score = new PokeScore(PokeScore.LEVEL_GOD)
        }else if(this.name.toLowerCase().startsWith('p')){
            this.score = new PokeScore(PokeScore.LEVEL_SUPREME_GOD)
        }
    }

    evolve(){

        const canEvolve = (Date.now() - this.lastEvolve) < Pokemon.TIME_AWAIT_PER_EVOLVE ? false : true

        if(!canEvolve) throw new CustomError('Pokemon ainda está evoluíndo', 'conflict', 'pokemon-001');

        const currentScoreValue = this.score.value
        const newScoreValue = currentScoreValue + Pokemon.SCORE_INCREMENT_PER_EVOLVE
        const newScore = new PokeScore(Math.min(PokeScore.LEVEL_SUPREME_GOD, newScoreValue))
        
        if(this.score.isEqual(newScore)){
            return 'max_envolve_rached'
        }

        this.score = newScore
        this.lastEvolve = Date.now()

        return true
    }
}