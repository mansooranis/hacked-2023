const express = require('express');
const app = express();

const Server = require("socket.io")
const cors = require('cors');

app.use(express.json());
app.use(cors())

const {PORT = 4000} = process.env



const server = app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})