import Modal from "react-bootstrap/Modal";
import jscookie from 'js-cookie'
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { statusVerifyupdate } from "../../store/userSlice";
import { USER_REQUESTED_URL } from '../../urls'
function ExperViewClientModal() {
    const [viewData, setViewData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    var getData = () => {
        try {
            const userEmail = jscookie.get("userEmail");
            var obj = { "email": userEmail }
            axios.post(USER_REQUESTED_URL + "/expertViewData", obj).then((userDatas) => {
                console.log("userDatas.data.result", userDatas.data.result);
                setViewData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("err", err);
        }
    }
    const updateStatusVerify = (clientId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                statusVerifyupdate({ "clientId": clientId }).then(data => {
                    if (data.message === "success") {
                        Swal.fire({
                            position: "middle",
                            icon: "success",
                            title: "Update Successfully",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        getData();
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Unavailable to Delete Grain. Please try Again...",
                        });
                    }

                }).catch((err) => {
                    console.log("err", err);
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You not Update Verify Status :)',
                    'info'
                );
            }
        });
    }
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            <h6 className=" mb-0" onClick={() => setLgShow(true)}>Booking Request</h6>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Booking Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0" id="modal-body">
                    <div className="container mt-2 mr-5 table-responsive ">
                        <table className="table table-bordered table-sm ">
                            {console.log("userData", viewData)}
                            <thead>
                                <tr>
                                    <th className="fs-6 p-1">S. No</th>
                                    <th className="fs-6 p-1">Name</th>
                                    <th className="fs-6 p-1">Consulting Topic</th>
                                    <th className="fs-6 p-1">Consulting Type</th>
                                    <th className="fs-6 p-1">Consulting Time</th>
                                    <th className="fs-6 p-1">Consulting Date</th>
                                    <th className="fs-6 p-1">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    viewData.length === 0 ? (
                                        <tr>
                                            <td colSpan="13" className="text-center">No data available</td>
                                        </tr>
                                    ) : (
                                        viewData.map((user, index) => (
                                            <tr key={index}>
                                                <td className="fs-6">{index + 1}</td>
                                                <td className="fs-6">{user.client.name}</td>
                                                <td className="fs-6">{user.consultingTopic}</td>
                                                <td className="fs-6">{user.consultingType}</td>
                                                <td className="fs-6">{user.consultingTime}</td>
                                                <td className="fs-6">{user.consultingDate}</td>
                                                <td className="fs-6">{user.confirm == true ? <button type="button" name="" id="" className="btn btn-outline-success btn-sm" onClick={() => updateStatusVerify(user.clientId)}   >Confirmed
                                                </button> : <button type="button" name="" id="" className="btn btn-outline-danger btn-sm" onClick={() => updateStatusVerify(user.clientId)} >Not Confirmed
                                                </button>}</td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ExperViewClientModal;