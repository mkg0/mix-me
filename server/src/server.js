import { join } from 'path'
import express from 'express'

import configMongo from './configMongoDB'

import helperRoutes from './helpers'
import apiRoutes from './api'

export default () => {
    configMongo()

    const app = express()

    app.use('/api', apiRoutes)

    app.use('/helpers', helperRoutes)

    // Serve static files from the React app
    app.use('/static', express.static(join(__dirname, '/public/static')))

    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '/public/index.html'))
    })

    return app
}
