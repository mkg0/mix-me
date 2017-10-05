import { join } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import nconf from 'nconf'

import { Person, Location, Group } from './models'

import mixRandom from './mixRandom'

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

    app.post('/api/addlocation', bodyParser.json(), (req, res) => {
        const location = new Location(req.body)
        location
            .save()
            .then(l => {
                res.json(l)
            })
            .catch(reason => {
                res.status(400).send(reason)
            })
    })

    app.get('/api/didimatch', (req, res) => {
        res.json({
            names: [],
            location: 'Lounge',
        })
    })

    app.get('/api/makegroups', (req, res) => {
        Person.find()
            .exec()
            .then(people =>
                Location.find()
                    .exec()
                    .then(locations =>
                        Promise.all(
                            mixRandom(people, locations).map(group =>
                                new Group(group).save()
                            )
                        ).then(() => {
                            res.status(204).send()
                        })
                    )
            )
            .catch(reason => {
                console.log(reason)
                res.status(400).send(reason)
            })
    })

    app.get('/api/match', (req, res) => {
        const { name } = req.query
        Group.find()
            .populate({
                path: 'names',
                select: 'name',
            })
            .populate('location', 'name')
            .exec()
            .then(groups => {
                res.json(
                    groups
                        .map(({ location, names }) => ({
                            location: location.name,
                            names: names.map(({ name: n }) => n),
                        }))
                        .find(({ names }) => names.includes(name)) || {}
                )
            })
            .catch(reason => {
                console.log(reason)
                res.status(400).send(reason)
            })
    })

    app.get('/api/groups', (req, res) => {
        Group.find()
            .populate('names', 'name')
            .populate('location', 'name')
            .exec()
            .then(groups => {
                res.json(
                    groups.map(({ location, names }) => ({
                        location: location.name,
                        names: names.map(({ name: n }) => n),
                    }))
                )
            })
            .catch(reason => {
                console.log(reason)
                res.status(400).send(reason)
            })
    })

    app.post('/api/matchme', bodyParser.json(), (req, res) => {
        const person = new Person(req.body)
        person
            .save()
            .then(() => {
                res.status(204).send()
            })
            .catch(err => {
                console.log('err', err)
                res.status(204).send()
            })
    })

    // Serve static files from the React app
    app.use('/static', express.static(join(__dirname, '/public/static')))

    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '/public/index.html'))
    })

    return app
}
