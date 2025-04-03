import type {Request, Response} from 'express'
import type {PokeAppUseCase} from '@pokeapp/application/use-case'

export default class ControllerCapturePokemon{

    constructor(private readonly useCase: PokeAppUseCase['capture']){
        this.http = this.http.bind(this)
    }

    async http(req: Request<any, any, {poke_id: string, cep: string}>, res: Response): Promise<any>{

        const body = req.body;

        try {
            const pokemonSaved = await this.useCase.execute({
                poke_id: body.poke_id,
                cep: body.cep
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