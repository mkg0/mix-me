import http from 'http'
import nconf from 'nconf'

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
    .defaults({ HOST: 'localhost' })
    .required(['PORT'])

const server = http.createServer(app)
let currentApp = app
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
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}
