import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CardModal.css"
function CardModal(props) {
    const { Equipment } = props;
    const [lgShow, setLgShow] = useState(false);
    return (
        <>

            <button type="button" onClick={() => setLgShow(true)} name="" id="" className="btn btn-warning btn-sm" >&nbsp;See Details</button>

            <Modal
                size="lg"
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
                    <div className="w-100  p-1  d-flex justify-content-center  " >
                        <div className="card bg-light  w-100 p-0" style={{ borderRadius: "5px" }}>
                            <div className="row g-0">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6" id="imgeDiv">
                                    <img src={"http://localhost:3000/" + Equipment.image} className="img-fluid h-100 rounded-start w-100 card-image" alt={Equipment.image} />
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end" >
                                            <span className="badge bg-warning text-black mb-3 fs-6">Available</span>
                                        </div>
                                        <h4 className="card-title darkgreen"> {Equipment.name}</h4>
                                        <p className="card-text darkgreen fs-6 m-0 ">
                                            ModelNo: {Equipment.modelnumber}
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 ">
                                            Type: {Equipment.equipmenttype}
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 ">
                                            Price: Rs. {Equipment.price}/hour
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 ">
                                            Condition: {Equipment.condition}
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 ">
                                            Quantity: {Equipment.quantity}
                                        </p>
                                        <p className="card-text darkgreen  fs-6 m-0 ">
                                            Address: {Equipment.address}
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0" style={{ maxHeight: "40px", overflow: "scroll" }} >Description: {Equipment.description}</p>
                                        <p className="card-text darkgreen fs-6 m-0"><i className="bi bi-geo-alt text-danger"></i>&nbsp;{Equipment.city},{Equipment.state}</p>
                                        <div className="d-grid gap-1 mt-1">

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