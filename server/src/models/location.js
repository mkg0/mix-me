import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LocationSchema = new Schema({
    name: { type: String, unique: true },
})

export default mongoose.model('location', LocationSchema)
