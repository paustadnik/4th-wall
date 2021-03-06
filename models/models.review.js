const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    // rating: {
    //     type: Number,
    //     required: true,
    // },
    review: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        ref: 'User',
    }, 
    dateCreated: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    movieId: {
        type: String,
        /* type: [mongoose.SchemaTypes.imdbId], */
        required: true,
        ref: 'Movie',
    },
    upvote: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'User',
    },
    downvote: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: 'User',
    },
});

module.exports = mongoose.model('Review', reviewSchema)