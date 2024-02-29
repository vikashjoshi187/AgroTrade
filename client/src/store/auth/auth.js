import { jwtVerification } from "../commonSlice.js";
import { setUserData } from "../userSlice.js";
import { setOrgData } from "../organizationSlice.js";
import { setAdminData } from "../adminSlice.js";
import { setRoleStatus } from "../commonSlice.js";
export const authorize = (dispatch)=>{
    jwtVerification().then((logData)=>{
        console.log("logdata : -> ",logData  );
        if(logData.role=="user"){
            dispatch(setUserData(logData.log));
            dispatch(setRoleStatus({role:"user", status: true}));
        }else if(logData.role=="organization"){
            dispatch(setOrgData(logData.log));
            dispatch(setRoleStatus({role:"organization", status: true}));
        }else if(logData.role=="admin"){
            dispatch(setAdminData(logData.role));
            dispatch(setRoleStatus({role:"admin", status:true}));
        }
    }).catch(()=>{
        
    });
};