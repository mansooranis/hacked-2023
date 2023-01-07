const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const Redis = require("redis");

const redisClient = Redis.createClient();

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Testing Code
io.on("connection", async (socket) => {
    await redisClient.connect();
    socket.on("chat message", async(msg) => {
        redisClient.zAdd("chat", {score: 3, value: msg});
        io.emit("chat message", msg);
        const result = await redisClient.ZRANGE_WITHSCORES("chat", 0, -1,  {REV: true});
        console.log(result);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});