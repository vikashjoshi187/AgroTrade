import Alert from 'react-bootstrap/Alert';
import { REQUESTED_URL } from '../../../../urls';
 import AgreementModal from './Agreemnet/Agreemnet';
import { removeAgreementColdst } from '../../../../store/organizationSlice';
import { format } from "timeago.js"
import { useEffect, useState } from 'react';
import "./ContractCdStDetailCard.css"
import Swal from 'sweetalert2';
import { payColdStorageAmount } from '../../../../store/organizationSlice';
function ContractCdStDetailCard(props) {
  const { contract } = props;
  function removeContract() {
    removeAgreementColdst({ _id: contract._id })
  }

  function payAmount() {
    payColdStorageAmount(contract._id).then((data)=>{
      if(data.message=="Paid"){
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Amount Paid  Successfully",
          showConfirmButton: false,
          timer: 2000
      });
      }
    else{

      Swal.fire({
        position: "middle",
        icon: "error",
        title: "Error occured while payment",
        showConfirmButton: false,
        timer: 2000
    });
      
    }

    })
  }

  return (<>
    <div className=' col-12 col-md-6  p-0' >
      <div class="card m-2 border-primary " >
        <div class="row g-0">
          <div class="col-12 col-md-12  col-lg-12 col-xl-5 bg-black" style={{ height: "50vh" }}>
            <img src={`${REQUESTED_URL}/${contract.landDetails.image}`} class="img-fluid contractagri-Card-img w-100 rounded-start" alt="..." />
          </div>
          <div class="col-12 col-md-12 col-lg-12 col-xl-7">
            <div class="card-body">
              <div className='w-100 d-flex'>
                <div className='w-50' >
                  <h5 class="">Price {contract.contractDetails.price}</h5>
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

              <h5 class="">Address  {contract.landDetails.address},{contract.landDetails.pincode},{contract.landDetails.state}  </h5>
              <h5 class=""></h5>
              {contract.contractDetails.userStatus ?
                <Alert variant="success" className='p-2'>
                  <p className='fs-5 mb-0'>Congrats!!! Land Owner Accept Your Request </p>
                  <p className='fs-5 mb-0 '>Message :  {contract.contractDetails.description}</p>

                  <p className="mb-0 text-end">
                    {format(contract.contractDetails.updatedAt)}
                  </p>
                </Alert>
                : contract.contractDetails.userStatus == undefined ?
                  <Alert variant="warning">
                    <p className='fs-5 mb-0 '>Land Owner Has not Responded to your Request yet!!</p>

                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to keep things
                      nice and tidy.
                    </p>
                    <p className="mb-0 text-end ">
                      {format(contract.contractDetails.updatedAt)}
                    </p>
                  </Alert> : <Alert variant="danger">
                    <p className='fs-5 mb-0 '>Sorry!! Land Owner Declined Your Request </p>
                    <p className='fs-5 mb-0 '>Message :  {contract.contractDetails.description}</p>
                    <p className="mb-0 text-end ">
                      {format(contract.contractDetails.updatedAt)}
                    </p>
                  </Alert>
              }

              {
                contract.contractDetails.userStatus &&contract.contractDetails.orgSign && contract.contractDetails.farmerSign ?  <button className='btn btn-outline-primary w-100 mt-2' onClick={payAmount} type="button">Pay</button> : contract.contractDetails.userStatus?
                 <AgreementModal contract={contract}/>
                :<></>
              }
            
              <button className='btn btn-outline-danger w-100 mt-2' onClick={removeContract} type="button">Remove Contract</button>
            </div>
          </div>

        </div>
        <p className="mb-0 text-end text-muted me-3">
          Request created  {format(contract.contractDetails.createdAt)}
        </p>
      </div>
    </div>
  </>);
}

export default ContractCdStDetailCard;



