import mongoose from 'mongoose'
import nconf from 'nconf'

export default () => {
    const { DB_USER, DB_PASS, DB_HOST } = nconf.get()
    const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/mixme`

    if (!MONGO_URI) {
        throw new Error('You must provide a MongoLab URI')
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
