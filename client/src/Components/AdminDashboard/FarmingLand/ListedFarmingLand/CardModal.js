import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import View from "./View.js";
import "./CardModal.css"
function CardModal(props) {
    const { AgriLand } = props;
    var fromDate = new Date(AgriLand.avilableFrom)
    const dateFrom = fromDate.getDate() + "/" + fromDate.getMonth() + 1 + "/" + fromDate.getFullYear();
    console.log("This is the Date" + dateFrom);

    var fromTill = new Date(AgriLand.avilableTill)
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
                    <div className="card mb-4 w-100 p-0">
                        <div className="row g-0">
                            <div className="col-md-4 bg-dark" id="imgeDiv">
                                <img src={"http://localhost:3000/" + AgriLand.image} className="img-fluid rounded-start w-100 card-image" alt="..." />
                            </div>
                            <div className="col-md-5">
                                <div className="card-body">
                                    <div className="p-1" >
                                        <div className="d-flex justify-content-between" >
                                            <h3 className="card-title darkgreen ">{AgriLand.landTitle}</h3> <div>
                                                {AgriLand.agriType == "Organic" ? <span className="badge bg-success fs-6 ">Organic</span> : <span className="badge bg-warning fs-6 ">Inorganic</span>}
                                            </div>
                                        </div>
                                        <h5 className="darkgreen">
                                            <span className="text-danger">
                                                <i className="bi bi-geo-alt text-danger"></i>
                                                &nbsp;{AgriLand.city + " " + AgriLand.state}
                                            </span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                            <span className="text-primary">
                                                <i className="bi bi-rulers"></i>&nbsp;Size :{AgriLand.area} acres
                                            </span>{" "}
                                        </h5>
                                        <h5 className="darkgreen">
                                            Soil Type: {AgriLand.soilType}
                                        </h5>
                                        <h5 className="darkgreen">
                                            Condition: {AgriLand.infrastructure}
                                        </h5>

                                        <h5 className="darkgreen">
                                            Address: {AgriLand.address},{AgriLand.zipCode}
                                        </h5>
                                        <h5 className="darkgreen">
                                            Suitable For: {AgriLand.suitableFor}
                                        </h5>
                                        <h5 className="card-text text-break darkgreen  landparag">
                                            Description: {AgriLand.description}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  p-2">
                                <div className="row m-0 w-100 d-flex flex-column">
                                    <div className="col-12 d-flex justify-content-end pt-3 pe-3">
                                        {AgriLand.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

                                    </div>
                                    <div className="col-12  midgreen">
                                        <h5>
                                            Rent: {AgriLand.rent}/Month
                                        </h5>
                                        <h5 className="darkgreen ">
                                            From: {dateFrom}
                                        </h5>

                                        <h5 className="darkgreen">
                                            To: {dateTill}
                                        </h5>
                                        <div className="d-grid gap-2">
                                            <View image360={AgriLand.image360} />
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