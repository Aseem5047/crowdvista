const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    link: String,
    photos: [String],
    description: String,
    features: [String],
    extraInfo: String,
    createdAt: Date,
    requiredFunds: Number,
    recievedFunds: [Number],
    fundedBy: [String],
    likes: [],
    likedBy: [],
    comments: {
        type: [String],
        timestamps: true,
        default: [],
    },

},
    {
        timestamps: true,
    }
)

const PlaceModel = mongoose.model('Project', ProjectSchema)

module.exports = PlaceModel;
