import "./OrgSignUp.css"
import factory from "../../assets/factory1.jpeg"
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { orgRegister, setOrgData } from "../../store/organizationSlice.js";
import { getOtp, setRoleStatus } from "../../store/commonSlice.js";
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import { authorize } from '../../store/auth/auth.js';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import state_arr from "../../City.js";
import s_a from "../../City.js";
import jscookie from 'js-cookie'

var orgObj = {}

var checkFields = false,
  state = false,
  city = false,
  image = false,
  address = false,
  description = false,
  orgtype = false,
  orgname = false,
  regname = false,
  ownername = false,
  dealername = false,
  org_email = false,
  dealer_email = false,
  passwrod = false;

function OrgSingUp() {
  const [email, setEmail] = useState();
  // const [otp,setOtp] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const print_state = () => {
    var option_str = document.getElementById("state");

    console.log('option ', option_str);
    console.log('state_array ', state_arr);
    // option_str.length = 0;
    option_str.options[0] = new Option('Select State', '');
    option_str.selectedIndex = 0;
    console.log('', state_arr.state_arr);
    for (var i = 0; i < state_arr.state_arr.length; i++) {
      option_str.options[option_str.length] = new Option(state_arr.state_arr[i], state_arr.state_arr[i]);
      console.log('option_str in loop ', option_str);
    }
  }
  const print_city = (e, city_id) => {
    var { name, value } = e.target;
    var state_index = e.target.selectedIndex;
    console.log('event ', e.target.selectedIndex);
    var option_str = document.getElementById(city_id);
    option_str.length = 0;
    option_str.options[0] = new Option('Select City', '');
    option_str.selectedIndex = 0;
    var city_arr = s_a.s_a[state_index].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
    }
    checkField(e);
  }


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      print_state();
      authorize(dispatch);
      // setProviderData({...providerData,['User_id']:location.state.id,['Service_type']:'Cleaner'});
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // useEffect(()=>{

  // },[]);


  function validateName(e) {
    const pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
    var ownerName = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value.trim() }
      ownerName.classList.add('is-valid');
      ownerName.classList.remove('is-invalid');
      checkFields = true;
      if (e.target.name === "company_name") {
        orgname = true;
      }
      else if (e.target.name === "reg_name") {
        regname = true;
      }
      else if (e.target.name === "owner_name") {
        ownername = true;
      }
      else if (e.target.name === "dealer_name") {
        dealername = true;
      }
    }
    else {
      ownerName.classList.remove('is-valid');
      ownerName.classList.add('is-invalid');
      checkFields = false;
      if (e.target.name === "company_name") {
        orgname = false;
      }
      else if (e.target.name === "reg_name") {
        regname = false;
      }
      else if (e.target.name === "owner_name") {
        ownername = false;
      }
      else if (e.target.name === "dealer_name") {
        dealername = false;
      }
    }
    if (e.target.value === "") {
      ownerName.classList.remove('is-valid');
      ownerName.classList.remove('is-invalid');
      checkFields = false;
    }
  }
  function validateRegnum(e) {
    const pattern = /^U\d{5}[A-Z]{2}\d{4}PTC\d{6}$/;
    const restrNumber = document.getElementById("restrNumber")
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value.trim() }
      restrNumber.classList.add('is-valid');
      restrNumber.classList.remove('is-invalid')
      checkFields = true;
    }
    else {
      restrNumber.classList.remove('is-valid');
      restrNumber.classList.add('is-invalid');
      checkFields = false;
    }

    if (e.target.value === "") {
      restrNumber.classList.remove('is-valid');
      restrNumber.classList.remove('is-invalid');
      checkFields = false;
    }
  }
  function validateEmail(e) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var EmailField = document.getElementById(e.target.id);
    if (pattern.test(e.target.value.trim())) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value.trim() }
      EmailField.classList.add('is-valid');
      EmailField.classList.remove('is-invalid');
      checkFields = true;
      if (e.target.name === "org_email") {
        org_email = true;
      }
      else if (e.target.name === "dealer_email") {
        dealer_email = true;
      }
    }
    else {
      EmailField.classList.remove('is-valid');
      EmailField.classList.add('is-invalid');
      checkFields = false;
      if (e.target.value === "org_email") {
        org_email = false;
      }
      else if (e.target.value === "dealer_email") {
        dealer_email = false;
      }
    }
    if (e.target.value === "") {
      EmailField.classList.remove('is-valid');
      EmailField.classList.remove('is-invalid');
      checkFields = false;
    }
  }
  function validatePassword(e) {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var compnypasswordField = document.getElementById('compnypasswordField');
    if (pattern.test(e.target.value.trim())) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value }
      compnypasswordField.classList.add('is-valid');
      compnypasswordField.classList.remove('is-invalid');
      checkFields = true;
      passwrod = true;
    }
    else {
      compnypasswordField.classList.remove('is-valid');
      compnypasswordField.classList.add('is-invalid');
      checkFields = false;
      if (e.target.name === "password") {
        passwrod = true;
      }
      else if (e.target.name === "dealer_email") {
        dealer_email = true
      }
    }
    if (e.target.value === "") {
      compnypasswordField.classList.remove('is-valid');
      compnypasswordField.classList.remove('is-invalid');
      checkFields = false;
      if (e.target.name === "password") {
        passwrod = false;
      }
      else if (e.target.name === "dealer_email") {
        dealer_email = false;
      }
    }
  }
  function validatezipCode(e) {
    const pattern = /^[1-9][0-9]{5}$/;
    var zipCode = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value.trim() }
      zipCode.classList.add('is-valid');
      zipCode.classList.remove('is-invalid');
      checkFields = true;
    }
    else {
      zipCode.classList.remove('is-valid');
      zipCode.classList.add('is-invalid');
      checkFields = false;
    }
    if (e.target.value === "") {
      zipCode.classList.remove('is-valid');
      zipCode.classList.remove('is-invalid');
      checkFields = false;
    }
  }
  function validatePhnNumber(e) {
    const pattern = /^\d{10}$/;
    var EmailField = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      orgObj = { ...orgObj, [name]: value.trim() }
      EmailField.classList.add('is-valid');
      EmailField.classList.remove('is-invalid');
      checkFields = true;
    }
    else {
      EmailField.classList.remove('is-valid');
      EmailField.classList.add('is-invalid');
      checkFields = false;
    }
    if (e.target.value === "") {
      EmailField.classList.remove('is-valid');
      EmailField.classList.remove('is-invalid');
      checkFields = false;
    }
  }
  function checkField(e) {
    const field = document.getElementById(e.target.id)
    if (e.target.value.trim() === "" || e.target.value === "null") {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      if (e.target.name === "state") {
        state = false;
      }
      else if (e.target.name === "city") {
        city = false;
      }
      else if (e.target.name === "org_image") {
        image = false;
      }
      else if (e.target.name === "address") {
        address = false;
      }
      else if (e.target.name === "org_description") {
        description = false;
      }
      else if (e.target.name === "org_type") {
        orgtype = false;
      }
    }
    else {
      field.classList.add('is-valid');
      field.classList.remove('is-invalid');
      const { name, value } = e.target;

      if (e.target.type === "file") {
        const orgimgImg = e.target.files[0];
        orgObj = { ...orgObj, [name]: orgimgImg }
      } else {
        orgObj = { ...orgObj, [name]: value.trim() }
      }



      if (e.target.name === "state") {
        state = true;
      }
      else if (e.target.name === "city") {
        city = true;
      }
      else if (e.target.name === "org_image") {
        image = true;
      }
      else if (e.target.name === "address") {
        address = true;
      }
      else if (e.target.name === "org_description") {
        description = true;
      }

      else if (e.target.name === "org_type") {
        orgtype = true;
      }

    }
    if (e.target.value === "" && e.target.type !== "textarea") {
      field.classList.remove('is-invalid');
    }
  }


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSubmitEmail(e) {
    e.preventDefault();
    console.log(
      "state " + state + "\n" +
      "city " + city + "\n" +
      "image " + image + "\n" +
      "address " + address + "\n" +
      "description " + description + "\n" +
      "orgtype " + orgtype + "\n" +
      "orgname " + orgname + "\n" +
      "regname " + regname + "\n" +
      "ownername " + ownername + "\n" +
      "dealername " + dealername + "\n" +
      "oremai " + org_email + "\n" +
      "dealer_email " + dealer_email + "\n" +
      "passwrod " + passwrod + "\n" +
      "dealer_email " + dealer_email);
    // ---------------hatana mat-----------

    if (checkFields && state && city && image && address && description && orgtype && orgname && regname && ownername && dealername && org_email && dealer_email && passwrod) {
      getOtp({ email, password: '' });
      handleShow();
    }
  }
  const [varifyText, setvarifyText] = useState("Varify")
  function handleSubmitData(e) {
    const elements = document.querySelectorAll(`.${"is-valid"}`);
    elements.forEach(element => {
      element.classList.remove("is-valid");
    });
    document.getElementById("spinner").classList.remove('d-none');
    setvarifyText("varifying")

    const formData = new FormData();
    for (var key in orgObj) {
      if (orgObj[key]) {
        formData.append(key, orgObj[key]);
      }
    }

    formData.append("otp", document.getElementById("otpfield").value);

    setTimeout(() => {
      orgRegister(formData).then((data) => {
        console.log("data.message", data.message);
        if (data.message == "success") {
          setvarifyText("varified")
          handleClose()
          setvarifyText("varify");
          dispatch(setOrgData(data.log));
          dispatch(setRoleStatus({ role: data.role, data: data.log, status: true }));
          console.log('datalog', data.log);
          jscookie.set('dealer_email', data.log.dealer_email);

          // navigate('/');

          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Welcome to Agrotrage🙏",
            showConfirmButton: false,
            timer: 2000
          });
          navigate('/orgnization');
        } else if (data.message == "exist") {
          setvarifyText("error")
          setvarifyText("varify");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Organozation allready registered. Please try Again...",
          });
        } else if (data.message == "error") {
          setvarifyText("error")
          setvarifyText("varify");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try Again...",
          });
        } else if (data.message == "wrong otp") {
          setvarifyText("Invalid")
          setvarifyText("varify");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Otp!\nPlease enter valid otp...",
          });
        }
      }).catch((error) => {
        setvarifyText("error")
        setvarifyText("varify");
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try Again...",
        });
      });
    }, 3000);

    console.log("orgObj : ", orgObj);
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-3  " >
        <div className="container  bg-white p-0" id="OrgFromBox" >
          <div className="row w-100 m-0 g-0 ">
            <div className="col-12 col-md-12 col-lg-7 m-0 pt-3" >
              <h2 className="midgreen text-center">Orgnisation Sign Up</h2>
              <form id="orgForm" onSubmit={handleSubmitEmail} encType="multipart/form-data">
                <div className="row m-0 w-100" >

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen">Orgnisation name</label>
                    <input name="company_name" type="text" className="form-control form-control-sm" onChange={validateName} id="nameField" placeholder="Enter orgnisation name" required />
                    <div className="valid-feedback">
                      Looks good!!
                    </div>
                    <div className="invalid-feedback">
                      Incorrect name!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen">Regestration  name</label>
                    <input name="reg_name" type="text" className="form-control form-control-sm" id="regestrName" onChange={validateName} placeholder="Enter regestration name" required />
                    <div className="valid-feedback">
                      Correct regestration name!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid regestration name!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen">Registration number</label>
                    <input name="reg_number" type="text" className="form-control form-control-sm" id="restrNumber" onChange={validateRegnum} placeholder="Enter registration number" required />
                    <div className="valid-feedback">
                      Correct regestration number!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid regestration number!!
                    </div>
                  </div>


                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Orgnisation email</label>
                    <input name="org_email" type="email" className="form-control form-control-sm" id="compnyEmailField" onChange={validateEmail} placeholder="Enter orgnisation email" required />
                    <div className="valid-feedback">
                      Correct email!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid email !!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Password</label>
                    <input name="password" type="password" className="form-control form-control-sm" id="compnypasswordField" onChange={validatePassword} placeholder="Enter Password" required />
                    <div className="valid-feedback">
                      Strong Password!!
                    </div>
                    <div className="invalid-feedback">
                      Weak Password!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Orgnisation Type</label>
                    <select name="org_type" className="form-control form-control-sm" onChange={checkField} id="orgnisationtype" >
                      <option value="null">Select Orgnisation Type</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                    </select>
                    <div className="valid-feedback">
                      Orgnisation type selected!!
                    </div>
                    <div className="invalid-feedback">
                      Please select orgnisation type!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Orgnisation Image </label>
                    <input type="file" className="form-control form-control-sm" name="org_image" onChange={checkField} id="image" />
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1" >State</label>

                    <select type="text" className="form-control form-control-sm mb-1 form-control-sm" name="state" id="state" onChange={(e) => { print_city(e, 'city') }}></select>

                    <div className="valid-feedback">
                      State selected!!
                    </div>
                    <div className="invalid-feedback">
                      Please select state !!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2 ">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1"  >City</label>

                    <select className="form-control form-control-sm mb-1 form-control-sm" name="city" id="city" onChange={checkField} ></select>

                    <div className="valid-feedback">
                      City selected!!
                    </div>
                    <div className="invalid-feedback">
                      Please select city!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Zip code</label>
                    <input name="zip_code" type="number" className="form-control form-control-sm" id="zipCode" onChange={validatezipCode} placeholder="Enter zip code" required />
                    <div className="valid-feedback">
                      Correct zip code!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid zip code!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Address</label>
                    <textarea name="address" className="form-control form-control-sm" rows="3" cols="20" onChange={checkField} id="address" required></textarea>
                    <div className="valid-feedback">
                      Correct address!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid address!!
                    </div>

                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Orgnisation description</label>
                    <textarea name="org_description" className="form-control form-control-sm " rows="3" cols="20" onChange={checkField} id="description" required ></textarea>
                    <div className="valid-feedback">
                      Correct description!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid description!!
                    </div>
                  </div>



                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Owner name</label>
                    <input name="owner_name" type="text" className="form-control form-control-sm" id="ownerName" onChange={validateName} placeholder="Enter owner name" required />
                    <div className="valid-feedback">
                      Correct owner name!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid owner name!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6  p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Dealer name</label>
                    <input name="dealer_name" type="text" className="form-control form-control-sm" id="dealerName" onChange={validateName} placeholder="Enter dealer name" required />
                    <div className="valid-feedback">
                      Correct dealer name!!
                    </div>
                    <div className="invalid-feedback">
                      Incorrect dealer name!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1 ">Dealer email</label>
                    <input name="dealer_email" type="email" className="form-control form-control-sm" id="dealer_email" onChange={(e) => { validateEmail(e); setEmail(e.target.value); }} placeholder="Enter dealer email" required />
                    <div className="valid-feedback">
                      Correct dealer email!!
                    </div>
                    <div className="invalid-feedback">
                      Incorrect dealer email!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Dealer contact number</label>
                    <input name="dealer_contact" type="number" className="form-control form-control-sm" id="phoneNumber" onChange={validatePhnNumber} placeholder="Enter contact number" required />
                    <div className="valid-feedback">
                      Correct phone number!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid phone number!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-6 mt-1  p-1">
                    <div className="d-grid gap-2">
                      <button
                        type="reset"
                        name=""
                        id=""
                        className="btn btn-danger"
                      >
                        Reset
                      </button>
                    </div>

                  </div>

                  <div className=" col-12 col-md-6 mt-1 mb-1 p-1">
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        name=""
                        id=""
                        className="btn btn-success"
                      >
                        Get OTP
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>
            <div id="imageColumn" className="col-12 col-lg-5"  >
              <img src={factory} alt="" className="w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>OTP varification</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input type="text"
            name="otp"
            id="otpfield"
            placeholder="Enter otp"
          />
          <p>AN OTP is been sent on {orgObj.dealer_email}. Please Check ypur email.</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitData}>
            <span className="spinner-border spinner-border-sm d-none" id="spinner" role="status" aria-hidden="true"></span>
            &nbsp; {varifyText}</Button>
        </Modal.Footer>
      </Modal>
    </>);
}
export default OrgSingUp;