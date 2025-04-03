import type {Request, Response} from 'express'

export default class ControllerGetAllCapturedPokemon{

    constructor(private readonly pokemonQuery: Pick<Pokeapp.Query.Pokemon, 'listAllMyPokemon'>){
        this.http = this.http.bind(this)
    }

    async http(req: Request, res: Response): Promise<any>{

        try {
            const allPokemons = await this.pokemonQuery.listAllMyPokemon()

            res.status(200).send(allPokemons)

        } catch (error) {
            
            res.status(500).send({
                message: (error as Error).message,
                error: (error as Error).name
            })
        }
    }
}