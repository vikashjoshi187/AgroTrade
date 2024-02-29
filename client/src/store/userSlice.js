import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { REQUESTED_URL } from '../urls.js';
import { USER_REQUESTED_URL } from '../urls.js';
import jscookie from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userData :{}
}
export const getDataonLoad=createAsyncThunk("userSlice/getDataonLoad",async(detailObj)=>{
    var obj=await axios.post(USER_REQUESTED_URL+`/getUser`,detailObj);
    console.log("inside getData thunk",obj.data[0].email);
    return obj.data[0];

})
export const completeProfile=createAsyncThunk("userSlice/completeProfile",async(profileData)=>{
    console.log("form data in complete thunk",profileData)
    try{
        var result=await axios.post(USER_REQUESTED_URL+"/updateUser",profileData);
        console.log("result in user slice completethunk",result);
        return result.data.result[0];

    }catch(err){
            console.log("error in store while completing profile")
    }
});

const userSlice = createSlice({
    name : 'userSlice',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getDataonLoad.fulfilled,(state,action)=>{
            console.log("inside getDataOnload reducer",action.payload);
            state.userData=action.payload;
        }).addCase(completeProfile.fulfilled,(state,action)=>{
            console.log("action in reducer complete profile",action.payload);
            state.userData=action.payload;


        })
           },
    reducers:{
        setUserData :(state,action)=>{
            const user = action.payload;
            state.userData = user;
            // console.log(state.userData);
            // localStorage.setItem('userData',JSON.stringify(state.userData));
            console.log("user data inside user reducer",user);
        },
        
        setStateOnReload: (state,action)=>{
            console.log(state);
            // const userslice = JSON.parse(localStorage.getItem("userData"));
            // console.log("user Slice : ",userslice);
            // state.userData = userslice;
        }
        }
});

// export const completeProfile=async(profileData)=>{
//     console.log("form data in complete thunk",profileData)
//     try{
//         var result=await axios.post(USER_REQUESTED_URL+"/updateUser",profileData);
//         return result;
//     }catch(err){
//             console.log("error inside complete profile",err);
//     }

// }


export const userRegister = async(payload)=>{
    try{
        console.log("insede userRegister in userSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/userregistration", payload);
        console.log("Result :" ,result);
        if(result.data.message==="success"){
            jscookie.set('token',result.data.token,{expires:1});
        }
        return result.data;
    }catch(error){
        console.log("Error in useRregister in userSlice : ",error);
    }
};


export const userLogin = async(payload)=>{
    try{
        console.log("inside userLogin in userSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/userlogin", payload);
        console.log("Result :" ,result);
        if(result.data.message==="success"){
            jscookie.set('token',result.data.token,{expires:1});
        }
        return result.data;
    }catch(error){
        console.log("Error in userLogin in userSlice : ",error);
    }
}

export const checkOtp =  async(payload)=>{
    try{
        console.log("inside check in userSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/checkotp",payload);
        console.log("Result : " ,result);
        return result.data;
    }catch(error){
        console.log("Error in check in userSlice : ",error);
    }
}

export const changePassword =  async(payload)=>{
    try{
        console.log("inside change in userSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/changepassword", payload);
        console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in change in userSlice : ",error);
    }
}

