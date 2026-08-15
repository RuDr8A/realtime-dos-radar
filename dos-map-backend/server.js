
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require("./src/app");
const connectToDB = require('./src/database/db');
const mockGenerator = require('./src/utils/mockDataGenerator');

const PORT = process.env.PORT || 3000; 
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

async function startServer() {
  try {
    
    await connectToDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}....`);
    });

    io.on("connection", (socket) => {
        console.log(` New client connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(` Client disconnected: ${socket.id}`);
        });
    });

    
    setInterval(() => {
        
        if (io.sockets.sockets.size > 0) {
            const newAttack = mockGenerator();
            io.emit("new-attack", newAttack); 
            console.log(`Broadcasting attack to ${io.sockets.sockets.size} clients...`, newAttack.threatLevel);
        } else {
            console.log("Stream idle: No clients connected.");
        }
    }, 2000);

  } catch (error) {
    console.error("Critical: Server failed to start:", error.message);
    process.exit(1);
  }
}

startServer();
