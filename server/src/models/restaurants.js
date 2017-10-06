import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RestaurantsSchema = new Schema({
  name: { type: String, unique: true },
  address: { type: String },
  distance: { type: Number }
})

export default mongoose.model('restaurants', RestaurantsSchema)