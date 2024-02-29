import express from "express";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";;
// import methodOverride from 'method-override';
import expresssession from 'express-session';
import connectDB from "./config/dbconfig.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import indexRouter from "./routes/indexRouter.js";
import sockets from "./sockets/socketsRoutes.js";
import path from "path";
import messageRouter from './routes/messageRouter.js'
import chatRouter from './routes/chatRouter.js'
import orgRouter from './routes/organizationRouter.js'
import videocallRouter from "./routes/videocallRouter.js";
import { fileURLToPath } from 'url';
import adminRouter from './routes/adminRouter.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
const httpServer = http.createServer(app); //used to creating server and dealing with api it is helpful for socket io
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3001"] //it doesnt need installation of cors module
        
    }
}); 
io.on("connection",sockets);
console.log("inside server app.js")


// app.use(methodOverride("_method"));
app.use(express.json());
app.use(expresssession({secret:"sessionsecret",saveUninitialized:true,resave:true}))
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));


app.use("/uploads",express.static("uploads"))
app.use('',indexRouter);
app.use('/user',userRouter);
app.use('/admin',adminRouter)
app.use("/chat",chatRouter);
app.use("/message",messageRouter);
app.use("/organization",orgRouter);
app.use("/videoCall",videocallRouter)


httpServer.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
