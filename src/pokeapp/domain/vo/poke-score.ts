import { isBetween } from "@pokeapp/utils"
import CustomError from "@shared/domain/service/custom-error"

export default class PokeScore{

    static LEVEL_DEMIGOD_SCORE = 50
    static LEVEL_GOD = 150
    static LEVEL_SUPREME_GOD = 200

    constructor(private readonly score: number){
        Object.freeze(this)

        if(score < 0) throw new CustomError('Score inválido, não pode ser menor que 0', 'invalid_params', 'score-001')
        if(score > 200) throw new CustomError('Score inválido, não pode ser maior que 200', 'invalid_params', 'score-002')
    }

    get value(){
        return this.score
    }

    getLevel(){
        if(this.score <= PokeScore.LEVEL_DEMIGOD_SCORE){
            return 'demigod'
        }else if(isBetween(PokeScore.LEVEL_DEMIGOD_SCORE, this.score, [PokeScore.LEVEL_GOD])){
            return 'god'
        }else if(isBetween(PokeScore.LEVEL_GOD, this.score, [PokeScore.LEVEL_SUPREME_GOD])){
            return 'supreme_god'
        };

        return 'demigod'
    }

    isEqual(pokeScore: PokeScore){
        return this.value === pokeScore.value
    }
}