const express = require('express')
const router = express.Router()
const Room = require('../controllers/Room')

router.get('/create', Room.createRoom)
router.post('/delete/:roomCode', Room.deleteRoom)

module.exports = router