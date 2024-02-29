import { json, request } from "express";
import chatModel from "../models/chatsModal.js";
import messagesModal from "../models/messageModal.js";

export const createChatController =async (request,response)=>{
    try {
        const chats = await chatModel.find({
            members: {
                $all: [request.body.senderId, request.body.reciverId]
            }
        });
        console.log(chats);
        if (chats.length==0) {
         const newChat = new  chatModel({ members:[request.body.senderId,request.body.reciverId]});
         newChat.save()
        
         const newMessage={
            senderId:request.body.senderId,
            chatId:newChat._id,
            text:request.body.message
        }
        const message= new messagesModal(newMessage)
        try {
            const result=await message.save() 

        } catch (error) {
            console.error("Error in  createChatController",error);
            response.status(500).json(error)
        }
    }

    else{
        console.log("chat already exsist",chats[0]._id);
        const newMessage={
            senderId:request.body.senderId,
            chatId:chats[0]._id,
            text:request.body.message
        }

        const message= new messagesModal(newMessage)
        try {
            const result=await message.save()

        } catch (error) {
            console.log("error 47",error);
            response.status(500).json(error)
        }

    } 



} 
catch (error) {
    response.status(500).json(error)
    console.log("error 58",error);
}
response.status(200).json({message:"Message Sent Successfully"})
console.log("success");
}

export const userChatsController = async (request,response)=>{
    try {
        const chats = await chatModel.find({ 
            members:{$in:[request.params.userId]}
        })
        response.status(200).json(chats)
    } catch (error) {
        console.error("Error in userChatsController",error);
        response.status(500).json(error)
    }
}

export const findChatController = async (request,response)=>{
    try {
         const chat=await chatModel.findOne({
            members:{$all:[request.params.firstId,request.params.secondId]}
        })
        response.status(200).json(chat)
        
    } catch (error) {
        console.error("Error in findChatController",error);
        response.status(500).json(error)
    }
} 