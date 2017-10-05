import { Router } from 'express'
import bodyParser from 'body-parser'

import { Location } from './models'

import { createGroups, getAllGroups } from './handlers/group'

export default Router()
    .use((req, res, next) => {
        if (req.headers.auth !== 'mix-me') {
            return res.status(401).send()
        }
        return next()
    })
    .get('/makegroups', (req, res) => {
        createGroups()
            .then(() => {
                res.status(204).send()
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    })
    .get('/groups', (req, res) => {
        getAllGroups()
            .then(groups => {
                res.json(groups)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
    })
    .post('/addlocation', bodyParser.json(), (req, res) => {
        new Location(req.body)
            .save()
            .then(l => {
                res.json(l)
            })
            .catch(reason => {
                res.status(400).send(reason)
            })
    })
