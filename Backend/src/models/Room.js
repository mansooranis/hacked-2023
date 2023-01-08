const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema(
    {
        roomCode: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 5,
        },
    },
    { collection: 'rooms', versionKey: false }
)


module.exports = mongoose.model('hacked', RoomSchema)