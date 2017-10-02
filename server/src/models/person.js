import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PersonSchema = new Schema({
  name: { type: String },
  user: {
    type: Schema.type.ObjectId,
    ref: 'user'
  }
})

mongoose.model('person', PersonSchema)
