import express from 'express'

const app = express()
const PORT = 5000

app.get('/', (req, res) => {
    
    res.status(200).send({
        status: 'Ok'
    })
})

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT)
})