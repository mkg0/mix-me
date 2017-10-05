import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GroupSchema = new Schema({
    names: [
        {
            type: Schema.Types.ObjectId,
            ref: 'person',
        },
    ],
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location',
    },
})

export default mongoose.model('group', GroupSchema)
