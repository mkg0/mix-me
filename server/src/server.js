import { join } from 'path'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

const people = []

app.get('/api/didimatch', (req, res) => {
    res.send({
        names: people.map(({ name }) => name),
        location: 'Lounge',
    })
})

app.post('/api/matchme', bodyParser.json(), (req, res) => {
    people.push(req.body)
    res.status(204).send()
})

// Serve static files from the React app
app.use('/static', express.static(join(__dirname, '/public/static')))

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/public/index.html'))
})

export default app