export const addGrain = async(payload)=>{
    console.log("Grains",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/grainInsert",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}
export const addColstLand = async(payload)=>{
    console.log("addColstLand",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/coldStInsert",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}
export const bookExpert = async (payload) => {
    console.log("This is bookExpert", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/bookExpert", payload);
        console.log("result", result);
        return result.data
    } catch (error) {
        console.log("error sendData");
    }
}

    export const deleteGrainId = async(payload)=>{
        console.log("GrainsDelete",payload);
        try{
            var result  = await axios.post(USER_REQUESTED_URL+"/deleteGrainId",payload);
            console.log("result",result);
            return result.data
        }catch(error){
            console.log("error sendData");
        }
    }
    export const deleteColdStId = async(payload)=>{
        console.log("ColdStId Delete",payload);
        try{
            var result  = await axios.post(USER_REQUESTED_URL+"/deletecoldStId",payload);
            console.log("result",result);
            return result.data
        }catch(error){
            console.log("error sendData");
        }
    }
export const UpdateGrain = async(payload)=>{
    console.log("UpdateGrain",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/UpdateGrain",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}
export const UpdateColdSt = async(payload)=>{
    console.log("UpdateColdSt",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/UpdatecoldStId",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}
export const UpdateAgriLd = async(payload)=>{
    console.log("UpdateColdSt",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/UpdateAgriLd",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}


export const addEquipment = async(payload)=>{
    console.log("Equipment",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/addEquipment",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}

export const deleteEquipmentId = async(payload)=>{
    console.log("EquipmentDelete",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/deleteEquipmentId",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}

export const UpdateEquipment = async(payload)=>{
    console.log("UpdateEquipment",payload);
    try{
        var result  = await axios.post(USER_REQUESTED_URL+"/UpdateEquipment",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}

export const addAgriLand = async(payload)=>{
    console.log("This is Land data",payload);
    try{
         var result  = await axios.post(USER_REQUESTED_URL+"/addAgriLand",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}

export const removeAgriLand = async(payload)=>{
    console.log("This is Land data",payload._id);
    console.log(payload);
    try{
         var result  = await axios.get(USER_REQUESTED_URL+"/removeAgriLand",{params:{_id: payload._id,ownerEmail:payload.ownerEmail}});
        console.log("result",result);
        return result.data
    }catch(error){
        console.log(error);
    }
}
export const getDataColdStorage = async(payload)=>{
    const userEmail=jscookie.get("userEmail")
    try{
         var result  = await axios.get(`${USER_REQUESTED_URL}/getDataColdStorage/${userEmail}`);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log(error);
    }
}

// export const  getAgriLand = async (payload)=>{
//     console.log("This is email data",payload);
//     try{
//          var result  = await axios.get(USER_REQUESTED_URL+"/getAgriLand",{email:payload});

//         return result
//     }catch(error){
//         console.log("error sendData");
//     }
// }

export const statusVerifyupdate = async (payload) => {
    console.log("This is statusVerifyupdate", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/statusVerifyupdate", payload);
        console.log("result", result);
        return result.data
    } catch (error) {
        console.log("error sendData");
    }
}

export const declineRequest= async (payload) => {
    console.log("This is status declineRequest", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/declineRequest", payload);
        console.log("result", result);
        return result
    } catch (error) {
        console.log("error sendData",error);
        return result
    }
}

export const acceptRequest= async (payload) => {
    console.log("This is status acceptRequest", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/acceptRequest", payload);
        console.log("result", result);
        return result
    } catch (error) {
        console.log("error sendData",error);
        return result
    }
}
export const addMessage = async(payload)=>{
    console.log("This is Contactpage data",payload);
    try{
         var result  = await axios.post(USER_REQUESTED_URL+"/addMessage",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}


export const farmerSignedAgreement=async(payload)=>{
    console.log("This is Contactpage data",payload);
    try{
         var result  = await axios.post(USER_REQUESTED_URL+"/farmerSignAgreement",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}
export const farmerSignedAgreementCd=async(payload)=>{
    console.log("This is Contactpage data",payload);
    try{
         var result  = await axios.post(USER_REQUESTED_URL+"/farmerSignedAgreementCd",payload);
        console.log("result",result);
        return result.data
    }catch(error){
        console.log("error sendData");
    }
}

export const declineColdStRequest= async (payload) => {
    console.log("This is status declineColdStRequest", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/declineColdStRequest", payload);
        console.log("result", result);
        return result
    } catch (error) {
        console.log("error sendData",error);
        return result
    }
}

export const acceptColdStRequest= async (payload) => {
    console.log("This is status acceptColdStRequest", payload);
    try {
        var result = await axios.post(USER_REQUESTED_URL + "/acceptColdStRequest", payload);
        console.log("result", result);
        return result
    } catch (error) {
        console.log("error sendData",error);
        return result
    }
}

export const getDataForAgreementCold = async () => {
    const email=jscookie.get("userEmail")
    console.log("This is status getDataForAgreementCold",email);
    try {
        var result =await axios.get(`${USER_REQUESTED_URL}/getDataForAgreementCold/${email}`)
        // console.log("resultresultresultresult", result);
        return result.data
    } catch (error) {
        console.log("error sendData", error);
        return result
    }
}

export const getDataForAgreement = async () => {
    const email=jscookie.get("userEmail")
    console.log("This is status getDataForAgreement",email);
    try {
        var result =await axios.get(`${USER_REQUESTED_URL}/getDataForAgreement/${email}`)
        // console.log("result", result);
        return result.data
    } catch (error) {
        console.log("error sendData", error);
        return result
    }
}

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;