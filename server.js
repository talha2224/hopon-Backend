const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/connection");
const combineRouter = require("./routers");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Set `io` globally so it can be accessed anywhere
global.io = io;

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));

dbConnection();

app.use("/api/v1", combineRouter);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("joinRoom", (driverId) => {
    console.log(`Driver with ID ${driverId} joined room.`);
    socket.join(driverId);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Invalid API endpoint" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// No need to explicitly export io, use `global.io`
module.exports = { app, server };
