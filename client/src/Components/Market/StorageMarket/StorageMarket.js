
import React, { useEffect, useState } from 'react';
// import './GrainMarket.css';
import '../../UserDashboard/ListedGrain/ListedGrinCard.css'

import jscookie from 'js-cookie';
import { storageMarket } from '../../../store/marketSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export function StorageMarketCard({ storageLand }) {

  const [storages, setStorage] = useState([]);

  const dispatch=useDispatch();

  const getStorage = async (token) => {
    const storage = await dispatch(storageMarket(token));
    console.log('storage in component', storage.payload);
    setStorage(storage.payload);

  }
  useEffect(()=>{
    const token = jscookie.get('token')
    if(storageLand){
    setStorage([storageLand]);
  }else{

    getStorage(token)
  }

  },[])

  return (
    <>
{ storages||storageLand?
  storages.map((storage)=>{
return(
  <div key={storage._id} className="card mb-4 w-100 p-0">
        {/* <h2 className="mt-4 mb-3 text-center text-success"><strong>Grains</strong></h2> */}

  <div className="row g-0">
    <div className="col-md-4 bg-dark" id="imgeDiv">
      <img src={"http://localhost:3000/" + storage.image} className="img-fluid rounded-start w-100 card-image" alt={storage.image} />
    </div>
    <div className="col-md-5">
      <div className="card-body">
        <div className="p-1" >
          <div className="d-flex justify-content-between" >
            <h3 className="card-title darkgreen ">{storage.landTitle}</h3> <div>
            </div>
          </div>
          <h5 className="darkgreen">
            <span className="text-danger">
              <i className="bi bi-geo-alt text-danger"></i>
              &nbsp;{storage.city + " " + storage.state}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <span className="text-primary">
              <i className="bi bi-rulers"></i>&nbsp;Size :{storage.area} acres
            </span>{" "}
          </h5>

          <h5 className="darkgreen">
            Condition: {storage.infrastructure}
          </h5>

          <h5 className="darkgreen">
            Address: {storage.address},{storage.pincode}
          </h5>
          <h5 className="card-text text-break darkgreen  landparag">
            Description: {storage.description}
          </h5>
        </div>
      </div>
    </div>
    <div className="col-md-3  p-2">
      <div className="row m-0 w-100 d-flex flex-column">
        <div className="col-12 d-flex justify-content-end pt-3 pe-3">
          {storage.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

        </div>
        <div className="col-12  midgreen">
          <h5>
            Rent: {storage.rent}/Month
          </h5>

          <h5 className="darkgreen ">
          From: {new Date( storage.avilableFrom).getDate()+"/"+new Date( storage.avilableFrom).getMonth()+1+"/"+new Date( storage.avilableFrom).getFullYear()}
          </h5>

          <h5 className="darkgreen">
          To: {new Date( storage.avilableTill).getDate()+"/"+new Date( storage.avilableTill).getMonth()+1+"/"+new Date( storage.avilableTill).getFullYear()}
          </h5>
          {storageLand?
    <button className='btn btn-success w-100 mx-auto'>
  <Link to='/market/storageMarket' className='text-white text-decoration-none'>Explore More</Link>
</button>: <button className='btn btn-success mt-1 w-50 mx-auto'>
  <Link className='text-white text-decoration-none'>Add to Cart</Link>
</button>
  }
        </div>
      </div>
    </div>
   
  </div>
</div>

)
  }) :<h1 className='text-center'>There is no Equipment available</h1>

}

        
    </>
  );
}
