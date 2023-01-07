const RoomSchema = new mongoose.Schema(
    {
        RoomCode: {
            type: String,
            required: true,
            length: 5,
        },
    },
    { collection: 'rooms', versionKey: false }
)

module.exports = mongoose.model('hacked', RoomSchema)