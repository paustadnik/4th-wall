const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: [String],
    },
    studio: {
        type: [String],
    },
    director: {
        type: String,
    },
    screenplay: {
        type: [String],
    },
    cast: {
        type: [String],
    },
    synopsis: String,
    reviewId: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Review',
    },
});

module.exports = mongoose.model('Movie', movieSchema)