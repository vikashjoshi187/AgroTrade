import "./Invoice.css"
import "./Invoice.js"
import logo from "../../Images/Agro-Trade-logo.png"
function Invoice() {
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
                <h5 className="text-capitalize" >Vikas Joshi</h5>
                <h5 className="text-capitalize" >Mission Compound ,Mandleshwar</h5>
                <h5 className="text-capitalize" >Indore (M.P),India</h5>
                <h5 className="" >vikashjoshi187@gmail.com</h5>
                <h5 className="text-capitalize" >+91 9977563445</h5>
            </div>
           
            <div className="col-12 col-md-9 col-lg-9 midgreen mb-3 d-flex justify-content-end" style={{fontStyle:"italic"}} >
             <div>
             <h5 className="text-capitalize">Invoice Number : #182832</h5>
               <h5 className="text-capitalize">Date : 22/01/2024</h5>
               <h5 className="text-capitalize">Amount Due: Rs. 12002</h5>
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
                            <th className="fs-6 p-2 text-center">Learn More</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>

                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati </td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                    

                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                    
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                    
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                    
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                    
                        <tr>
                        <td className="fs-6 text-center p-2">1</td>
                        <td className="fs-6 text-center p-2">Basmati Rice</td>
                        <td className="fs-6 text-center p-2">Good Basmati rice</td>
                        <td className="fs-6 text-center p-2">1200</td>
                        <td className="fs-6 text-center p-2">1</td> 
                        <td className="fs-6 text-center p-2"><button className="btn btn-sm btn-success" type="button">Learn More</button></td>                  
                        </tr>
                     </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr/>
            <h5 className="text-muted">*A finance charge of 1.5% will be applied on shipping.</h5>


            
        </div>
        </div>
        
    </div>
    </div>
    </> );
}

export default Invoice;
