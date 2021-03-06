const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: 'User',
    },
    movies: {
        type: [mongoose.SchemaTypes.imdbId],
        ref: 'Movie',

    }
});

module.exports = mongoose.model('List', listSchema)