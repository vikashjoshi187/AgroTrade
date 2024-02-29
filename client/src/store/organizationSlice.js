import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {REQUESTED_URL , ORGANIZATION_REQUESTED_URL} from '../urls.js';
import jscookie from 'js-cookie';


const initialState = {
    orgData: {}
}

const organizationSlice = createSlice({
    name: 'orgSlice',
    initialState,
    reducers: {
        setOrgData : (state,action)=>{
            const org = action.payload;
            state.orgData = org;
        },
    }
});

export const orgRegister = async (payload) => {
    console.log("Payload inside orgRegister in orgSlice : ", payload);
    try {
        var result = await axios.post(REQUESTED_URL + '/organizationregistration',payload);
        // console.log("Result : ", result);
        if(result.data.message=="seccess"){
            jscookie.set('token',result.data.token,{expires:1});
        }
        return result.data;
    } catch (error) {
        console.log("Error in orgRegister in orgSlice : ", error);
    }
}

export const orgLogin = async(payload)=>{
    try{
        console.log("inside orgLogin in orgSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/organizationlogin",payload);
        // console.log("Result :" ,result);
        if(result.data.message=="seccess"){
            jscookie.set('token',result.data.token,{expires:1});
        }
        return result.data;
    }catch(error){
        console.log("Error in orgLogin in orgSlice : ",error);
    }
}

export const checkOtp =  async(payload)=>{
    try{
        console.log("inside check in userSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/checkotp",payload);
        // console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in check in userSlice : ",error);
    }
}

export const changePassword =  async(payload)=>{
    try{
        console.log("inside change in orgSlice : ",payload);
        var result  = await axios.post(REQUESTED_URL+"/orgchangepassword", payload);
        // console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in change in orgSlice : ",error);
    }
}

export const requestForLand =  async(payload)=>{
    try{
        console.log("inside requestForLand : ",payload);
        var result  = await axios.post(ORGANIZATION_REQUESTED_URL+"/requestForLand",payload);
        // console.log("Result :" ,result);
        return result.data;
    }catch(error){
        console.log("Error in requestForLand : ",error);
    }
}

export const requestForLandColdSt =  async(payload)=>{
    try{
        console.log("inside requestForLandColdSt : ",payload);
        var result  = await axios.post(ORGANIZATION_REQUESTED_URL+"/requestForLandColdSt",payload);
        // console.log("Result :" ,result);
        return result;
    }catch(error){
        console.log("Error in requestForLandColdSt : ",error);
    }
}

export const UpdateOrgProfile=async(payload)=>{
    
    try {
        console.log("inside UpdateOrgProfile : ",payload);
        var result =await axios.post(ORGANIZATION_REQUESTED_URL+"/updateorgprofile",payload)
        // console.log("result",result);
        return result.data
    } catch (error) {
        console.log('error in org Data');
        
    }
}

export const getContracts=async(dealer_email)=>{
    try {
        console.log("Inside getContracts : ",dealer_email);
        var result =await axios.get(`${ORGANIZATION_REQUESTED_URL}/getContracts/${dealer_email}`)
        // console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}



export const creteAgreement=async(payLoad)=>{
    try {
        console.log("Inside create agreemenbt : ",payLoad);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/creteAgreement`,payLoad)
        console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const creteAgreementCold=async(payLoad)=>{
    try {
        console.log("Inside create agreemenbt : ",payLoad);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/creteAgreementCold`,payLoad)
        console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const removeAgreement=async(payLoad)=>{
    try {
        console.log("Inside remove agreement : ",payLoad);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/removeAgreement`,payLoad)
        // console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const removeAgreementColdst=async(payLoad)=>{
    try {
        console.log("InsideremoveAgreementColdst : ",payLoad);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/removeAgreementColdst`,payLoad)
        // console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const getPartiesData=async()=>{
    try {
        const dealer_email=jscookie.get("dealer_email")
        console.log("Inside getPartiesData : ",dealer_email);
        var result =await axios.get(`${ORGANIZATION_REQUESTED_URL}/getPartiesData/${dealer_email}`)
        console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const getColdStContracts=async(dealer_email)=>{
    try {
        console.log("Inside getColdStContracts : ",dealer_email);
        var result =await axios.get(`${ORGANIZATION_REQUESTED_URL}/getColdStContracts/${dealer_email}`)
        console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}
export const getPartiesDataCold=async()=>{
    try {
        const dealer_email=jscookie.get("dealer_email")
        console.log("Inside getPartiesDataCold : ",dealer_email);
        var result =await axios.get(`${ORGANIZATION_REQUESTED_URL}/getPartiesDataCold/${dealer_email}`)
        console.log("result",result);
        return result.data
    } catch (error) {
        console.error('Error in getting contracts for Orgnisation');
        return error
    }
}




export const payColdStorageAmount=async(payload)=>{
    try {
        console.log("id contract  : ",payload);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/payColdStorageAmount`,{_id:payload})
        return result.data
    } catch (error) {
        console.error('Error in payColdStorageAmount');
        return error
    }
}


export const payAgriStorageAmount=async(payload)=>{
    try {
        console.log("id contract  : ",payload);
        var result =await axios.post(`${ORGANIZATION_REQUESTED_URL}/payAgriStorageAmount`,{_id:payload})
        return result.data
    } catch (error) {
        console.error('Error in payColdStorageAmount');
        return error
    }
}

export const { setOrgData } = organizationSlice.actions;
// export const { orgRegister,orgLogin } = organizationSlice.actions;
export default organizationSlice.reducer;