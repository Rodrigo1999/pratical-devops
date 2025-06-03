import './config/paths'
import pokeappQuery from '@pokeapp/application/query'
import routes from '@pokeapp/infra/api/routes'
import express from 'express'
const app = express()
const PORT = process.env.PORT || 5000

let LIVE_APP = true;

app.put('/healthz', (req, res) => {
    LIVE_APP = !LIVE_APP

    res.status(200).send({LIVE_APP}) 
})

app.use(express.json())
app.use((req, res, next) => {
    if(LIVE_APP) return next();

    res.status(500).send({
        message: '[HealthCheck][LIVE_APP] is unhealthy'
    })
})

app.get('/', (req, res) => {
    
    res.status(200).send({
        status: 'Ok'
    })
})

app.get('/healthz', async (req, res) => {
    try {
        const services = {
            DB: await pokeappQuery.health.dbIsLive(),
            LIVE_APP
        }

        for(const service in services){
            if(!services[service as keyof typeof services]) {
                LIVE_APP = false
                throw new Error(`[HealthCheck][${service}] is unhealthy`)
            }
        }

        res.status(200).send({
            status: 'Ok'
        }) 
    } catch (error) {
        res.status(500).send({
            name: (error as Error).name,
            message: (error as Error).message
        })
    }
})

routes(app)

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT)
})