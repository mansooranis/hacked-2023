const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        upvote: {
            type: Number,
            required: true,
            default: 1,
        },
        downvote: {
            type: Number,
            required: true,
            default: 0,
        },
        answered: {
            type: Boolean,
            required: true,
            default: false,
        },
        
    },
    { collection: 'messages', versionKey: false }
)

module.exports = mongoose.model('hacked', MessagesSchema)