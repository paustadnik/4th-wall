const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    }, 
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lists : {
        type: [mongoose.SchemaTypes.name],
        default: [],
        ref: 'List',
    }
});

module.exports = mongoose.model('User', userSchema)