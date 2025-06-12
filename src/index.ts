import './config/paths'
import routes from '@pokeapp/infra/api/routes'
import express from 'express'
import resourceControl, { LIVE_APP } from './resources-control'
const app = express()
const PORT = process.env.PORT || 5000

resourceControl(app)
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

routes(app)

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT)
})