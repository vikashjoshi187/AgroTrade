import { ADMIN_REQUESTED_URL } from "../../../urls";
import { useState, useEffect } from "react";
import {statusExpert,statusVerifyExpert} from "../../../store/adminSlice"
import axios from "axios";
import Swal from "sweetalert2";
import "./ExpertList.css"
import ExpertdetailModal from "./Expert Detail Modal/ExpertdetailModal.js"
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx";
function ExpertListView() {

    const [expertData, setExpertData] = useState(["Loading..."])
    useEffect(() => {
        getData();
    }, []);

    const updateStatusExpert = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                statusExpert({ "_id": _id }).then(data => {
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
                    'You not Update Status :)',
                    'info'
                );
            }
        });
    }
    const expertStatusVerify = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Verify it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                statusVerifyExpert({ "_id": _id }).then(data => {
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

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminExpertList").then((userDatas) => {
                setExpertData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }

    return(
  
        <>
        <div className="mt-3 p-2">
        <>
          <h1 className="text-start ms-3 darkgreen fw-bold"><i class="bi bi-person-square"></i>&nbsp;Experts List</h1>
            <div className="container-fluid table-responsive pb-4">

<div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                    <thead>
                        <tr>
                            <th className="fs-6 p-0 text-center">S. No</th>
                            <th className="fs-6 p-0 text-center">Image</th>
                            <th className="fs-6 p-0 text-center">Name</th>
                            <th className="fs-6 p-0 text-center">Email</th>
                            <th className="fs-6 p-0 text-center">Edu</th>
                            <th className="fs-6 p-0 text-center">Exp</th>
                            <th className="fs-6 p-0 text-center">Chat Fee</th>
                            <th className="fs-6 p-0 text-center">Video Fee</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Verify</th>
                            <th className="fs-6 p-0 text-center">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                       {
                          
                          expertData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : expertData.length==0 ? <>No Avilable Experts Currently</> :expertData.map((expert, index) => (
                                    <tr key={index}>
                                        <td className="fs-6">{index + 1}</td>
                                        <td className="d-flex justify-content-center">
                                         <img  src={expert.image?"http://localhost:3000/" + expert.image:"http://localhost:3000/altUserImage.jpeg"} alt={expert.image} className="rounded-circle d-flex align-self-start  shadow-1-strong" width="40px" height="40px"/>
                                        </td>
                                        <td className="fs-6 text-center">{expert.name}</td>
                                        <td className="fs-6 text-center">{expert.email}</td>
                                        <td className="fs-6 text-center">{expert.education}</td>
                                        <td className="fs-6 text-center">{expert.experience}</td>
                                        <td className="fs-6 text-center">{expert.consultancy_fee_chat}</td>
                                        <td className="fs-6 text-center">{expert.consultancy_fee_video}</td>
                                        <td className="fs-6 text-center">
                                            {/* <button type="button" name="" id="" className="btn btn-warning  btn-sm" >See Details
                                        </button> */}
                                        <ExpertdetailModal key={index} expert={expert}/>
                                        </td>
                                        <td className="fs-6 text-center">{expert.status=="deactive"? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateStatusExpert(expert._id)} >Active
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateStatusExpert(expert._id)}>Deactive
                                        </button>}</td>
                                        <td className="fs-6 text-center">{expert.verify_status? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>expertStatusVerify(expert._id)} >Verify
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>expertStatusVerify(expert._id)}>Not Verify
                                        </button>}</td>
                                    </tr>
                                )
                            )
                        }                        
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
        </>
            
        </div>
        </>
    )
}
export default ExpertListView;