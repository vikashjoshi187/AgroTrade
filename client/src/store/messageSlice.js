import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {CHAT_REQUESTED_URL} from "../urls.js";
const initialState = {
    chatData:{}
}

const messageSlice = createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
        setAdminData : (state,action)=>{
    
        }
    }
});

export const sendMessage = async(payload)=>{
    try{
        console.log("this is the payloads ",payload);
        var result  = await axios.post(`http://localhost:3000/message/`,payload);
        console.log("th8is fvjhvb",result.data);
        return result.data;
    }catch(error){
        console.log(error);
    }
}


export const findMessages = async(payload)=>{
    try{
        var result  = await axios.get(`http://localhost:3000/message/${payload}`)
        // console.log(result.data);
        return result.data;
    }catch(error){
        console.log(error);
    }
}



export const {setAdminData} = messageSlice.actions;
export default messageSlice.reducer;