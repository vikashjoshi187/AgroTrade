
import React, { useEffect, useState } from 'react';
// import './GrainMarket.css';
import '../../UserDashboard/AgricultureLands Section/AgricultureLandCard.css'
import jscookie from 'js-cookie';
import { LandMarket } from '../../../store/marketSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./FarmLandMarket.css"
export function FarmLandMarketCard({ agriLand }) {

  const [agriLands, setAgriland] = useState([]);
  const dispatch = useDispatch();

  const getLand = async (token) => {
    const agriLand = await dispatch(LandMarket(token));
    console.log('agriLand in component', agriLand.payload);
    setAgriland(agriLand.payload);

  }
  useEffect(() => {
    const token = jscookie.get('token')
    if (agriLand) {
      setAgriland([agriLand]);
    } else {

      getLand(token);
    }

  }, [agriLand])


  return (
    <>
      {agriLand || agriLands ?
        agriLands.map((land) => {
          return (
            <div key={land._id} className="card mb-4 w-100 p-0">
              <div className="row g-0">
                <div className="col-md-4 bg-dark" id="imgeDiv">
                  <img src={"http://localhost:3000/" + land.image} className=" card-img rounded-start  landingpage-land-card-image" alt="..." />
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <div className="p-1" >
                      <div className="d-flex justify-content-between" >
                        <h3 className="card-title darkgreen ">{land.landTitle}</h3> <div>
                          {land.agriType === "Organic" ? <span className="badge bg-success fs-6 ">Organic</span> : <span className="badge bg-warning fs-6 ">Inorganic</span>}
                        </div>
                      </div>
                      <h5 className="darkgreen">
                        <span className="text-danger">
                          <i className="bi bi-geo-alt text-danger"></i>
                          &nbsp;{land.city + " " + land.state}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        <span className="text-primary">
                          <i className="bi bi-rulers"></i>&nbsp;Size :{land.area} acres
                        </span>{" "}
                      </h5>
                      <h5 className="darkgreen">
                        Soil Type: {land.soilType}
                      </h5>
                      <h5 className="darkgreen">
                        Condition: {land.infrastructure}
                      </h5>

                      <h5 className="darkgreen">
                        Address: {land.address},{land.zipCode}
                      </h5>
                      <h5 className="darkgreen">
                        Suitable For: {land.suitableFor}
                      </h5>
                      <h5 className="card-text text-break darkgreen  landparag">
                        Description: {land.description}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3  p-2">
                  <div className="row m-0 w-100 d-flex flex-column">
                    <div className="col-12 d-flex justify-content-end pt-3 pe-3">
                      {land.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

                    </div>
                    <div className="col-12  midgreen">
                      <h5>
                        Rent: {land.rent}/Month
                      </h5>
                      <h5 className="darkgreen ">
                        From: {new Date(land.avilableFrom).getDate() + "/" + new Date(land.avilableFrom).getMonth() + 1 + "/" + new Date(land.avilableFrom).getFullYear()}
                      </h5>

                      <h5 className="darkgreen">
                        To: {new Date(land.avilableTill).getDate() + "/" + new Date(land.avilableTill).getMonth() + 1 + "/" + new Date(land.avilableTill).getFullYear()}
                      </h5>
                      {agriLand ?
                        <button className='btn btn-success w-100 mx-auto mt-5'>
                          <Link to='/market/agriLandMarket' className='text-white text-decoration-none'>More</Link>
                        </button> : <button className='btn btn-success mt-1 w-50 mx-auto mt-5'>
                          <Link className='text-white text-decoration-none'>Add to Cart</Link>
                        </button>
                      }
                    </div>

                  </div>

                </div>

              </div>
            </div>
          )
        }) : <h1>There is No Land available</h1>
      }


    </>
  );
}
