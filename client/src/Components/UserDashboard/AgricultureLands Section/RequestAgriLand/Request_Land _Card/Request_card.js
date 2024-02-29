import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  declineRequest,
  acceptRequest,
} from "../../../../../store/userSlice.js";
import { useState } from "react";
import Swal from "sweetalert2";
import "./Request_card.css";
import AgreementModal from "../Agreemnet/Agreemnet.js";
function Request_card(props) {
  const { request } = props;
  console.log("th9is is the request ", request);
  console.log(request._doc.hasOwnProperty("orgSign"));
  return (
    <>
      <div className="col-12  col-md-6 p-2">
        <div className="card bg-white overflow-hidden  p-0">
          <div className="row m-0 w-100">
            <div className=" col-12   d-flex justify-content-center aling-items-center overflow-hidden ">
              <img
                className="rounded aling-self-center request-Agriland-cardimage   "
                src={`http://localhost:3000/${request.org.org_image}`}
                alt={request.org.org_image}
              />
            </div>

            <div className=" col-12  col-md-6 p-3">
              <h3 className=" text-start darkgreen">
                <i class="bi bi-buildings"></i>&nbsp;{request.org.company_name}{" "}
                &nbsp;{" "}
                <span className="fs-5">
                  {request.org.verify_status ? (
                    <span className="text-succcess">
                      <i class="bi bi-check-lg "></i>&nbsp;Varified
                    </span>
                  ) : (
                    <span className="text-danger">
                      <i class="bi bi-x-circle-fill "></i>&nbsp;Not varified{" "}
                    </span>
                  )}
                </span>{" "}
              </h3>
              <p className=" text-start darkgreen fs-5 mb-0">
                Reg name: {request.org.reg_name}
              </p>
              <p className="darkgreen text-start fs-5 mb-1">
                <i class="bi bi-geo-fill"></i>&nbsp;Land address:{" "}
                {request.land.address}
              </p>
              <p className="darkgreen fs-5 mb-1">
                <i class="fa-solid fa-wheat-awn"></i>&nbsp;Requested grain:{" "}
                {request._doc.grainName}
              </p>
              <p className="darkgreen fs-5 mb-1">
                <i class="fa-solid fa-weight-scale"></i>&nbsp;Requested
                Quantity: {request._doc.quantity} Quintal
              </p>
              <p className="darkgreen fs-5 mb-1">
                <i class="bi bi-clock"></i>&nbsp;Time Duration:{" "}
                {request._doc.timeDuration} Month
              </p>
            </div>
            <div className=" col-12 col-md-6  pt-3 "
              style={{ overflow: "scroll" }}
            >
              <h5 className="m-2 darkgreen">Description:</h5>
              <p
                className="darkgreen fs-5 m-2  w-100 "
                style={{ overflow: "scroll" }}
              >
                {request.org.org_description}
              </p>
              <div className="p-2">
              <SeeContactDetails request={request} />
              {request._doc.hasOwnProperty("orgSign") &&
              request._doc.userStatus ? (
                <>
                  {" "}
                  <AgreementModal contract={request} />
                  <Decline_req_modal request={request} />
                </>
              ) : (
                <>
                  <Accep_req_modal request={request} />
                  <Decline_req_modal request={request} />
                </>
              )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Request_card;

{
  /*

 */
}

function Accep_req_modal(props) {
  const { request } = props;
  const [show, setShow] = useState(false);
  const [message, setmessage] = useState("");
  const [price, setPrice] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function AcceptRequests() {
    const acceptObj = {
      _id: request._doc._id,
      description: message,
      action: true,
      price: price,
    };
    acceptRequest(acceptObj).then((result) => {
      console.log("ddcc");
      if (result.data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Request Accepted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went Wrong",
          text: "Unavailable to Accept. Please try Again...",
        });
      }
    });
  }
  return (
    <>
      <button
        className="w-100 btn btn-outline-success mt-2 btn-sm"
        onClick={handleShow}
        type="button"
      >
        Accept
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Accept Booking Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="darkgreen">Enter price for the agreement</h5>
          <div class="input-group mb-3">
            <div class="input-group-text" id="btnGroupAddon">
              Rs.
            </div>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="number"
              class="form-control"
              min={1000}
              placeholder="Enter price here"
            />
          </div>

          <h5 className="darkgreen">Type valid reason for Decline</h5>
          <textarea
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            name="description"
            className="form-control"
            rows="5"
            cols="10"
            placeholder="Wirte reason here..."
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              handleClose();
              AcceptRequests();
            }}
          >
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
    const declineObj = {
      _id: request._doc._id,
      description: description,
      action: false,
    };
    console.log("helloo", declineObj);
    declineRequest(declineObj).then((result) => {
      // console.log("ddcc",data);
      if (result.data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Request Declined Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went Wrong",
          text: "Unavailable to Decline. Please try Again...",
        });
      }
    });
  }
  return (
    <>
      <button
        className="w-100 btn btn-outline-danger mt-2 btn-sm"
        onClick={handleShowd}
        type="button"
      >
        Decline
      </button>

      <Modal show={showd} onHide={handleClosed}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            Decline Booking Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="darkgreen">Type valid reason for Decline</h4>
          <textarea
            onChange={(e) => {
              setDes(e.target.value);
            }}
            name="description"
            className="form-control"
            rows="5"
            cols="10"
            placeholder="Wirte reason here..."
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              handleClosed();
              delineRequest();
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function SeeContactDetails(props) {
  const { request } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-outline-secondary btn-sm w-100 mb-1"
        type=""
      >
        See Contact Details
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className=" text-start darkgreen fs-5 mb-0">
            <i class="bi bi-geo-fill"></i>&nbsp;Org Address :{" "}
            {request.org.address +
              " " +
              request.org.city +
              "," +
              request.org.state +
              "," +
              request.org.zip_code}
          </p>
          <p className=" text-start darkgreen fs-5 mb-0">
            Reg number: {request.org.reg_number}
          </p>

          <p className=" text-start darkgreen fs-5 mb-1">
            <i class="bi bi-envelope-fill"></i>&nbsp;{request.org.org_email}
          </p>
          <h4 className="text-start">
            <i class="bi bi-person-circle"></i>&nbsp;Dealer details:
          </h4>
          <p className="text-start fs-5 mb-1">
            <i class="bi bi-person-circle"></i>&nbsp;Name:{" "}
            {request.org.dealer_name}
          </p>
          <p className="text-start fs-5 mb-1">
            <i class="bi bi-envelope-fill"></i>&nbsp;{request.org.dealer_email}
            &nbsp;
          </p>
          <p className="text-start fs-5 mb-1">
            <i class="bi bi-telephone-fill"></i>&nbsp;
            {request.org.dealer_contact}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
