const RoomSchema = new mongoose.Schema(
    {
        RoomCode: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 5,
        },
    },
    { collection: 'rooms', versionKey: false }
)

module.exports = mongoose.model('hacked', RoomSchema)