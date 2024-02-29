import express from "express"
import { newRoomController } from "../controller/videocallController.js";
const videocallRouter =express.Router();

videocallRouter.get("/",newRoomController)



export default videocallRouter;