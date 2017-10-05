import mongoose from 'mongoose'
import nconf from 'nconf'

export default () => {
    const { DB_USER, DB_PASS, DB_HOST } = nconf.get()

    let MONGO_URI

    if (!DB_USER || !DB_PASS) {
        MONGO_URI = `mongodb://${DB_HOST}/mixme`
    } else {
        MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/mixme`
    }

    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_URI, { useMongoClient: true })
    /* eslint-disable no-console */
    mongoose.connection
        .once('open', () => console.log('Connected to MongoLab instance.'))
        .on('error', error =>
            console.log('Error connecting to MongoLab:', error)
        )
    /* eslint-enable no-console */
}
