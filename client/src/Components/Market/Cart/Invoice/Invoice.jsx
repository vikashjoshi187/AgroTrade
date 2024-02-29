import "./Invoice.css"
import "./Invoice.js"
import logo from "../../../../Images/Agro-Trade-logo.png"
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataonLoad } from "../../../../store/userSlice";
import jscookie from 'js-cookie';
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_REQUESTED_URL } from "../../../../urls";
import Swal from "sweetalert2";
function Invoice() {
    const token=jscookie.get('token');
    const email=jscookie.get('userEmail')

const dispatch=useDispatch();
    const location=useLocation();
    const [cart,serCart]=useState([]);
    const [order,setOrder]=useState({});
    const [user,setUser]=useState({});
    const [invoice,setInvoice]=useState('');

    const handleOrder=async()=>{
        let confirmOrder=false;
        console.log("handle order")
        Swal.fire({
            title: 'Confirm Payment?',
            icon:'info',
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: 'Cancel',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2 bg-success',
              denyButton: 'order-3',
            },
          }).then(async(result) => {
            if (result.isConfirmed) {
                confirmOrder=true;

                let day=Math.ceil(Math.random()*10)
                
            
                
                let payData={
                            order,
                            token,
                            carts:cart,
                            invoice,
                            day
                        }
                        console.log("payment data",payData);
            
                         let payResult=   await axios.post(USER_REQUESTED_URL+'/grainpayment',payData);
                         await window.open(payResult.data,'_blank')
                         
                         console.log("payment result",payResult);


            //   Swal.fire('Saved!', '', 'success');
            } else if (result.isDenied) {
                confirmOrder=false;
              Swal.fire('Cancel Order', '', 'info');
              
            }
          });
        
    }
    

    useEffect(()=>{
            (async()=>{
                console.log("token ",token);
                const udata= await dispatch(getDataonLoad({email,token}));
                setUser({...udata}.payload);
                console.log("user in invoice",udata.payload);
                const totalOrder=await axios.get(USER_REQUESTED_URL+'/getTotalorder/'+token);
                console.log("orders in invoice Component",totalOrder);
                if(totalOrder.status===204)
                {
                    setInvoice('Agro-'+101);
                }else if(totalOrder.status===200)
                {
                        setInvoice('Agro-'+100+totalOrder.data.order.length);
                }

            })();
        console.log("order in invoice component",location.state);
        serCart([...location.state.items]);
        setOrder({...location.state.order});
    },[]);

    return ( <>
    <div className="p-3" >
    <div className="container bg-white p-3" id="paper">
        <div className="row p-0 m-0 bg-white" >
            <div className="col-12 p-0 bg-success d-flex justify-content-center alig-items-center">
                <h2 className="text-center text-white m-0 mt-2">Invoice</h2>
            </div>
            <div className="col-4  col-sm-2  col-md-2 col-lg-2 d-flex justify-content-center p-2" >
                <img className="img img-reponsive w-100"  src={logo} alt="Agro Trade"  />    
            </div>
            <div className="col-8 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-end pe-3" >
                <h2 className="text-success  mt-5" >Agro Trade</h2>
            </div>

            <div className="col-12 col-md-3 col-lg-3 darkgreen mb-3" style={{fontStyle:"italic"}} >
                <h5 className="text-capitalize" >{user.name}</h5>
                <h5 className="text-capitalize" >{user.address}</h5>
                {/* <h5 className="text-capitalize" >{user.name}</h5> */}
                <h5 className="" >{user.email}</h5>
                <h5 className="text-capitalize" >{user.number}</h5>
            </div>

            <div className="col-12 col-md-9 col-lg-9 midgreen mb-3 d-flex justify-content-end" style={{fontStyle:"italic"}} >
             <div>
             <h5 className="text-capitalize">Invoice Number : {invoice}</h5>
               <h5 className="text-capitalize">Date: {new Date( Date.now()).getDate()+"/"+(new Date(Date.now()).getMonth()+1)+"/"+new Date(Date.now()).getFullYear()}</h5>
               <h5 className="text-capitalize">Total amount: {order.total}</h5>
               <h5 className="text-capitalize">Gst amount: {order.totalGst}</h5>
               <h5 className="text-capitalize">Shipping Charge: {order.shippingCharge}</h5>
               <h5 className="text-capitalize">Grand Total : {order.grandTotal}</h5>
             </div>
            </div>

            <div className="col-12 p-2" >
             <div className="max-height " >
                    
               
            <div class="card-body p-2">
                <div class="table-responsive">
                  <table class="table table-success  mb-0 ">
                    <thead className="sticky-top" >
                        <tr>
                            <th className="fs-6 p-2 text-center">S.No</th>
                            <th className="fs-6 p-2 text-center">Item Name</th>
                            <th className="fs-6 p-2 text-center">Description</th>
                            <th className="fs-6 p-2 text-center">Price</th>
                            <th className="fs-6 p-2 text-center">Quantity</th>
                            {/* <th className="fs-6 p-2 text-center">Learn More</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item,i)=>{
                                return(
                                    <tr>
                                    <td className="fs-6 text-center p-2">{i+1}</td>
                                    <td className="fs-6 text-center p-2">{item.grainname}</td>
                                    <td className="fs-6 text-center p-2">{item.productDescription}</td>
                                    <td className="fs-6 text-center p-2">{item.price}</td>
                                    <td className="fs-6 text-center p-2">{item.quantity}</td> 
                                    {/* <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                   */}
                                    </tr>
                                )
                            })
                        }

                       
                     </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-around ">
            <h5 className="text-muted">*Shipping charge of 100/Quintal will be applied on shipping.</h5>
                <button className="btn btn-warning px-3" onClick={handleOrder}>Pay Now</button>
            </div>
          

            
        </div>
        </div>
        
    </div>
    </div>
    </> );
}

export default Invoice;
