// @flow

/* eslint-disable global-require */
/* eslint-disable no-empty */
const defaultConfig = require('./config')

let localConfig = {}

if (process.env.NODE_ENV === 'development') {
    try {
        // eslint-disable-next-line import/no-unresolved
        localConfig = require('./config.local')
    } catch (e) {}
}

module.exports = Object.assign({}, defaultConfig, localConfig)
