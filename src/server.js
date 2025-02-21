// server.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://s-chat-frontend-neaw.vercel.app/",
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for incoming chat messages
  socket.on("message", (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 7623;

app.use((req, res)=> {
  res.send("Your Api is working!...")
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
