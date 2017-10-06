import { Router } from 'express'
import bodyParser from 'body-parser'

import { getGroupForName } from './handlers/group'
import { createPerson } from './handlers/person'

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
    .post('/matchme', bodyParser.json(), (req, res) => {
        createPerson(req.body)
            .then(() => {
                res.status(204).send()
            })
            .catch(err => {
                console.log('err', err)
                res.status(204).send()
            })
    })
