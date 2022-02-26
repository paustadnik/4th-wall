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
        // type: [mongoose.SchemaTypes.title],
        // ref: 'Movie',
        type: String,
        default: []
    }
});

module.exports = mongoose.model('List', listSchema)