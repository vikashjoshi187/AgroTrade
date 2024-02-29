import { useState } from "react";
import Modal from "react-bootstrap/Modal";
function SeeAllD(props) {
    const { products } = props;
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
                    <div className="mt-3 p-2" >
                        <h1 className=" text-start ps-3 darkgreen fw-bold text-center">Product Deatils</h1>
                        <div className="container-fluid  table-responsive pb-3 ">
                            <div class="card table-card p-0">
                                <div class="card-body p-3">
                                    <div class="table-responsive">
                                        <table class="table table-success  mb-0">

                                            <thead>
                                                <tr>
                                                    <th className="fs-6 p-0 text-center">S. No</th>
                                                    <th className="fs-6 p-0 text-center">Grain Name </th>
                                                    <th className="fs-6 p-0 text-center">Price </th>
                                                    <th className="fs-6 p-0 text-center">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="13" className="text-center">No data available</td>
                                                        </tr>
                                                    ) : (
                                                        products.map((grain, index) => (
                                                            <tr key={index}>
                                                                <td className="fs-6 text-center">{index + 1}</td>
                                                                <td className="fs-6 text-center">{grain.product.grainname}</td>
                                                                <td className="fs-6 text-center">{grain.price}</td>
                                                                <td className="fs-6 text-center">{grain.quantity}</td>
                                                            </tr>
                                                        ))
                                                    )
                                                }
                                            </tbody>
                                        </table>
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
export default SeeAllD;