import { ADMIN_REQUESTED_URL } from "../../../urls";
import { useState, useEffect } from "react";
import { statusVerifyupdate, statusUser } from "../../../store/adminSlice"
import axios from "axios";
import Swal from "sweetalert2";
import "./UserList.css"
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx"

function UserList() {
    const [userData, setUserData] = useState(["Loading..."])
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminUerList").then((userDatas) => {
                setUserData(userDatas.data.result)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }


    const updateStatususer = (_id) => {
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
                statusUser({ "_id": _id }).then(data => {
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
    const updateStatusVerify = (_id) => {
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
                statusVerifyupdate({ "_id": _id }).then(data => {
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

    return (
        <>
        <div className="mt-3 p-2" >
          <h1 className="text-start ms-3  darkgreen fw-bold"><i class="bi bi-people-fill"></i>&nbsp;Users List</h1>
          <div class="col-12">
            <div class="card table-card p-0">
              <div class="card-body p-3">
                <div class="table-responsive">
                  <table class="table table-success  mb-0">
                    <thead className="">
                        <tr>
                            <th className="fs-6 p-0 text-center" scope="col">S. No</th>
                            <th className="fs-6 p-0 text-center" scope="col">Profile</th>
                            <th className="fs-6 p-0 text-center" scope="col">Name</th>
                            <th className="fs-6 p-0 text-center" scope="col">Email</th>
                            <th className="fs-6 p-0 text-center" scope="col">Address</th>
                            <th className="fs-6 p-0 text-center" scope="col">Contact</th>
                            <th className="fs-6 p-0 text-center" scope="col">Status</th>
                            <th className="fs-6 p-0 text-center" scope="col">Verify</th>

                        </tr>
                    </thead>
                    <tbody>
        
                      {
                          
                          userData[0] == "Loading..." ? <td className="p-5 w-50"> <Loadinganimtion /></td>  : userData.length==0 ? <>No Listed AgricultureLand</> :userData.map((user, index) => 
                                    <tr key={index}>
                                        <td className="fs-6">{index + 1}</td>
                                        <td className="d-flex justify-content-center">
                                         <img  src={user.image?"http://localhost:3000/" + user.image:"http://localhost:3000/altUserImage.jpeg"} alt={user.image} className="rounded-circle d-flex align-self-start shadow-1-strong" width="40px" height="40px"/>
                                        </td>
                                        <td className="fs-6 text-center">{user.name}</td>
                                        <td className="fs-6 text-center">{user.email}</td>
                                        <td className="fs-6 text-break text-center">{user.address}</td>
                                        <td className="fs-6 text-center">{user.number}</td>
                                    
                                        <td className="fs-6 text-center">{user.status == "deactive" ? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={() => updateStatususer(user._id)} >Active
                                        </button> : <button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={() => updateStatususer(user._id)}>Deactive
                                        </button>}</td>
                                        <td className="fs-6 text-center">{user.verify_status ? <button type="button" name="" id="" className="btn btn-success btn-sm" onClick={() => updateStatusVerify(user._id)} >Verify
                                        </button> : <button type="button" name="" id="" className="btn btn-danger btn-sm" onClick={() => updateStatusVerify(user._id)}>Not Verify
                                        </button>}</td>
                                    </tr>)
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
export default UserList;