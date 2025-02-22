import { CapturedAddress, PokeScore } from "@pokeapp/domain/vo";
import EntityBase from "./base";
import CustomError from "@shared/domain/service/custom-error";
import { Id } from "@shared/domain/vo";

export default class Pokemon extends EntityBase<Pokemon>{
    static SCORE_INCREMENT_PER_EVOLVE = 10
    static TIME_AWAIT_PER_EVOLVE = 1000 * 60
    private name;
    private score;
    private lastAddressCaptured;
    private last_evolve_at;
    private is_released;

    private lastAddressCapturedShouldBeSave = false

    constructor(private readonly data: Pokeapp.Entity.PokemonDTO){

        super({
            id: data.id,
            created_at: data.created_at || new Date(),
            updated_at: data.updated_at || new Date(),
        })
        this.name = data.name
        this.score = new PokeScore(data.score)
        this.lastAddressCaptured = new CapturedAddress(data.lastAddressCaptured)
        this.last_evolve_at = data.last_evolve_at || null
        this.is_released = data.is_released
        
        if(this.Id.isGenratedId()) {
            this.lastAddressCapturedShouldBeSave = true
        }
    }

    getLevel(){
        return this.score.getLevel()
    }

    getName(){
        return this.name
    }

    getFullLastCapturedAddress(){
        return this.lastAddressCaptured.value
    }

    getScore(){
        return this.score.value
    }

    isReleased = () => this.is_released

    release(){
        if(this.isReleased()) throw new CustomError('Pokemon já foi solto na natureza', 'failed', 'pokemon-004');

        this.is_released = true
        
        return true
    }

    recapture(address: string){
        this.lastAddressCaptured = new CapturedAddress(address)
        this.lastAddressCapturedShouldBeSave = true
        return this
    }

    static create(data: Pokeapp.Entity.PokemonDTOCreate){
        const dateNow = new Date()
        const pokemon = new Pokemon({
            id: Id.generateId(),
            created_at: dateNow,
            updated_at: dateNow,
            name: data.name,
            score: data.score || 0,
            lastAddressCaptured: data.capturedAddress,
            last_evolve_at: null,
            is_released: false
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

        const last_evolve_atTime = this.last_evolve_at?.getTime() || 0
        const canEvolve = (Date.now() - last_evolve_atTime) < Pokemon.TIME_AWAIT_PER_EVOLVE ? false : true

        if(!canEvolve) throw new CustomError('Pokemon ainda está evoluíndo', 'conflict', 'pokemon-001');

        const currentScoreValue = this.score.value
        const newScoreValue = currentScoreValue + Pokemon.SCORE_INCREMENT_PER_EVOLVE
        const newScore = new PokeScore(Math.min(PokeScore.LEVEL_SUPREME_GOD, newScoreValue))
        
        if(this.score.isEqual(newScore)){
            return 'max_envolve_rached'
        }

        this.score = newScore
        this.last_evolve_at = new Date()

        return true
    }
}