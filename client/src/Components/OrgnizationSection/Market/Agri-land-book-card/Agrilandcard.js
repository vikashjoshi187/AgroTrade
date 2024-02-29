import React, { useEffect, useState } from 'react';
import View from "../View.js";
import RequestForLandModal from '../../RequestForLandModal/RequestForLandModal.js';

export default function Agri_landAgriland_book(props) {
      const{Land}=props;
      console.log("This is land",Land);
  return (
       <div className="card mb-4 w-100 p-0">
        <div className="row g-0">
          <div className="col-md-4 bg-dark" id="imgeDiv">
            <img src={"http://localhost:3000/"+Land.image} className="img-fluid rounded-start w-100 card-image" alt="..." />
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <div className="p-1" >
               <div className="d-flex justify-content-between" >
                <h3 className="card-title darkgreen ">{Land.landTitle}</h3> <div>
               { Land.agriType=="Organic"? <span className="badge bg-success fs-6 ">Organic</span>: <span className="badge bg-warning fs-6 ">Inorganic</span>}
               </div>
               </div>
                <h5 className="darkgreen">
                  <span className="text-danger">
                    <i className="bi bi-geo-alt text-danger"></i>
                    &nbsp;{Land.city+" "+Land.state}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <span className="text-primary">
                    <i className="bi bi-rulers"></i>&nbsp;Size :{Land.area} acres
                  </span>{" "}
                </h5>
                <h5 className="darkgreen">
                  Soil Type: {Land.soilType}
                </h5>
                <h5 className="darkgreen">
                  Condition: {Land.infrastructure}
                </h5>
                
                <h5 className="darkgreen">
                  Address: {Land.address},{Land.zipCode}
                </h5>
                <h5 className="darkgreen">
                  Suitable For:  {
                    Land.suitableFor.map((Grain,index)=>{
                    return ( <span key={index} class="badge bg-success m-1">{Grain}</span>                                                )
                    })
                    }
                </h5>
                <h5 className="card-text text-break darkgreen  landparag">
                  Description: {Land.description}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3  p-2">
            <div className="row m-0 w-100 d-flex flex-column">
              <div className="col-12 d-flex justify-content-end pt-3 pe-3">
             {Land.avilable?<span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span>:<span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}
             
              </div>
              <div className="col-12  midgreen">
                <h5>
                  Rent: {Land.rent}/Month
                </h5>
                <h5 className="darkgreen ">
                <h5 className="darkgreen ">
                        From: {new Date(Land.avilableFrom).getDate() + "/" + new Date(Land.avilableFrom).getMonth() + 1 + "/" + new Date(Land.avilableFrom).getFullYear()}
                      </h5>
                </h5>

                <h5 className="darkgreen">
                To: {new Date(Land.avilableTill).getDate() + "/" + new Date(Land.avilableTill).getMonth() + 1 + "/" + new Date(Land.avilableTill).getFullYear()}
                     
                 </h5>
                <div className="d-grid gap-2">
                  <View image360={Land.image360} />
                  <RequestForLandModal Land={Land}/>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
