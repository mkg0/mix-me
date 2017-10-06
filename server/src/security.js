import enforce from 'express-sslify'
import helmet from 'helmet'

export default app => {
    app.use(helmet())

    // Sets "X-Content-Type-Options: nosniff".
    app.use(helmet.noSniff())

    // Sets "Referrer-Policy: same-origin".
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

    app.use(helmet.frameguard({ action: 'sameorigin' }))

    if (process.env.NODE_ENV !== 'development') {
        app.use(enforce.HTTPS({ trustProtoHeader: true }))
    }
}
