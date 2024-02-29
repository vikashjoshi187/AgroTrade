import { ADMIN_REQUESTED_URL } from "../../../../urls";
import { useState, useEffect } from "react";
import { verifyAdminStatusCold } from "../../../../store/adminSlice"
import "./ListedColdStLand.css"
import axios from "axios";
import Swal from "sweetalert2";
import CardModal from "./CardModal";
import Loadinganimtion from "../../../Loading Amimation/Loadinganimation.jsx"
function ListedColdStLand(){
    const [coldStData, setColdStData] = useState(["Loading..."])
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminColdStLand").then((userDatas) => {
                setColdStData(userDatas.data.result)
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
                verifyAdminStatusCold({ "_id": _id }).then(data => {
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
            <h1 className=" text-start ps-3 darkgreen fw-bold">Listed Cold Storage Land</h1>
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
                            <th className="fs-6 p-0 text-center">Rent Per Month</th>
                            <th className="fs-6 p-0 text-center">Address</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Verify Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                    
                    coldStData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : coldStData.length==0 ? <>No Avilable Cold Storage Land Currently</> :coldStData.map((data, index) => (
                                    <tr key={index}>
                                        <td className="fs-6 text-center">{index + 1}</td>
                                        <td className="fs-6 text-center">{data.userEmail}</td>
                                        <td className="fs-6 text-center">{data.area} acres</td>
                                        <td className="fs-6 text-center">Rs. {data.rent}  </td>
                                        <td className="fs-6 text-center">{data.address},{data.city},{data.state}</td>
                                        <td className="fs-6 text-center"><CardModal Data={data}/></td>
                                        <td className="fs-6 text-center">{data.admin_verify? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateAdminStatus(data._id)} >Verified
                                        </button>:
                                        <button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateAdminStatus(data._id)} >Not Verified
                                        </button>}
                                        </td> 
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
export default ListedColdStLand;