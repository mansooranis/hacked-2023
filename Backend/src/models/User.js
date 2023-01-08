const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },

    },
    { collection: 'users', versionKey: false }
)


module.exports = mongoose.model('hacked', UserSchema)