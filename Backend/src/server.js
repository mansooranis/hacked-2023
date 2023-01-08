const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const Redis = require("redis");
const cors = require('cors')({origin: true})
const mongoose = require("mongoose");
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const roomsRouter = require('./routes/Room')

const redisClient = Redis.createClient();

const run = async () => {
    await redisClient.connect(); // connect to redis
    await mongoose
        .connect(process.env.MONGO_URI, {
            // connect to mongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
};

run()

var db = mongoose.connection // get the connection
db.on('error', console.error.bind(console, 'connection error:'))

let users = [];

io.on('connection', async (socket) => {
    socket.on("join-server", (username) => {
        const user = {
            id: socket.id,
            username: username,
        };
        users.push(user);
    })

    socket.on("join-room", async(roomCode, cb) => {
        socket.join(roomCode);
        const result = await redisClient.ZRANGE_WITHSCORES(roomCode, 0, -1,  {REV: true});
        cb(result);
    })

    socket.on("new-question", async({roomCode, message}) => {
        redisClient.zAdd(roomCode, {score: 1, value: message})
        const result = await redisClient.ZRANGE_WITHSCORES(roomCode, 0, -1,  {REV: true});
        io.to(roomCode).emit("new-question", result);
    })

    socket.on("upvote-question", async({roomCode, message, upvote}) =>{
        redisClient.zAdd(roomCode, {score: upvote, value: message})
        const result = await redisClient.ZRANGE_WITHSCORES(roomCode, 0, -1,  {REV: true});
        io.to(roomCode).emit("upvote-question", result);
    })

    socket.on("downvote-question", async({roomCode, message, downvote}) =>{
        redisClient.zAdd(roomCode, {score: downvote, value: message})
        const result = await redisClient.ZRANGE_WITHSCORES(roomCode, 0, -1,  {REV: true});
        io.to(roomCode).emit("downvote-question", result);
    })

});

app.use(cors)
app.use(express.json())
app.get('/test_db_conn', (req, res) => {
    // test db connection
    res.json({ status: db.readyState, database: db.name })
})

app.use('/api/rooms', roomsRouter)

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
