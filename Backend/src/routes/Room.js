const express = require('express')
const router = express.Router()
const Room = require('../controllers/Room')

router.get('/create', Room.createRoom)

module.exports = router