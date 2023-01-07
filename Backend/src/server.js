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

// app.get("/", async (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// Testing Code
// io.on("connection", async (socket) => {
//     await redisClient.connect();
//     socket.on("chat message", async(msg) => {
//         redisClient.zAdd("chat", {score: 3, value: msg});
//         io.emit("chat message", msg);
//         const result = await redisClient.ZRANGE_WITHSCORES("chat", 0, -1,  {REV: true});
//         console.log(result);
//     });
// });

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
