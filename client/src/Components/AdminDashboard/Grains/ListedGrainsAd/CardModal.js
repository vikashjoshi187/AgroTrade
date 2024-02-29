import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CardModal.css"
function CardModal(props) {
    const { Grain } = props;
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
                    <div className=" w-100 d-flex justify-content-center p-1">
                        <div className="card bg-white p-0 w-100">
                            <div className="row g-0">
                                <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 p-0" id="imgeDiv">
                                    <img src={"http://localhost:3000/" + Grain.image} className="img-fluid rounded-start w-100 card-image" alt={Grain.image} />
                                </div>
                                <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-end">
                                            {Grain.grain === "inorganic" ? <span className="badge bg-warning fs-6">Inorganic</span> : <span className="badge bg-success fs-6">Organic</span>}
                                        </div>
                                        <h4 className="card-title darkgreen fs-4">{Grain.grainname}</h4>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1">
                                            Type: {Grain.graintype}<br/>
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1">
                                            Price: Rs.{Grain.price}/quintal<br/>
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1">
                                            Quantity:{Grain.quantity} quintal<br/>
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1">
                                            Shelf Life: {Grain.selflife} Month<br/>
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1">
                                            Moisture Level: {Grain.moisturelevel}%
                                        </p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-1" style={{ maxHeight: "40px", overflow: "scroll" }} >Description: {Grain.description}</p>
                                        <p className="card-text darkgreen fs-6 m-0 mt-3"><i className="bi bi-geo-alt text-danger"></i>&nbsp;{Grain.city},{Grain.state}</p>
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