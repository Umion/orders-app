require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.get("/", (req, res) => res.send("<h2>Server started</h2>"));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// i show the total number of connections, even those are other users
// in case i show quantity with one user maybe i use socket rooms with user id name

io.on("connection", (socket) => {
  io.emit("user_connection", socket.client.conn.server.clientsCount);

  socket.on("disconnect", (reason) => {
    io.emit("user_connection", socket.client.conn.server.clientsCount);
  });
});

module.exports = server;
