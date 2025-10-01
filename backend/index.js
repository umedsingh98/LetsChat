import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRouter.js';
import messageRouter from './routes/messageRouter.js';
import { Server } from 'socket.io';

//create express app and http server
const app = express();
const server = http.createServer(app);

//Inetialize Socket.io server 
export const io = new Server(server,{
    cors: {origin: "*"}
});

//Store Online Users
export const userSocketMap = {};   //{ userId: socketId }

//Socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    //Emit online user to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

//middleware setup
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cors());

//Routes
app.use("/api/status", (req,res) => res.send("Server is running..."));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("Serveris running on port: " + PORT));
