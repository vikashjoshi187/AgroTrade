import Alert from 'react-bootstrap/Alert';
import { REQUESTED_URL } from '../../../../urls';
import AgreementModal from './Agreemnet/Agreemnet';
import { useState,useEffect } from 'react';
import { removeAgreement } from '../../../../store/organizationSlice';
import { format } from 'timeago.js';
function ContractDetailCard(props) {
    const {contract}=props;
    const [TotalPrice,setTotalPrice]=useState(0)

    useEffect(()=>{
      var price=parseFloat(contract.contractDetails.price)*parseFloat(contract.contractDetails.quantity);
       var price1 =((25/100)*price)+price;
       console.log("This is the contrct"+contract);
       setTotalPrice(price1)
     
  },[])



  function removeContract() {
    removeAgreement({_id:contract._id})   
  }
    return ( <>
    <div className=' col-12 col-md-6  p-0' >
    <div class="card m-2 border-primary " >
  <div class="row g-0">
    <div  class="col-12 col-md-12  col-lg-12 col-xl-5 bg-black" style={{height:"50vh"}}>
      <img  src={`${REQUESTED_URL}/${contract.landDetails.image}`} class="img-fluid h-100 w-100 rounded-start contractagri-Card-img" alt="..."/>
    </div>
    <div class="col-12 col-md-12 col-lg-12 col-xl-7">
      <div class="card-body">
        <h2 class="card-title mb-0">{contract.landDetails.landTitle}</h2>
        <h5 class="">{contract.contractDetails.grainName}</h5>

      <div className='w-100 d-flex'>
        <div className='w-50' >
          <h5 class="">Price {contract.contractDetails.price}</h5>
        </div>
        <div className='w-50' >
          <h5 class="">Quantity {contract.contractDetails.quantity}</h5>
        </div>
      </div>

      <div className='w-100 d-flex'>
        <div className='w-50' >
          <h5 class="">Area {contract.landDetails.area}</h5>
        </div>
        <div className='w-50' >
          <h5 class="">Rent {contract.landDetails.rent}/Month</h5>
        </div>
      </div>

      <div className='w-100 d-flex'>
        <div className='w-50' >
          <h5 class="">Time Duration {contract.contractDetails.timeDuration}</h5>
        </div>
      </div>
       
        <h5 class="">Address  {contract.landDetails.address},{contract.landDetails.zipCode},{contract.landDetails.state}  </h5>
        <h5 class=""></h5> 
     {contract.contractDetails.userStatus?  
         <Alert variant="success" className='p-2'>
         <p className='fs-5 mb-0'>Congrats!!! Land Owner Accept Your Request </p>
         <p className='fs-5 mb-0 '>Message :  {contract.contractDetails.description}</p>
      
         <p className="mb-0 text-end">
         {format(contract.contractDetails.updatedAt)}
         </p>
       </Alert>
       :contract.contractDetails.userStatus==undefined?   
       
       <Alert variant="warning">
      <p className='fs-5 mb-0'>Land Owner Has not Responded to your Request yet!!</p>

       <p className="mb-0 text-end">
       {format(contract.contractDetails.updatedAt)}
       </p>
     </Alert>:<Alert variant="danger">
        <p className='fs-5 mb-0'>Sorry!! Land Owner Declined Your Request</p>
        <p className='fs-5 mb-0 '>Message :  {contract.contractDetails.description}</p>
         <p className="mb-0 text-end ">
         {format(contract.contractDetails.updatedAt)}
         </p>
       </Alert>
     }

     {
      contract.contractDetails.userStatus?<AgreementModal contract={contract}/>:<button className='btn btn-outline-danger w-100'  onClick={removeContract} type="button">Remove Contract</button>
     }
     {/* <button className='btn btn-outline-danger w-100 mt-2'  onClick={removeContract} type="button">Remove Contract</button> */}
      </div>
    </div>

  </div>
  <p className="mb-0 text-end text-muted me-3">
       Request created  {format(contract.contractDetails.createdAt)}
   </p>
</div>
    </div>
    </> );
}

export default ContractDetailCard;



