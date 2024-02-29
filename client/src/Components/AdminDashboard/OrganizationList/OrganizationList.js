import { ADMIN_REQUESTED_URL } from "../../../urls";
import { useState, useEffect } from "react";
import {statusUpdate,statusVerify} from "../../../store/adminSlice"
import OrgdetailModal from "./OrgDetail Modal/OrgdetailModal";
import axios from "axios";
import "./OrganizationList.css"
import Swal from "sweetalert2";
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx";

function OrganizationList() {
    const [organizationData, setOrganizationData] = useState(["Loading..."])
    
    const getData = ()=>{
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminOrganizationList").then((userDatas) => {
                setOrganizationData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }
    useEffect(() => {
      getData();
      console.log("organizationData",organizationData);
  }, []);
    const updateStatus = (_id)=>{
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
                statusUpdate({"_id":_id}).then(data=>{
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
                   
                }).catch((err)=>{
                    console.log("err",err);
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
    const updateStatusVerify = (_id)=>{
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
                statusVerify({"_id":_id}).then(data=>{
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
                   
                }).catch((err)=>{
                    console.log("err",err);
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
    return (
 
        <>
        <div className="mt-3 p-2" >
        <h1 className="ms-3 text-start darkgreen fw-bold"><i class="bi bi-buildings"></i>&nbsp;Organization List</h1>
        <div className="container-fluid table-responsive pb-3">   
           <div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                    <thead>
                        <tr>
                            <th className="fs-6 p-0 text-center">S. No</th>
                            <th className="fs-6 p-0 text-center">Image</th>
                            <th className="fs-6 p-0 text-center">Org email</th>
                            <th className="fs-6 p-0 text-center">Dealer email</th>
                            <th className="fs-6 p-0 text-center">Dealer name</th>
                            <th className="fs-6 p-0 text-center">Dealer contact</th>
                            <th className="fs-6 p-0 text-center">Details</th>
                            <th className="fs-6 p-0 text-center">Status</th>
                            <th className="fs-6 p-0 text-center">Verify</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                      
                      organizationData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : organizationData.length==0 ? <>No Avilable Organization Currently</> :organizationData.map((org, index) => (
                                    <tr key={index}>
                                        <td className="fs-6 text-center">{index + 1}</td>
                                        <td className="fs-6  d-flex justify-content-center">
                                         <img    src={org.org_image?"http://localhost:3000/" + org.org_image:"http://localhost:3000/altUserImage.jpeg"} alt={org.org_image} className="rounded-circle d-flex align-self-start  shadow-1-strong " width="40px" height="40px"/>
                                        </td>
                                        <td className="fs-6 text-center">{org.company_name}</td>
                                        <td className="fs-6 text-center">{org.dealer_email}</td>
                                        <td className="fs-6 text-center">{org.dealer_name}</td>
                                        <td className="fs-6 text-center">{org.dealer_contact}</td>
                                        <td className="fs-6 text-center">
                                          {/* <button type="button" name="" id="" className="btn btn-warning btn-sm" >See Details
                                        </button> */}
                                        <OrgdetailModal key={index} org={org}/>
                                        </td>
                                        <td className="fs-6 text-center">{org.status=="deactive"? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateStatus(org._id)} >Active
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateStatus(org._id)}>Deactive
                                        </button>}</td>
                                        <td className="fs-6 text-center">{org.verify_status? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={()=>updateStatusVerify(org._id)} >Verify
                                        </button>:<button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={()=>updateStatusVerify(org._id)}>Not Verify
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
        </div>
        </>
    )
}
export default OrganizationList;

