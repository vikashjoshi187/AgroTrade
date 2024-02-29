import { useEffect, useState } from "react";
import { getAgriLandrequest } from "../../../../store/commonSlice.js"
import Loadinganimtion from "../../../Loading Amimation/Loadinganimation.jsx";
import Request_card from "./Request_Land _Card/Request_card.js";

function RequestagricultureLand() {
  const [requests, setRequest] = useState(["Loading..."])
  useEffect(() => {
    console.log("his ");
    getAgriLandrequest().then((data) => {
      console.log(data);
      setRequest(data)
    });


  }, [])
  return (<>
    <div className="row m-2 p-0 bg-light" id="ListedGrainsBox">
      <div className="col-12 d-flex justify-content-between p-3">
        <h1 className="text-center darkgreen wght-600">
          {" "}
          <i className="fa-solid fa-wheat-awn"></i>&nbsp;Booking Request for Agriculture Land
        </h1>

      </div>
      {
        requests[0] == "Loading..." ? <Loadinganimtion /> : requests == [] ? <>No Booking currently</> : <>
          {
            requests.map((request, i) => {
              return (<Request_card key={i} request={request} />)
            })

          }
        </>


      }

    </div>
  </>);
}

export default RequestagricultureLand;