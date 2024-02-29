import { ADMIN_REQUESTED_URL } from "../../../../urls";
import { useState, useEffect } from "react";
import { verifyAdminStatusAg} from "../../../../store/adminSlice"
import "./ListedFarmingLand.css"
import axios from "axios";
import Swal from "sweetalert2";
import CardModal from "./CardModal";
import Loadinganimtion from "../../../Loading Amimation/Loadinganimation.jsx";

function ListedFarmingLand(){
    const [agriLandData, setAgriLandData] = useState(["Loading..."])
    
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminViewsAgriLand").then((userDatas) => {
                setAgriLandData(userDatas.data.result)
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
                verifyAdminStatusAg({ "_id": _id }).then(data => {
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
            <h1 className=" ms-3 text-start darkgreen fw-bold">Listed Farming Land</h1>
            <div className="container-fluid table-responsive pb-3">
            <div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                    <thead>
                        <tr>
                            <th className="fs-6 p-0 text-center">S. No</th>
                            <th className="fs-6 p-0 text-center">Owner Email</th>
                            <th className="fs-6 p-0 text-center">Farming Area</th>
                            <th className="fs-6 p-0 text-center">Soil Type</th>
                            <th className="fs-6 p-0 text-center">Address</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Verify Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                       
                       agriLandData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : agriLandData.length==0 ? <>No Avilable Agriculture Land Currently</> :agriLandData.map((agriLand, index) => (
                                    <tr key={index}>
                                        <td className="fs-6 text-center">{index + 1}</td>
                                        <td className="fs-6 text-center">{agriLand.ownerEmail}</td>
                                        <td className="fs-6 text-center">{agriLand.area} acres</td>
                                        <td className="fs-6 text-center">{agriLand.agriType} </td>
                                        <td className="fs-6 text-center">{agriLand.address},{agriLand.city},{agriLand.state}</td>
                                        <td className="fs-6 text-center"><CardModal AgriLand={agriLand}/></td>
                                        <td className="fs-6 text-center">{agriLand.admin_verify? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateAdminStatus(agriLand._id)} >Verified
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateAdminStatus(agriLand._id)} >Not Verified
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
            </div>
        </>
    )
}

export default ListedFarmingLand
