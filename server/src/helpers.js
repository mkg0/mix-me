import { Router } from 'express'
import bodyParser from 'body-parser'

import { Location } from './models'

import { createGroups, getAllGroups } from './handlers/group'
import { activatePeople } from './handlers/person'

export default Router()
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
    .post('/activatepeople', async (req, res) => {
        await activatePeople()
        res.status(204).send()
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
