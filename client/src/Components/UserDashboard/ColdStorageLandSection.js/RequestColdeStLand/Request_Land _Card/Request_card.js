import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { declineColdStRequest, acceptColdStRequest } from "../../../../../store/userSlice.js"
import { useState, useEffect } from 'react';
import AgreementModal from '../Agreemnet/Agreemnet.js';
import Swal from "sweetalert2";
function Request_card(props) {
  const { request } = props;
  console.log("request", request);
  return (<>
    <div className="card bg-white overflow-hidden mt-2 p-0" >
      <div className="row m-0 w-100">
        <div className=" col-md-12 col-lg-2  d-flex justify-content-center   aling-items-center bg-midgreen pt-4 " >
          <img className="rounded aling-self-center  w-100 mt-5" src={`http://localhost:3000/${request.org.org_image}`} alt={request.org.org_image} height={"170px"} />
        </div>
        <div className=" col-md-12 col-lg-5 p-3" >
          <h2 className=" text-start darkgreen" ><i class="bi bi-buildings"></i>&nbsp;{request.org.company_name} &nbsp; <span className="fs-5" >{request.org.verify_status ? <span className="text-succcess" ><i class="bi bi-check-lg "></i>&nbsp;Varified</span> : <span className="text-danger"><i class="bi bi-x-circle-fill "></i>&nbsp;Not varified </span>}</span> </h2>
          <h5 className=" text-start darkgreen">Reg name: {request.org.reg_name}</h5>
          <h5 className=" text-start darkgreen">Reg number: {request.org.reg_number}</h5>
          <h5 className=" text-start darkgreen" ><i class="bi bi-geo-fill"></i>&nbsp;{request.org.address + " " + request.org.city + "," + request.org.state + "," + request.org.zip_code}</h5>
          <h5 className=" text-start darkgreen"><i class="bi bi-envelope-fill"></i>&nbsp;{request.org.org_email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="bi bi-buildings"></i>&nbsp;Org type: {request.org.org_type}</h5>
          <h5 className="fs-5 darkgreen" style={{ maxWidth: "75%", overflow: "scroll" }}>Description: {request.org.org_description}</h5>
        </div>

        <div className=" col-md-12 col-lg-2  ps-3 pt-4">
          <h4 className="text-start" ><i class="bi bi-person-circle"></i>&nbsp;Dealer details:</h4>
          <h5 className="text-start fs-6"><i class="bi bi-person-circle"></i>&nbsp;Name: {request.org.dealer_name}</h5>
          <h5 className="text-start fs-6"><i class="bi bi-envelope-fill"></i>&nbsp;{request.org.dealer_email}&nbsp;</h5>
          <h5 className="text-start fs-6"><i class="bi bi-telephone-fill"></i>&nbsp;{request.org.dealer_contact}</h5>
        </div>
        <div className=" col-md-12 col-lg-3 p-3 ">
          <h5 className="darkgreen text-start" ><i class="bi bi-geo-fill"></i>&nbsp;Requested Land address: {request.land.address}</h5>


          <h5 className="darkgreen" ><i class="bi bi-clock"></i>&nbsp;Time Duration: {request._doc.timeDuration} Month</h5>
          {
            request._doc.hasOwnProperty("orgSign") && request._doc.userStatus?
           <> <AgreementModal contract={request} />
            <Decline_req_modal request={request} /></>
            :
            <><Accep_req_modal request={request} />
            <Decline_req_modal request={request} /></>

          }
        </div>

      </div>
    </div>

  </>);
}

export default Request_card;


function Accep_req_modal(props) {
  const { request } = props;
  const [show, setShow] = useState(false);
  const [message, setmessage] = useState("")
  const [price, setPrice] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setPrice(parseFloat(request.land.rent) * parseFloat(request._doc.timeDuration));
}, [request.land.rent, request._doc.timeDuration]);

  function AcceptRequests() {
    
    const acceptObj = { _id: request._doc._id, description: message, action: true, price: price };
    acceptColdStRequest(acceptObj).then((result) => {
      if (result.data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Request Accepted Successfully",
          showConfirmButton: false,
          timer: 2000
        });

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Something went Wrong",
          text: "Unavailable to Accept. Please try Again...",
        });
      }

    })

  }
  return (
    <>

      <button className="w-100 btn btn-outline-success mt-2" onClick={handleShow} type="button">Accept</button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Accept Booking Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className='darkgreen' >Price for the agreement</h5>
          <div class="input-group mb-3">
            <div class="input-group-text" id="btnGroupAddon">$.</div>
            <input  type="number" value={ parseFloat(request.land.rent)*parseFloat(request._doc.timeDuration)} class="form-control" readOnly min={1000} />
          </div>

          <h5 className='darkgreen' >Enter any Query</h5>
          <textarea onChange={(e) => { setmessage(e.target.value) }} name='description' className='form-control' rows="5" cols="10" placeholder='Wirte reason here...'></textarea>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={() => { handleClose(); AcceptRequests() }}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function Decline_req_modal(props) {
  const { request } = props;
  const [showd, setShowd] = useState(false);
  const handleClosed = () => setShowd(false);
  const handleShowd = () => setShowd(true);
  const [description, setDes] = useState("");

  function delineRequest() {
    const declineObj = { _id: request._doc._id, description: description, action: false };
    console.log("helloo", declineObj);
    declineColdStRequest(declineObj).then((result) => {
      if (result.data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Request Declined Successfully",
          showConfirmButton: false,
          timer: 2000
        });

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Something went Wrong",
          text: "Unavailable to Decline. Please try Again...",
        });
      }

    })

  }
  return (
    <>
      <button className="w-100 btn btn-outline-danger mt-2" onClick={handleShowd} type="button">Decline</button>


      <Modal show={showd} onHide={handleClosed}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Decline Booking Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='darkgreen' >Type valid reason for Decline</h4>
          <textarea onChange={(e) => { setDes(e.target.value) }} name='description' className='form-control' rows="5" cols="10" placeholder='Wirte reason here...'></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="outline-success" onClick={() => { handleClosed(); delineRequest() }}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



