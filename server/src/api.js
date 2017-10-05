import { Router } from 'express'
import bodyParser from 'body-parser'

import { Person } from './models'

import { getGroupForName } from './handlers/group'

export default Router()
    .get('/match', (req, res) => {
        const { name } = req.query
        getGroupForName(name)
            .then(group => {
                res.json(group)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    })
    .post('/matchme', bodyParser.json({ type: '*/*' }), (req, res) => {
        new Person(req.body)
            .save()
            .then(({ name }) => {
                console.log('created', name)
                res.status(204).send()
            })
            .catch(err => {
                console.log('err', err)
                res.status(204).send()
            })
    })
