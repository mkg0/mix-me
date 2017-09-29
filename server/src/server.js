import { join } from 'path'
import express from 'express'

const app = express()

app.get('/api', (req, res) => {
    res.send({
        message: 'I am a server route and can also be hot reloaded!',
    })
})

app.get(express.static(join(__dirname, 'public')))

export default app
