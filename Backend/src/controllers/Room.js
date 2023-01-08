const Room = require('../models/Room');
const makeid = require('../services/RoomCode.js')

module.exports = {
    createRoom: async (req, res) => {
        // create a new room
        const roomCode = makeid()
        // const checkRoom = await Room.findOne({roomCode: roomCode})
        // if (checkRoom) {
        //     res.status(400).json({message: "Room already exists"})
        // }
        
        const room = new Room({
            roomCode: roomCode,
        })
        
        try {
            const newRoom = await Room.create(room)
            res.status(201).json(newRoom)
        } catch(err) {
            res.status(400).json({message: err.message})
        }
    },
    deleteRoom: async (req, res) => {
        // delete a room
        const roomCode = req.params.roomCode
        const checkRoom = await Room.findOne({roomCode: roomCode})
        if (!checkRoom) {
            res.status(400).json({message: "Room does not exist"})
        }

        try {
            await Room.deleteOne({roomCode: roomCode})
            res.status(200).json({message: "Room deleted"})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    }
}
