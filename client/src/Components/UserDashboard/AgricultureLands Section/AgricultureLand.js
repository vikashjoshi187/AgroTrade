import AgricultureLandCard from "./AgricultureLandCard";
import AddAgricultureLand from "./AddLand/AddAgricultureLand";
import { useEffect, useState } from "react";
import jscookie from "js-cookie";
import axios from "axios";
import { USER_REQUESTED_URL } from "../../../urls.js";
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx"

function AgricultureLand() {
  const [Lands, setLands] = useState(["Loading..."]);
  const userEmail = jscookie.get("userEmail");
  function getLand(userEmail) {
    axios.get(USER_REQUESTED_URL + "/getAgriLand", { params: { ownerEmail: userEmail } }).then((response) => {
      setLands(response.data.Lands)
    }).catch(err => console.log('error ', err));
  }
  useEffect(() => {
    getLand(userEmail)
  }, []);
  function sendLands(Lands) {
    setLands(Lands)
  }


  return (
    <>
      <div className="row m-2 p-0 " id="ListedGrainsBox">
        <div className="col-12 d-flex justify-content-between p-3">
          <h1 className="text-center darkgreen wght-600">
            {" "}
            <i className="fa-solid fa-wheat-awn"></i>&nbsp;Agriculture Lands
          </h1>
          <AddAgricultureLand sendLands={sendLands} />
        </div>
        <div className="col-12" >
          {
            Lands[0] == "Loading..." ? <Loadinganimtion /> : Lands.length==0 ? <>NO LISTED AGRICULTURE LAND CURRENTLY</> :Lands.map((Land, index) => {
              return (<AgricultureLandCard key={index} Land={Land} sendLands={sendLands} />)
            })
          }
        </div>

      </div>
    </>
  );
}

export default AgricultureLand;
