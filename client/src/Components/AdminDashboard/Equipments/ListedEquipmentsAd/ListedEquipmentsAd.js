import { ADMIN_REQUESTED_URL } from "../../../../urls";
import { useState, useEffect } from "react";
import { verifyStatusAdmin } from "../../../../store/adminSlice"
import "./ListedEquipmentsAd.css"
import CardModal from "./CardModal";
import axios from "axios";
import Swal from "sweetalert2";
import Loadinganimtion from "../../../Loading Amimation/Loadinganimation.jsx";
function ListedEquipmentsAd(){
    const [equipmentsData, setEquipmentsData] = useState(["Loading..."])
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminVeiwEquipment").then((userDatas) => {
                setEquipmentsData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }

    const updateAdminStatus = (_id) => {
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
                verifyStatusAdmin({ "_id": _id }).then(data => {
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


    return(
<>
<div className="mt-3 p-2" >
          <h1 className="text-start ms-3  darkgreen fw-bold"><i class="bi bi-people-fill"></i>&nbsp;Listed Equipments</h1>
          <div class="col-12">
            <div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                    <thead>
                        <tr>
                            <th className="fs-6 p-0 text-center">S. No</th>
                            <th className="fs-6 p-0 text-center">User Email</th>
                            <th className="fs-6 p-0 text-center">Equipment Name</th>
                            <th className="fs-6 p-0 text-center">Equipment Type</th>
                            <th className="fs-6 p-0 text-center">Address</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Verify Status</th>
                        </tr>
                    </thead>
                        <tbody>
                         {
                         
                         equipmentsData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : equipmentsData.length==0 ? <>No Avilable Equipments Land Currently</> :equipmentsData.map((equipment, index) => (
                                     <tr key={index}>
                                         <td className="fs-6 text-center">{index + 1}</td>
                                         <td className="fs-6 text-center">{equipment.userEmail}</td>
                                         <td className="fs-6 text-center">{equipment.name}</td>
                                         <td className="fs-6 text-center">{equipment.modelnumber}</td>
                                         <td className="fs-6 text-center">{equipment.city},{equipment.state}</td>
                                         <td className="fs-6 text-center"><CardModal Equipment={equipment}/></td>
                                         <td className="fs-6 text-center">{equipment.admin_verify? <button type="button" name="" id="" className="btn btn-outline-success btn-sm" onClick={()=>updateAdminStatus(equipment._id)} >Verified
                                         </button>:<button type="button" name="" id="" className="btn btn-outline-danger btn-sm" onClick={()=>updateAdminStatus(equipment._id)} >Not Verified
                                         </button>}</td>                                      
                                     </tr>
                                 ))
                             
                         }
                     </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div></>
    )

}
export default ListedEquipmentsAd;