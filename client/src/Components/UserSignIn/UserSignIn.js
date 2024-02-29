import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import leafwallpaper from "../../assets/leaves_Image.jpeg";
import { useDispatch } from "react-redux";
import { userLogin, setUserData } from "../../store/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import jscookie from 'js-cookie';


import "./UserSingIn.css";
import UserFogotPassword from "./UserForgetPassword.js";

import { setRoleStatus } from "../../store/commonSlice";
var userObj = {}
var email = false;
function UserSingIn() {
  const [lgShow, setLgShow] = useState(false);
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getData(event) {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  function resetData() {
    email = false;
  }
  function validateEmail(e) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var EmailField = document.getElementById(e.target.id);
    if (pattern.test(e.target.value.trim())) {
      const { name, value } = e.target;
      userObj = { ...userObj, [name]: value.trim() }
      EmailField.classList.add('is-valid');
      EmailField.classList.remove('is-invalid');
      email = true;
    }
    else {
      EmailField.classList.remove('is-valid');
      EmailField.classList.add('is-invalid');
      email = false;
    }

    if (e.target.value === "") {
      EmailField.classList.remove('is-valid');
      EmailField.classList.remove('is-invalid');
      email = false;
    }
  }

  function handelSubmit(e) {
    e.preventDefault();
    if (email) {
      userLogin(loginData).then((data) => {
        console.log("data in signin ", data)
        if (data.message === "success") {
          dispatch(setUserData(data.log));
          dispatch(setRoleStatus({ role: data.role, data: data.log, status: true }));
          jscookie.set('userEmail', data.log.email);
          setLgShow(false);
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Welcome to Agrotrade🙏",
            showConfirmButton: false,
            timer: 2000
          });
          navigate('/');
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
            text: "User not exist. Please try Again...",
          });
        } else if (data.message === "error") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Error. Please try Again...",
          });
        }

      }).catch((error) => {
        console.log("User data not found : ", error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try Again...",
        });
      });
    }

  }

  return (
    <>
      <p onClick={() => setLgShow(true)}>
        <i className="bi bi-person-circle"></i>&nbsp;User
      </p>
      <Modal size="lg" show={lgShow}
        onHide={
          () => {
            setLgShow(false)
            resetData()
          }
        }

        backdrop="static" aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className="darkgreen">
            USER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="row m-0 w-100 p-0 d-flex">
            <div className="col-12 col-lg-6 " id="datacol">
              <div id="overlay" >
                <h1 className="midgreen text-center mt-3">Sign in</h1>
                <form className="row g-3 needs-validation" id="dataForm" onSubmit={handelSubmit} noValidate>
                  <div className="col-12 columns mt-4">
                    <label
                      htmlFor="validationCustomUsername"
                      className="form-label midgreen"
                    >
                      Email
                    </label>
                    <div className="has-validation">
                      <input placeholder="Enter Email Address" name="email" type="email" className="form-control" onChange={(event) => { validateEmail(event); getData(event); }} id="userSinginemail" aria-describedby="inputGroupPrepend" required
                      />
                      <div className="valid-feedback">
                        Correct email!!
                      </div>
                      <div className="invalid-feedback">
                        Invalid email!!!
                      </div>
                    </div>
                  </div>
                  <div className="col-12 columns ">
                    <label htmlFor="validationCustom03" className="form-label midgreen" >
                      password
                    </label>
                    <input placeholder="Enter Password" name="password" type="password" className="form-control" id="userSiginpassword" onChange={getData} required />
                    <div onClick={resetData}><UserFogotPassword /></div>
                  </div>

                  <div className="col-12 columns signupbtn-col mt-5">
                    <div className="d-grid gap-2">
                      <button type="submit" name="" id="Signupbtn" className="btn btn-success">
                        Sign in
                      </button>
                    </div>
                  </div>
                  <h6 className="text-center text-info">
                    Don't have account ? Create account {" "}
                    <span className="midgreen">Sign up</span>{" "}
                  </h6>
                </form>

              </div>
            </div>

            <div className="col-6 m-0 p-0" id="imgcol">
              <img src={leafwallpaper} className="w-100" alt="" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UserSingIn