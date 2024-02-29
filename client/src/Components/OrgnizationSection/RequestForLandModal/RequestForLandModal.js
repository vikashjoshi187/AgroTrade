import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import jscookie from "js-cookie"
import Swal from "sweetalert2";
import { requestForLand } from '../../../store/organizationSlice'

function RequestForLandModal(props) {
    const [show, setShow] = useState(false);
    const [bookRequest, setBookRequest] = useState(false);
    const { Land } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = (e) => {
        const dealer_email = jscookie.get("dealer_email");
        const { name, value } = e.target;
        setBookRequest({
            ...bookRequest,
             [name]: value.trim(),
             LandId: Land._id,
            dealer_email: dealer_email
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("request Going")
        requestForLand(bookRequest)
        .then((data) => {
            if (data.message === "success") {
              Swal.fire({
                position: "middle",
                icon: "success",
                title: " Request Successfully",
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

    return (
        <>
            <button type="button" className="btn btn-outline-success btn-sm" onClick={handleShow}> <i class="bi bi-plus-circle"></i>&nbsp;Book</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row w-100 m-0 g-0 ">
                        <div className="col-12" >
                            <form id="orgExpert" encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="row m-0 w-100">
                                    <div className="col-12 col-md-12 p-2 " id="fee-video">
                                        <label htmlFor="validationServer01" className="form-label midgreen">Grain Name</label>                                       
                                       <select name="grainName"  className="form-control form-control-sm"      id="grainName" onChange={getData} required >
                                           <option value={null}>Select Grain</option>
                                       {
                                         Land.suitableFor.map((Grain,index)=>{
                                            return ( 
                                                   <option key={index} value={Grain}>{Grain}</option>)
                                         })
                                         }
                                       </select>
                                       
                                       
                                        <div className="valid-feedback">
                                            Correct Grain Name!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Invalid Grain Name!!
                                        </div>
                                    </div>

                                    <div className=" col-12 col-md-12 p-2">
                                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Quantity</label>
                                        <input name="quantity" type="number" className="form-control form-control-sm"
                                            id="quantity" placeholder="Enter Quantity in Quaintal" onChange={getData} required min={0} />
                                        <div className="valid-feedback">
                                            Coorect Quantity!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Invalid Quantity!!
                                        </div>
                                    </div>
                                    <div className=" col-12 col-md-12 p-2  " id="fee-chat">
                                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Time Duration</label>
                                        <input name="timeDuration" type="number" className="form-control form-control-sm" min={0} onChange={getData} id="consultingTime" placeholder="Enter Time in Month" required />
                                        <div className="valid-feedback">
                                            Correct  Time!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Invalid Time !!
                                        </div>
                                    </div>
                                    <div className=" col-12 col-md-6 mt-1  p-1">
                                        <div className="d-grid gap-2">
                                            <button
                                                type="reset"
                                                name=""
                                                id=""
                                                className="btn btn-danger"
                                            >
                                                Reset
                                            </button>
                                        </div>

                                    </div>

                                    <div className=" col-12 col-md-6 mt-1 mb-1 p-1">
                                        <div className="d-grid gap-2">
                                            <button
                                                type="submit"
                                                name=""
                                                id=""
                                                className="btn btn-success"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RequestForLandModal;