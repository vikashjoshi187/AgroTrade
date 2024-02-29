import "./OrgdetailModal.css"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bgImg from "../../../../Images/banner5.jpeg"

function OrgdetailModal(props) {
    const {org}=props
  const [smShow, setSmShow] = useState(false);
  useEffect(()=>{
     console.log("This is the Orgnisation details",org);
  },[smShow])


  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2 btn btn-warning btn-sm">
      See Details
      </Button>
      <Modal
        size="xl"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="OrgdetailModal-modal-sizes-title-sm"
        backdrop="static"
       
      >
        <Modal.Header closeButton>
          <Modal.Title id="OrgdetailModal-modal-sizes-title-sm">
          <h3 className="ms-3 text-start darkgreen fw-bold"><i class="bi bi-buildings"></i>&nbsp;Organization Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
       
        <div className="row m-0 w-100">
            <div className=" col-md-12 col-lg-2  d-flex justify-content-center   aling-items-center bg-midgreen pt-4 " >
                <img   className="rounded aling-self-center  w-100 mt-5" src={`http://localhost:3000/${org.org_image}`} alt={org.org_image} height={"170px"}/>
            </div>
            <div className=" col-md-12 col-lg-5 p-3" >
                <h2 className="darkgreen" ><i class="bi bi-buildings"></i>&nbsp;{org.company_name}</h2>
                <h5>{org.verify_status? <span className="text-succcess" ><i class="bi bi-check-lg "></i>&nbsp;Varified</span> :<span className="text-danger"><i class="bi bi-x-circle-fill "></i>&nbsp;Not varified </span>}</h5>
                <h5>{org.status=="active"?<span className="text-success" >Status: {org.status}</span>:<span className="text-danger" >Status: {org.status}</span>}</h5>
                <h5 className="darkgreen">Reg name: {org.reg_name}</h5>
                <h5 className="darkgreen">Reg number: {org.reg_number}</h5>
                <h5 className="darkgreen"><i class="bi bi-envelope-fill"></i>&nbsp;Email: {org.org_email}</h5>
                <h5 className="darkgreen"><i class="bi bi-buildings"></i>&nbsp;Org type: {org.org_type}</h5>
               <p className="fs-5 darkgreen"><i class="bi bi-file-earmark-fill"></i>&nbsp;Description : {org.org_description}</p>
            </div>
            <div  className=" col-md-12 col-lg-5 p-3">
            <h5 className="darkgreen"><i class="bi bi-person-circle"></i>&nbsp;Owner name: {org.owner_name}</h5>
            <h5 className="darkgreen" ><i class="bi bi-geo-fill"></i>&nbsp;Address: {org.address+" "+org.city+","+org.state+","+org.zip_code}</h5>
           
           <div className="mt-5" >
            <h3><i class="bi bi-person-circle mt-5"></i>&nbsp;Dealer details:</h3>
            <h5 ><i class="bi bi-person-circle ms-2"></i>&nbsp;Dealer name: {org.dealer_name}
            </h5>
            <h5 className="ms-2" ><i class="bi bi-envelope-fill">email: {org.dealer_email} </i>&nbsp;</h5>
            <h5 className="ms-2" ><i class="bi bi-telephone-fill"></i>&nbsp;contact: {org.dealer_contact}</h5>
        
           </div>
        </div>
           
        </div>
       



        </Modal.Body>
      </Modal>

    </>
  );
}

export default OrgdetailModal;