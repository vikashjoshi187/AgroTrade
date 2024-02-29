import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { ADMIN_REQUESTED_URL } from '../urls.js';
import jscookie from 'js-cookie';
const initialState = {
    adminData:{}
}

const adminSlice = createSlice({
    name:"adminSlice",
    initialState,
    reducers:{
        setAdminData : (state,action)=>{
            const admin = action.payload;
            state.adminData = admin; 

        }
    }
});

export const adminLogin = async(payload)=>{
    try{
        console.log("inside adminLogin in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/adminLogin", payload);
        console.log("Result :" ,result);
        // if(result.data.message==="success"){
        //     jscookie.set('token',result.data.token,{expires:1});
        // }
        return result.data;
    }catch(error){
        console.log("Error in adminLogin in adminSlice : ",error);
    }
}
export const statusUpdate = async(payload)=>{
    try{
        console.log("inside  statusUpdate in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusUpdate", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusUpdate in adminSlice : ",error);
    }
}
export const statusUser = async(payload)=>{
    try{
        console.log("inside  statusUser in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusUser", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusUser in adminSlice : ",error);
    }
}
export const statusExpert = async(payload)=>{
    try{
        console.log("inside  statusExpert in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusExpert", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusExpert in adminSlice : ",error);
    }
}
export const statusVerify = async(payload)=>{
    try{
        console.log("inside  statusVerify in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusVerify", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusVerify in adminSlice : ",error);
    }
}
export const statusVerifyupdate = async(payload)=>{
    try{
        console.log("inside  statusVerifyupdate in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusVerifyupdate", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusVerifyupdate in adminSlice : ",error);
    }
}
export const statusVerifyExpert = async(payload)=>{
    try{
        console.log("inside  statusVerifyExpert in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/statusVerifyExpert", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in statusVerifyExpert in adminSlice : ",error);
    }
}
export const verifyAdminStatus = async(payload)=>{
    try{
        console.log("inside  verifyAdminStatus in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/verifyAdminStatus", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in verifyAdminStatus in adminSlice : ",error);
    }
}
export const verifyStatusAdmin = async(payload)=>{
    try{
        console.log("inside  verifyStatusAdmin in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/verifyStatusAdmin", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in verifyStatusAdmin in adminSlice : ",error);
    }
}
export const verifyAdminStatusAg = async(payload)=>{
    try{
        console.log("inside  verifyAdminStatusAg in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/verifyAdminStatusAg", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in verifyAdminStatusAg in adminSlice : ",error);
    }
}
export const verifyAdminStatusCold = async(payload)=>{
    try{
        console.log("inside  verifyAdminStatusCold in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/verifyAdminStatusCold", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in verifyAdminStatusCold in adminSlice : ",error);
    }
}

export const checkOtp =  async(payload)=>{
    try{
        console.log("inside check in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/checkotp",payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in check in adminSlice : ",error);
    }
}

export const changePassword =  async(payload)=>{
    try{
        console.log("inside change in adminSlice : ",payload);
        var result  = await axios.post(ADMIN_REQUESTED_URL+"/changepassword", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in change in adminSlice : ",error);
    }
}

export const {setAdminData} = adminSlice.actions;
export default adminSlice.reducer;
