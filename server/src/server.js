import { join } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import nconf from 'nconf'

export default () => {
    const app = express()

    const { DB_USER, DB_PASS, DB_HOST } = nconf.get()

    const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/mixme`

    if (!MONGO_URI) {
        throw new Error('You must provide a MongoLab URI')
    }

    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_URI, { useMongoClient: true })
    /* eslint-disable no-console */
    mongoose.connection
        .once('open', () => console.log('Connected to MongoLab instance.'))
        .on('error', error =>
            console.log('Error connecting to MongoLab:', error)
        )
    /* eslint-enable no-console */

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

    return app
}
