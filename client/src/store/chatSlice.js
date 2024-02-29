import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {CHAT_REQUESTED_URL} from "../urls.js";
const initialState = {
    chatData:{}
}

const chatSlice = createSlice({
    name:"chatSlice",
    initialState,
    reducers:{
        setAdminData : (state,action)=>{
    
        }
    }
});


export const createChat = async(payload)=>{
    try{
        console.log("this is the payloads in create chat ",payload);

        var result  = await axios.post(`http://localhost:3000/chat/`,payload);
        console.log("Inside create chat chatSlice",result.data);
        return result.data;
    }catch(error){
        console.log(error);
    }
}


export const findChat = async(payload)=>{
    // console.log("This is payLoad",payload);
    try{
        var result  = await axios.get(`http://localhost:3000/chat/${payload}`)
        console.log(result.data);
        return result.data;
    }catch(error){
        console.log(error);
    }
}



export const {setAdminData} = chatSlice.actions;
export default chatSlice.reducer;