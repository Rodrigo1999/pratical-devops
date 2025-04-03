import type {Request, Response} from 'express'
import type {PokeAppUseCase} from '@pokeapp/application/use-case'

export default class ControllerEvolvePokemon{

    constructor(private readonly useCase: PokeAppUseCase['envolve']){
        this.http = this.http.bind(this)
    }

    async http(req: Request<{id: string}>, res: Response): Promise<any>{

        try {
            const pokemonSaved = await this.useCase.execute({
                id: req.params.id
            })

            res.status(200).send(pokemonSaved)

        } catch (error) {
            
            res.status(500).send({
                message: (error as Error).message,
                error: (error as Error).name
            })
        }
    }
}