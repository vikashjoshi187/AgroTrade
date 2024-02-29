import { useEffect,useState } from "react";
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx";
import { getContracts } from "../../../store/organizationSlice.js";
import jscookie from "js-cookie";
import ContractDetailCard from "./Contract Detail Card/ContractDetailCard.js";

function AgriLandContaract() {
    const [contracts,setContracts]=useState(["Loading..."]);
    useEffect(()=>{
    const  dealer_email=  jscookie.get("dealer_email")
    console.log("This is the dealer email "+dealer_email);
    
    getContracts(dealer_email).then((result)=>{
                     console.log("This is the result inside  get contracts",result);
                     setContracts(result)
       
        })

    },[])
   
   
return (<>
{ contracts[0]=="Loading..."?<Loadinganimtion/>:contracts.length==0?<>Currently no contracts</>
   :
    <>
    <div className=" w-100" >
       <div className="row m-0 w-100" >
       {
        contracts.map((contract,i)=>{
            return(<>
           <ContractDetailCard contract={contract} key={i}/>
            </>)
        })

    }
       </div> 
    </div>
    </>
 }

    </>);
}

export default AgriLandContaract;


