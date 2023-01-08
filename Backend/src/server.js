const express = require('express');
const app = express();

const Server = require("socket.io")
const cors = require('cors');
var messages = [];
app.use(express.json());
app.use(cors())

const {PORT = 8080} = process.env

const server = app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('new-question', (data, callback) => {
        messages.push(data);
        console.log(messages,"from adding");
        callback({data: messages.filter((message) => message.roomCode === data.roomCode)})
    })
    socket.on("all-messages", (roomid, callback) => {
        console.log(messages);
        callback({
            data: messages.filter((message) => message.roomCode === roomid)
        })
        // socket.emit("all-messages", messages.filter((message) => message.roomCode === roomid));
    })
});