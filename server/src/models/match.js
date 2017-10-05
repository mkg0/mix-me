import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MatchSchema = new Schema({
    date: { type: Date, default: Date.now },
    location: { type: String },
})

mongoose.model('match', MatchSchema)
