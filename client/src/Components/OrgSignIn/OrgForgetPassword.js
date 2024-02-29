import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import leafwallpaper from "../../assets/leaves_Image.jpeg";
import { getOtp } from '../../store/commonSlice';
import { checkOtp, changePassword } from '../../store/organizationSlice.js';
import Swal from 'sweetalert2';


function OrgForgetPassword() {
  const [show, setShow] = useState(false);
  const [emailset, setEmail] = useState("");
  const [varifyOtp, setvarifyOtp] = useState("");
  const [password, setPassword] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  var checkFields = false, email = false;

  function showOtpfrom() {
    document.getElementById("otpvarifyform").style.display = "block"

  }

  function showPasswordFields() {
    document.getElementById("otpvarifyform").style.display = "none"
    document.getElementById("passwordchangrForm").style.display = "block"
  }

  const handleEmail = (e) => {
    setEmail({ ...emailset, [e.target.name]: e.target.value })
  }

  const handleOtp = (e) => {
    console.log("Inside handleOtp ");
    setvarifyOtp({ ...varifyOtp, [e.target.name]: e.target.value })
  }

  function validateEmail(e) {
    console.log("hello");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var EmailField = document.getElementById(e.target.id);
    if (pattern.test(e.target.value.trim())) {
      EmailField.classList.add('is-valid');
      EmailField.classList.remove('is-invalid');

      checkFields = true;
      if (e.target.name === "org_email") {
        console.log("hello11112");
        email = true;
      }
    }
    else {
      EmailField.classList.remove('is-valid');
      EmailField.classList.add('is-invalid');
      checkFields = false;
      if (e.target.value === "org_email") {
        email = false;
      }
    }
    if (e.target.value === "") {
      EmailField.classList.remove('is-valid');
      EmailField.classList.remove('is-invalid');
      checkFields = false;
    }
  }

  function handleOtpCheck(e) {
    const otp = varifyOtp.otp;
    console.log("Inside handleOtp ", otp);
    checkOtp({ otp }).then((data) => {
      console.log("data.message",data.message);
      if (data.message == "success") {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
        showPasswordFields();
      }else {
        console.log("Err");
      }
    });
  }

  function handleSubmitEmail(e) {
    e.preventDefault();
    const email = emailset.dealer_email;

    console.log("getOtp2", email + " sdddd ", checkFields + "sdddd", email);
    getOtp({ email, password: "" });
    showOtpfrom()
  }

  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  function handleChangePasswordSubmit(e) {
    changePassword(password).then((data)=>{
      console.log(data.message);
      if(data.message=='success'){
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Password Changed Successfully",
          showConfirmButton: false,
          timer: 2000
        });
        setShow(false);
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }
    }).catch(()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }




  return (
    <>
      <p className="text-end mt-1" onClick={handleShow}> <Link className="text-danger  text-decoration-none">Forgot Password ?</Link></p>
      <Modal size={'lg'} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="darkgreen"> AGRO TRADE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-0 w-100 p-0">
            <div className="col-12 col-lg-6  p-4" id="datacol" >
              <h2 className="midgreen text-center ">Forogt Password</h2>
              <form className="row g-3 needs-validation" id="dataForm" onSubmit={handleSubmitEmail} noValidate>
                <div className="col-12">
                  <label htmlFor="validationCustomUsername" className="form-label midgreen">
                    Email
                  </label>
                  <div className="has-validation">
                    <input placeholder="Emter Enail Address" name="dealer_email" type="email" onChange={(e) => { validateEmail(e); handleEmail(e) }} className="form-control" id="fogetPasswordEmail" aria-describedby="inputGroupPrepend" required />
                    <div className="valid-feedback">
                      Correct email!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid email!!
                    </div>
                  </div>
                </div>

                <div className="col-12" id="otpbtncol">
                  <div className="d-grid gap-2">
                    <button type="submit" name="" id="getotpBtn" className="btn btn-success" >Get OTP</button>
                  </div>
                </div>
              </form>

              <form className="row g-3 needs-validation mt-1" style={{ display: "none" }} onSubmit={handleOtpCheck} id="otpvarifyform" noValidate>
                <div className="col-12">
                  <label htmlFor="validationCustom03" className="form-label midgreen">
                    OTP
                  </label>
                  <input placeholder="Enter OTP" type="number" name='otp' className="form-control" onChange={(e) => handleOtp(e)} id="validationCustom03" required />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>

                <div className="col-12 signupbtn-col">
                  <div className="d-grid gap-2">
                    <button type="submit" name="" id="SignUpBtn" className="btn btn-success"  >Varify OTP</button>
                  </div>
                </div>
              </form>


              <form className="row g-3 needs-validation mt-1" style={{ display: "none" }} onSubmit={handleChangePasswordSubmit} id="passwordchangrForm" noValidate>
                <div className="col-12">
                  <label htmlFor="validationCustom03" className="form-label midgreen">
                    Password
                  </label>
                  <input placeholder="Create Password" type="password" className="form-control" name="password" onChange={(e) => handleChangePassword(e)} id="validationCustom03" required />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom03" className="form-label midgreen">
                    Confirm Password
                  </label>
                  <input placeholder="Confirm Password" type="password" className="form-control" name="cnfPassword" onChange={(e) => handleChangePassword(e)} id="validationCustom03" required />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>
                <div className="col-12 signupbtn-col">
                  <div className="d-grid gap-2">
                    <button type="submit" name="" id="SignUpBtn" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>

              <h6 className="text-center midgreen mt-3" onClick={() => { setShow(false) }} >Go to Sing in Page </h6>
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

export default OrgForgetPassword;