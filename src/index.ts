import routes from '@pokeapp/infra/api/routes'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
    
    res.status(200).send({
        status: 'Ok'
    })
})

routes(app)

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT)
})