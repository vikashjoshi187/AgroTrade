import "./AdminLogin.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin, setAdminData } from "../../../store/adminSlice.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import jscookie from 'js-cookie';
import { setRoleStatus } from "../../../store/commonSlice.js";
import AdminForgetPassword from "./AdminForgetPassword.js";
function AdminLogin() {
  const [adminData,setAdmin] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function getData(event) {
    const { name, value } = event.target;
    setAdmin({
      ...adminData,
      [name]: value
    });
  };

  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const data = await adminLogin(adminData);
        console.log("data in signin ", data);
        console.log("data in data.log ", data.log," ss",data.role);
    
        if (data.message === "success") {
          console.log("inside1");
          dispatch(setAdminData(data.log));
          console.log("inside2");
          dispatch(setRoleStatus({ role: data.role, data: data.log, status: true }));
          jscookie.set('adminEmail', data.log.email);
          await Swal.fire({
            position: "middle",
            icon: "success",
            title: "Welcome to Agrotrade🙏",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/adminDashboard');
        } else if (data.message === "wrong password") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Password!\nPlease try Again...",
          });
        } else if (data.message === "not exist") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Admin not exist. Please try Again...",
          });
        } else if (data.message === "error") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Error. Please try Again...",
          });
        }
      } catch (error) {
        console.log("User data not found : ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try Again...",
        });
      }
    }
    
  // }

    return ( <>

  <div className="px-4 py-5 px-md-5 text-center text-lg-start bg-darkgreen d-flex aling-items-center justify-content-center p-5" id="main-div" style={{BackgroundColor: "hsl(0, 0%, 96%)"}}>
    <div className="container d-flex aling-items-center justify-content-center">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0 " id="text-div">
          <h1 className="my-5 display-3 fw-bold text-white ">
            The best offer <br />
            <span className=" text-midgreen">for your business</span>
          </h1>
          <p style={{color: "white"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </div>
          
        <div className="col-lg-6 mb-5 mb-lg-0 ">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit}>
                 <h1 className="text-center">Admin Login</h1>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">Email address</label>
                  <input type="email" name="email" onChange={getData} id="form3Example3" className="form-control" />
                </div>


                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example4">Password</label>
                  <input type="password" name="password" onChange={getData} id="form3Example4" className="form-control" />
                </div>
                <AdminForgetPassword/>
               <button className=" login-btn bg-midgreen w-100 text-white "  type="submit">Log in</button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>  
    
    </> );
}

export default AdminLogin;