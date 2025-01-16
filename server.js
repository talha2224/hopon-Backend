const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/connection");
const combineRouter = require("./routers");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const Message = require("./models/chat/message.schema")

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
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
  socket.on("join-chat", async (chatId) => {
    try {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
      const chatHistory = await Message.find({ chatId }).sort({ createdAt: 1 });
      socket.emit("chat-history", chatHistory);
    } 
    catch (error) {
      console.error("Error fetching chat history:", error);
    }
  });
  socket.on("send-message", async (data) => {
    const { chatId, driverId, riderId, senderRole, message } = data;
    const newMessage = await Message.create({ chatId, driverId, riderId, senderRole, message, });
    io.to(chatId).emit("receive-message", newMessage);
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
