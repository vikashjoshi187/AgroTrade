import View from "../View.js";
import { ORGANIZATION_REQUESTED_URL } from "../../../../urls.js";
import ReqForColdStLand from '../../ReqForColdStLand/ReqForColdStLand.js';

function Agri_landCold_card_book(props) {
    const {ColdSt}=props;
    return ( <>
       <div className="card mb-4 w-100 p-0">
            <div className="row g-0">
              <div className="col-md-4 bg-dark" id="imgeDiv">
                <img src={"http://localhost:3000/" + ColdSt.image} className="img-fluid rounded-start w-100 card-image" alt={ColdSt.image} />
              </div>
              <div className="col-md-5">
                <div className="card-body">
                  <div className="p-1" >
                    <div className="d-flex justify-content-between" >
                      <h3 className="card-title darkgreen ">{ColdSt.landTitle}</h3> <div>
                      </div>
                    </div>
                    <h5 className="darkgreen">
                      <span className="text-danger">
                        <i className="bi bi-geo-alt text-danger"></i>
                        &nbsp;{ColdSt.city + " " + ColdSt.state}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <span className="text-primary">
                        <i className="bi bi-rulers"></i>&nbsp;Size :{ColdSt.area} acres
                      </span>{" "}
                    </h5>

                    <h5 className="darkgreen">
                      Condition: {ColdSt.infrastructure}
                    </h5>

                    <h5 className="darkgreen">
                      Address: {ColdSt.address},{ColdSt.pincode}
                    </h5>
                    <h5 className="card-text text-break darkgreen  landparag">
                      Description: {ColdSt.description}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3  p-2">
                <div className="row m-0 w-100 d-flex flex-column">
                  <div className="col-12 d-flex justify-content-end pt-3 pe-3">
                    {ColdSt.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

                  </div>
                  <div className="col-12  midgreen">
                    <h5>
                      Rent: {ColdSt.rent}/Month
                    </h5>

                    <h5 className="darkgreen ">
                      From: {new Date(ColdSt.avilableFrom).getDate() + "/" + new Date(ColdSt.avilableFrom).getMonth() + 1 + "/" + new Date(ColdSt.avilableFrom).getFullYear()}
                    </h5>

                    <h5 className="darkgreen">
                      To: {new Date(ColdSt.avilableTill).getDate() + "/" + new Date(ColdSt.avilableTill).getMonth() + 1 + "/" + new Date(ColdSt.avilableTill).getFullYear()}
                    </h5>
                    <div className="d-grid gap-2">
                      <View image360={ColdSt.image360} />
                      <ReqForColdStLand ColdSt={ColdSt}/>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </> );
}

export default Agri_landCold_card_book;