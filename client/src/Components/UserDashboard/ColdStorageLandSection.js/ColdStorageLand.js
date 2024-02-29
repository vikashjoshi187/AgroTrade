import AddColdStorageLand from "./AddColdStorageLand";
import jscookie from "js-cookie"    
import { useEffect, useState } from "react";
import axios from 'axios';
import { USER_REQUESTED_URL } from '../../../urls.js';
import ListedColdStorageCards from "./ListedColdStorageCards.js"
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx";
function ColdStorageLand(){
    const [dataColdSt,setDataColdSt ] = useState(["Loading..."]);
    var getcoldSts=() => {
        const userEmail = jscookie.get("userEmail");
        
        axios.post(USER_REQUESTED_URL + "/getcoldSt", { userEmail }).then((land) => {
            setDataColdSt(land.data.result)
            console.log("dataColdSt", dataColdSt);
        }).catch(err => console.log('error ', err));
    }
    
    useEffect(getcoldSts, [])
    return (<>

        <div className="row m-2 p-0 " id="ListedGrainsBox" >
            <div className="col-12 d-flex justify-content-between p-3" >
                <h1 className="text-center darkgreen wght-600"> <i className="fa-solid fa-wheat-awn"></i>&nbsp;Cold Storage Land</h1>
                <AddColdStorageLand getcoldSts={getcoldSts}/>
            </div>
         {
             dataColdSt[0] == "Loading..." ? <Loadinganimtion /> : dataColdSt.length==0 ? <>NO LISTED COLD STORAGE LAND CURRENTLY</> :dataColdSt.map((ColdSt,index)=>{
           return(<ListedColdStorageCards key={index} ColdSt={ColdSt} index={index} getcoldSts={getcoldSts} />)
            })
           }
             
        </div>


    </>);
}

export default ColdStorageLand;