import http from 'http'
import nconf from 'nconf'
import config from './config'

import app from './server'

nconf
    .use('memory')
    .env({
        HOST: {
            describe: 'app host',
            type: 'string',
        },
        PORT: {
            alias: 'p',
            describe: 'app port',
            type: 'number',
        },
    })
    .defaults(config)
    .required(['PORT', 'DB_HOST', 'DB_USER', 'DB_PASS'])

let currentApp = app()
const server = http.createServer(currentApp)
server.listen(nconf.get('PORT'), nconf.get('HOST'), err => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    } else {
        // eslint-disable-next-line no-console
        console.log(
            'Started server on',
            `${nconf.get('HOST')}:${nconf.get('PORT')}`
        )
    }
})

if (module.hot) {
    module.hot.accept('./server', () => {
        const newApp = app()
        server.removeListener('request', currentApp)
        server.on('request', newApp)
        currentApp = newApp
    })
}
