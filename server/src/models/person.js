import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: { type: String, unique: true },
    active: { type: Boolean },
})

export default mongoose.model('person', PersonSchema)
