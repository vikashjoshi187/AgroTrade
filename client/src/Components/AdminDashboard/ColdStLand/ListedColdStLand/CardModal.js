import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import View from "./View.js";
import "./CardModal.css"
function CardModal(props) {
    const { Data } = props;
    var fromDate = new Date(Data.avilableFrom)
    const dateFrom = fromDate.getDate() + "/" + fromDate.getMonth() + 1 + "/" + fromDate.getFullYear();
    console.log("This is the Date" + dateFrom);

    var fromTill = new Date(Data.avilableTill)
    const dateTill = fromTill.getDate() + "/" + fromTill.getMonth() + 1 + "/" + fromTill.getFullYear();
    console.log("This is the Date" + dateTill);
    const [lgShow, setLgShow] = useState(false);
    return (
        <>

            <button type="button" onClick={() => setLgShow(true)} name="" id="" className="btn btn-warning btn-sm" >&nbsp;See Details</button>

            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        See Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0" id="modal-body">
                    <div className="card w-100 p-2">
                        <div className="row g-0">
                            <div className="col-md-4 bg-dark" id="imgeDiv">
                                <img src={"http://localhost:3000/" + Data.image} className="img-fluid rounded-start w-100 card-image" alt={Data.image} />
                            </div>
                            <div className="col-md-5">
                                <div className="card-body">
                                    <div className="p-1" >
                                        <div className="d-flex justify-content-between" >
                                            <h3 className="card-title darkgreen ">{Data.landTitle}</h3> <div>
                                            </div>
                                        </div>
                                        <h5 className="darkgreen">
                                            <span className="text-danger">
                                                <i className="bi bi-geo-alt text-danger"></i>
                                                &nbsp;{Data.city + " " + Data.state}
                                            </span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                            <span className="text-primary">
                                                <i className="bi bi-rulers"></i>&nbsp;Size :{Data.area} acres
                                            </span>{" "}
                                        </h5>

                                        <h5 className="darkgreen">
                                            Condition: {Data.infrastructure}
                                        </h5>

                                        <h5 className="darkgreen">
                                            Address: {Data.address},{Data.pincode}
                                        </h5>
                                        <h5 className="card-text text-break darkgreen  landparag">
                                            Description: {Data.description}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  p-2">
                                <div className="row m-0 w-100 d-flex flex-column">
                                    <div className="col-12 d-flex justify-content-end pt-3 pe-3">
                                        {Data.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

                                    </div>
                                    <div className="col-12  midgreen">
                                        <h5>
                                            Rent: {Data.rent}/Month
                                        </h5>

                                        <h5 className="darkgreen ">
                                            From: {dateFrom}
                                        </h5>

                                        <h5 className="darkgreen">
                                            To: {dateTill}
                                        </h5>
                                        <div className="d-grid gap-2">
                                            <View image360={Data.image360} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default CardModal;