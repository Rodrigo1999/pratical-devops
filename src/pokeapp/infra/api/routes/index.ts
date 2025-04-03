import {Express} from 'express'
import pokeappController from '../controller'


export default function routes(app: Express){

    app.get('/pokemons', pokeappController.getAllCapturedPokemon.http)
}