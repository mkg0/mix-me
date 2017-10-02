import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GroupSchema = new Schema({
  location: { type: String }
})

mongoose.model('group', GroupSchema)
