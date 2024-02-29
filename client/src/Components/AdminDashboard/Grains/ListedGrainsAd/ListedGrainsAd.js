import { ADMIN_REQUESTED_URL } from "../../../../urls";
import { useState, useEffect } from "react";
import { verifyAdminStatus} from "../../../../store/adminSlice"
import axios from "axios";
import Swal from "sweetalert2";
import CardModal from "./CardModal.js"
import "./ListedGrainsAd.css"
import Loadinganimtion from "../../../Loading Amimation/Loadinganimation.jsx";
function ListedGrainsAd(){
    const [grainData, setGrainData] = useState(["Loading..."])  

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminViewsGrain").then((userDatas) => {
                setGrainData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }

    useEffect(() => {
        getData();
        console.log("grainData",grainData);
    }, []);
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
                verifyAdminStatus({ "_id": _id }).then(data => {
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

    
    return(<>
   <div className="mt-3 p-2" >
   <h1 className=" text-start ps-3 darkgreen fw-bold"><i class="fa-solid fa-wheat-awn"></i>&nbsp;Listed Grains</h1>
            <div className="container-fluid  table-responsive pb-3 ">
                <div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                
                    <thead>
                        <tr>
                        <th className="fs-6 p-0 text-center">S. No</th>
                            <th className="fs-6 p-0 text-center">User Email</th>
                            <th className="fs-6 p-0 text-center">Grain Name</th>
                            <th className="fs-6 p-0 text-center">Grain Type</th>
                            <th className="fs-6 p-0 text-center">Address</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Verify Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            
                            grainData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : grainData.length==0 ? <>No Avilable Grains Currently</> :grainData.map((grain, index) => (
                                    <tr key={index}>
                                        <td className="fs-6 text-center">{index + 1}</td>
                                        <td className="fs-6 text-center">{grain.userEmail}</td>
                                        <td className="fs-6 text-center">{grain.grainname}</td>
                                        <td className="fs-6 text-center">{grain.graintype}</td>
                                        <td className="fs-6 text-center">{grain.city},{grain.state}</td>
                                        <td className="fs-6 text-center"><CardModal Grain={grain}/></td>
                                        <td className="fs-6 text-center">{grain.admin_verify? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateAdminStatus(grain._id)} >Verified
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateAdminStatus(grain._id)} >Not Verified
                                        </button>}</td>
                                        
                                    </tr>))
                        }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </div>
   </div>
    </>)

}
export default ListedGrainsAd;