import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import jscookie from "js-cookie"
import Swal from "sweetalert2";
import { requestForLandColdSt } from '../../../store/organizationSlice'

function ReqForColdStLand(props) {
    const [show, setShow] = useState(false);
    const [bookRequest, setBookRequest] = useState(false);
    const { ColdSt } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = (e) => {
        const dealer_email = jscookie.get("dealer_email");
        const { name, value } = e.target;
        setBookRequest({
            ...bookRequest,
            [name]: value.trim(),
            LandId: ColdSt._id,
            dealer_email: dealer_email
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        requestForLandColdSt(bookRequest).then((result) => {
            console.log("ddcc", result);
            if (result.data.message == "success") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Request Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                handleClose();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Something went Wrong",
                    text: "Unavailable to request. Please try Again...",
                });
                handleClose();
            }

        })
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
                                        <label htmlFor="validationServer01" className="form-label midgreen">Time Duration</label>
                                        <input name="timeDuration" type="number" className="form-control form-control-sm"
                                            id="timeDuration" placeholder="Enter Time Duration in Month" onChange={getData} min={0} required />
                                        <div className="valid-feedback">
                                            Correct Time Duration!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Invalid Time Duration!!
                                        </div>
                                    </div>

                                    <div className=" col-12 col-md-12 p-2">
                                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Item To Be Stored ?</label>
                                        <input name="itemType" type="text" className="form-control form-control-sm"
                                            id="itemType" placeholder="Enter Item To Be Stored ?" onChange={getData} required />
                                        <div className="valid-feedback">
                                            Coorect Quantity!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Invalid Quantity!!
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

export default ReqForColdStLand;