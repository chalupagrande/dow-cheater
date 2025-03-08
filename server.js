const express = require('express');
const port = 3000;
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { format } = require('date-fns');

const app = express();
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'));
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

const table = {
  "Monday": [2000],
  "Tuesday": [500, 200, 500],
  "Wednesday": [500, 200, 500, 200, 500],
  "Thursday": [1000],
  "Friday": [1000, 200, 500],
  "Saturday": [1000, 200, 500, 200, 500],
  "Sunday": [1000, 200, 500, 200, 500, 200, 500],
}


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("vibrate", () => {
    console.log("vibrate");
    io.emit("vibrate", [500, 500, 500, 500, 500, 500, 500, 500]);
  })

  socket.on("time", (data) => {
    const dow = format(new Date(data), "EEEE")
    console.log(dow);
    io.emit("vibrate", table[dow]);
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});