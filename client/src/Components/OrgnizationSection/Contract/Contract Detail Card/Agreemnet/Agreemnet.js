import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Digitalsignature from '../../../../DigitalSignature/Digitalsignature';
import "./Agreemnet.css"
import logo from "../../../../../Images/Agro-Trade-logo.png"
import { creteAgreement } from "../../../../../store/organizationSlice.js"
import { getPartiesData } from '../../../../../store/organizationSlice.js';
function AgreementModal(props) {
  const [show, setShow] = useState(false);
  const { contract } = props;
  const [enable, setEnable] = useState(false);
  const [orgSign, setSign] = useState('')
  const [totalPrice, settotalPrice] = useState(0)
  const [formattedDateS, setformattedDate] = useState('')
  const [agreementObj, setagreementObj] = useState({})
  const [dataf, setDataF] = useState({})

  function creteAgree() {
    var Obj = {
      _id: contract._id,
      orgSign,
      totalPrice,
      agreementDate: formattedDateS
    }
    setagreementObj(Obj)
    console.log("This is the agree Obj", Obj);
    creteAgreement(Obj).then((data) => {
      console.log('data', data);

      if (data.message === "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "  Successfully",
          showConfirmButton: false,
          timer: 2000
        });

        // Close the modal after successful addition
        setShow(false);

        // Fetch grains or perform any other necessary actions

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unable to Request. Please try Again..."
        });
        setShow(false);
      }
    })
      .catch((err) => {
        console.log("err", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unable to Request. Please try Again..."
        });
      });
  }
  useEffect(() => {
    console.log("Fetching parties data...");
    getPartiesData().then((data) => {
      console.log("Fetched parties data:", data);
      const matchingData = data.find(item => item._doc._id === contract._id);
      if (matchingData) {
        console.log("This is matching data",matchingData);
        setDataF(matchingData);
      } else {
        console.log("No matching data found.");
      }
    }).catch(error => {
      console.error("Error fetching parties data:", error);
    });
  }, [contract._id]);






  function EanbleButoon() {
    setEnable(!enable)

    if (!enable) {

      document.getElementById("sign-div").classList.remove("d-none")
    }
    else {

      document.getElementById("sign-div").classList.add("d-none")
    }

  }
  function getSignature(signPath) {
    console.log("This is the Sign Path", signPath);
    setSign(signPath)
    if (setSign) {
      document.getElementById("submitBtn").classList.remove("d-none")
    }
    else {
      document.getElementById("submitBtn").classList.add("d-none")
    }
  }

  function clearSignature(signPath) {
    setSign("")
    document.getElementById("submitBtn").classList.add("d-none")
  }



  useEffect(() => {
    var price = parseFloat(contract.contractDetails.price) * parseFloat(contract.contractDetails.quantity);
    var price1 = ((25 / 100) * price) + price;
    console.log("This is the price one" + price1);
    settotalPrice(price1)
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
    const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setformattedDate(formattedDate)
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <>

      <button className='btn  btn-outline-success w-100' type="" onClick={() => setShow(true)}>Create Agreement</button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="AgreementModal-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="AgreementModal-custom-modal-styling-title" className='darkgreen'>
            Agreement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-1'>
          {
            dataf!={} && show  ?
              
                <div className='w-100 h-100' id='agreement-page'>
                  <div className='row w-100 m-0' >
                    <div className='col-12 col-lg-3' >
                      <div className='w-100 d-flex justify-content-center' >
                        <img className='w-50 align-self-center' src={logo} alt="AgroTrade" />
                      </div>
                      <h2 className='text-center darkgreen' >Agro Trade</h2>
                    </div>
                    <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center' >
                      <h1 className='darkgreen'>Agriculture Land Agreement</h1>
                    </div>
                    <div className='col-12' >
                      <h3 className='text-center darkgreen mt-4 mb-3' >Agreement Between ORG name and Farmer Name</h3>

                      <h4 className='darkgreen' >Agreement Description</h4>
                      <p className='darkgreen' >This agreement is made effective as of contract date, between ORG name,
                        located at ADDRESS, hereinafter referred to as the "Organization", and
                        FARMER NAME, residing at ADDRESS, hereinafter referred to as the "Farmer".
                      </p>


                      <ol className='darkgreen' >
                        <h5 className='' style={{ fontWeight: "600" }}>1. Land and Crop Usage:</h5>
                        <li>The Farmer agrees to provide AREA Acres for agricultural purposes to the Organization.</li>
                        <li> The Farmer agrees to cultivate and maintain crops on the provided land, specifically GRAIN NAME during the term of this agreement.</li>
                        <li>The Organization shall have the right to inspect the land and crops periodically to ensure compliance with this agreement.</li>
                      </ol>

                      <ol className='darkgreen'>
                        <h5 style={{ fontWeight: "600" }}>2. Rent and Grain Fee:</h5>
                        <li> The Organization shall make the payment for the grains within DURATION Month of the harvest.</li>
                      </ol>

                      <ol className='darkgreen'>
                        <h5 style={{ fontWeight: "600" }}>3. Term and Termination:</h5>
                        <li>This agreement shall commence on DATE, and shall continue for a period of DURATION Month, unless terminated earlier as provided herein.</li>
                      </ol>

                      <ol className='darkgreen'>
                        <h5 style={{ fontWeight: "600" }}>4. Price and Total Amount:</h5>
                        <li> The total price <b> Rs.{totalPrice} </b>for the land usage and crop production services shall be calculated based on the agreed-upon rent and grain fee, as specified in Sections 2.1 and 2.2 of this agreement.</li>
                        <li>The total amount payable by the Organization to the Farmer shall be determined at the end of each harvest period.</li>
                      </ol>

                      <ol className='darkgreen'>
                        <h5 style={{ fontWeight: "600" }}>5.General Provisions:</h5>
                        <li>This agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements, whether written or oral.</li>
                        <li> This agreement may only be modified or amended by a written instrument signed by both parties.</li>
                      </ol>
                      <hr />
                    </div>

                    <div className='col-12 d-flex justify-content-start ps-5'>
                      <input type="checkbox" id='agree' onClick={EanbleButoon} className='form-check-input' name="agree" value="" required />
                      &nbsp; &nbsp;<label className='form-check-label fs-5 darkgreen' for="agree">I Accept Terms and conditions</label>
                    </div>

                    <div className='col-12 col-lg-6 p-2 '>
                      <div className='d-none w-100' id='sign-div'>
                        <Digitalsignature accepterName={"Organization  Signature"} clearSignature={clearSignature} getSignature={getSignature} />

                      </div>
                    </div>
                    <div className='col-12 col-lg-6 p-2'>
                      <img src="" alt="" />
                      <hr />
                      <h5 className="text-center darkgreen" >Farmer Signature</h5>
                    </div>

                  </div>

                </div>
               : 
                <div> hhhhhhh </div>
              
          }

        </Modal.Body>
        <Modal.Footer className='p-1' >
          <button type="button" onClick={creteAgree} className='btn btn-outline-success d-none' id='submitBtn'>Submit Agreement</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgreementModal;



{/* <h5 class="card-title mb-0">Land name: {contract.landDetails.landTitle}</h5>
        <h5 class="">Requested grain: {contract.contractDetails.grainName}</h5>
        <h5 class="">Owner Price: {contract.contractDetails.price}</h5>
        <h5 class="">Quantity: {contract.contractDetails.quantity}</h5>
        <h5 class="">Total Price: {totalPrice}</h5>
        <h5 class="">Time Duration: {contract.contractDetails.timeDuration}</h5>
        <h5 class="">Area: {contract.landDetails.area}</h5>
        <h5 class="">Rent: {contract.landDetails.rent}/Month</h5>
        <h5 class="">Address:  {contract.landDetails.address},{contract.landDetails.zipCode},{contract.landDetails.state}  </h5>
      
       */}
