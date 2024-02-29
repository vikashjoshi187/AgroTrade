
import React, { useEffect, useState } from 'react';
// import './GrainMarket.css';
import '../../UserDashboard/ListedGrain/ListedGrinCard.css'
import { USER_REQUESTED_URL } from '../../../urls';
import axios from 'axios';
import jscookie from 'js-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addTocart, getCart} from '../../../store/marketSlice';
import "./GrainMarket.css"

export function GrainMarketCard({ grain }) {

  const [dat, setData] = useState([]);
  const dispatch=useDispatch();

  // const[cartCount,setCartCount]=useState(0);
  const getCartitem=async({token,email})=>{
   const cartItems=await dispatch(getCart({token,email}));
   console.log("cart items in grain component",cartItems);
  //  if(cartItems.payload)
  //  setCartCount(cartItems.payload.length);
  }

  useEffect(()=>{
    const token = jscookie.get('token')
    const email=jscookie.get('userEmail');

    if(grain){
    setData([grain]);
  }else{
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_REQUESTED_URL + "/marketGrains" );
        setData(response.data.grain);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }
  if(!grain){
    getCartitem({token,email});

  }
  },[grain,dispatch])

  const addTocarts=async(_id)=>{
    const token = jscookie.get('token')
    const email=jscookie.get('userEmail');
    if(!token)
    {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "please login first",
        html:"",
        showConfirmButton: false,
        timer: 1500
      });

    }
    else{
     
    const addResponse=await dispatch(addTocart({token,email,_id}));
    console.log("addResponse",addResponse);
    if(addResponse.payload.msg==='added successfully')
    {
      Swal.fire({
        position: "center",
        icon: "",
        title: "Added to Cart",
        html:"<i class='fs-1 text-info bi bi-cart-fill'></i>",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      Swal.fire({
        position: "center",
        icon: "",
        title: "there is an error please try again",
        html:"<i class='fs-1 text-info bi bi-cart-fill'></i>",
        showConfirmButton: false,
        timer: 1500
      });
    }

  }
  }
  return (
    <>
   

{ dat||grain?
  dat.map((data)=>{
return(
<div key={data._id} className="col-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center p-1 d-inline-flex ">
<div className="card bg-white bg-warning w-100 m-1">
  <div className="row g-0">
    <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 p-0" id="imgeDiv">
      <img src={"http://localhost:3000/"+data.image} className="img-fluid rounded-start w-100 landinpage-grian-card-img" alt={data.image} />
    </div>
    <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
      <div className="card-body">
        <div className="d-flex justify-content-between">
        <h4 className="card-title darkgreen fs-4">{data.grainname}</h4>
          {data.grain==="inorganic"? <span className="badge bg-warning fs-6">Inorganic</span>: <span className="badge bg-success fs-6">Organic</span>}
        </div>
        <p className="card-text darkgreen fs-5 m-0"><i className="bi bi-geo-alt text-danger"></i>&nbsp;{data.city},{data.state}</p>
   
        <p className="card-text darkgreen fs-5 m-0">
          Type: {data.graintype}
        </p>
        <p className="card-text darkgreen fs-5 m-0">
          Price: Rs.{data.price}/quintal
        </p>
        <p className="card-text darkgreen fs-5 m-0">
          Quantity:{data.quantity} quintal
        </p>
        <p className="card-text darkgreen fs-5 m-0">
          Shelf Life: {data.selflife} Month 
        </p>
        <p className="card-text darkgreen fs-5 m-0">
          Moisture Level: {data.moisturelevel}%
        </p>
        <p className="card-text darkgreen fs-5 m-0" style={{maxHeight:"40px",overflow:"scroll"}} >Description: {data.description}</p>
        {grain?
    <button className='btn btn-success w-100 mx-auto'>
  <Link to='/market/grainMarket' className='text-white text-decoration-none'>Explore More</Link>
</button>: <button className='btn btn-success mt-1 w-50 mx-auto' onClick={()=>{addTocarts(data._id)}}>
  <a className='text-white text-decoration-none'>Add to Cart</a>
</button>
  }
      </div>
    
    </div>
   
  </div>
</div>
</div>
)
  }):<h1 className='text-center'>There is no Grain available</h1>
}

        
    </>
  );
}
