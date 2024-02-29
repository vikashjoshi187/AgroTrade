import { request } from "express";
import messagesModal from "../models/messageModal.js";

export const addMessageController =async(request,response)=>{
    const {chatId,senderId,text}=request.body;
    const message= new messagesModal({
        chatId,
        senderId,
        text
    })
    try {
        const result=await message.save()
        const messages =await messagesModal.find({chatId})
        response.status(200).json(messages)
    } catch (error) {
        console.error("Error in addMessageController",error);
        response.status(500).json(error)
    }
}

export const getMessagesController =async(request,response)=>{
    const {chatId}=request.params;
    try {
        const result =await messagesModal.find({chatId})
        console.log(result);
        response.status(200).json(result)
        
    } catch (error) {
        console.error("Error in getMessagesController",error);
        response.status(500).json(error);
    }

}