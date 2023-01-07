const MessagesSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
        upvote: {
            type: Number,
            required: true,
        },
        downvote: {
            type: Number,
            required: true,
        },
        answered: {
            type: Boolean,
            required: true,
            default: false,
        },
        
    },
    { collection: 'Messages', versionKey: false }
)

module.exports = mongoose.model('hacked', MessagesSchema)