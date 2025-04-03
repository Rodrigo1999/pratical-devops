import {Express} from 'express'
import pokeappController from '../controller'

export default function routes(app: Express){

    app.get('/pokemons', pokeappController.getAllCapturedPokemon.http)
    app.post('/pokemons/capture', pokeappController.capturePokemon.http)
    app.post('/pokemons/recapture', pokeappController.recapturePokemon.http)
    app.put('/pokemons/evolve/:id', pokeappController.evolvePokemon.http)
    app.delete('/pokemons/release/:id', pokeappController.releasePokemon.http)
}