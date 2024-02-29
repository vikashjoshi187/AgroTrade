import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import jscookie from "js-cookie"
import Swal from "sweetalert2";
import { UpdateColdSt } from "../../../store/userSlice"
import "./ColdStorageLand.css";
import state_arr from "../../../City.js";
import s_a from "../../../City.js";



var checkFields=false,
  landTitle=false,
  agriType=false,
  soilType=false,
  suitableFor=false,
  rent=false,
  avilableFrom=false,
  avilableTill=false,
  address=false,
  city=false,
  state=false,
  infrastructure=false,
  image=false,
  image360=false,
  description=false,
  area=false,
  zipCode=false


function UpdateColdStModal(props) {
    const [lgShow, setLgShow] = useState(false);
    const [addColdStLandObj, setAddColdStLand] = useState(false);
    const { getcoldSts, ColdSt } = props

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
    
      function validateName(e) {
        const pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
        var LandTitle = document.getElementById(e.target.id);
        if (pattern.test(e.target.value)) {
          const { name, value } = e.target;
          setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
          LandTitle.classList.add('is-valid');
          LandTitle.classList.remove('is-invalid');
          checkFields = true;
          if (e.target.name === "landTitle") {
            landTitle = true;
          }
          else if (e.target.name === "suitableFor") {
            suitableFor = true;
          }
        }
        else {
          LandTitle.classList.remove('is-valid');
          LandTitle.classList.add('is-invalid');
          checkFields = false;
          if (e.target.name === "landTitle") {
            landTitle = false;
          }
          if (e.target.name === "suitableFor") {
            suitableFor = false;
          }
    
        }
        if (e.target.value === "") {
          LandTitle.classList.remove('is-valid');
          LandTitle.classList.remove('is-invalid');
          checkFields = false
        }
      }
    
    
      function validatePrice(e) {
    
    
        const pattern = /^[1-9]\d*(\.\d{1,2})?$/;
        var RentField = document.getElementById("rent");
        if (pattern.test(e.target.value.trim())) {
          const { name, value } = e.target;
          setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
          RentField.classList.add('is-valid');
          RentField.classList.remove('is-invalid');
          checkFields = true
          if (e.target.name === "rent") {
            rent = true;
          }
        }
        else {
          RentField.classList.remove('is-valid');
          RentField.classList.add('is-invalid');
          checkFields = false;
          if (e.target.name === "rent") {
            rent = false;
          }
    
        }
        if (e.target.value === "") {
          RentField.classList.remove('is-valid');
          RentField.classList.remove('is-invalid');
          checkFields = false;
        }
      }
    
      function validateAreaField(e) {
        const pattern = /^[1-9]\d*$/;
        const quantityField = document.getElementById("landarea");
    
        const { name, value } = e.target;
        const trimmedValue = value.trim();
    
        if (pattern.test(trimmedValue)) {
          setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
          quantityField.classList.add('is-valid');
          quantityField.classList.remove('is-invalid');
          checkFields = true;
          if (e.target.name === 'area') {
            area = true;
          }
        } else {
          quantityField.classList.remove('is-valid');
          quantityField.classList.add('is-invalid');
          checkFields = false;
          if (e.target.name === "area") {
            area = false;
          }
        }
    
        if (e.target.value === "") {
          quantityField.classList.remove('is-valid');
          quantityField.classList.remove('is-invalid');
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
          else if (e.target.name === "image") {
            image = false;
          }
          else if (e.target.name === "image360") {
            image360 = false;
          }
          else if (e.target.name === "address") {
            address = false;
          }
          else if (e.target.name === "description") {
            description = false;
          }
    
          else if (e.target.name === "infrastructure") {
            infrastructure = false;
          }
          else if (e.target.name === "avilableFrom") {
            avilableFrom = false;
          }
          else if (e.target.name === "avilableTill") {
            avilableTill = false;
          }
    
        }
        else {
          field.classList.add('is-valid');
          field.classList.remove('is-invalid');
          const { name, value } = e.target;
    
          if (e.target.type === "file") {
            const grainimgImg = e.target.files[0];
            setAddColdStLand({ ...addColdStLandObj, [name]: grainimgImg })
    
          } else {
            setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
          }
    
          if (e.target.name === "state") {
            state = true;
          }
          else if (e.target.name === "city") {
            city = true;
          }
          else if (e.target.name === "image") {
            image = true;
          }
          else if (e.target.name === "image360") {
            image360 = true;
          }
          else if (e.target.name === "address") {
            address = true;
          }
          else if (e.target.name === "description") {
            description = true;
          }
          else if (e.target.name === "infrastructure") {
            infrastructure = true;
          }
          else if (e.target.name === "avilableFrom") {
            avilableFrom = true;
          }
          else if (e.target.name === "avilableTill") {
            avilableTill = true;
          }
        }
        if (e.target.value === "" && e.target.type !== "textarea") {
          field.classList.remove('is-invalid');
        }
      }
    
    
      function validatezipCode(e) {
        const pattern = /^[1-9][0-9]{5}$/;
        var zipCode = document.getElementById(e.target.id);
        if (pattern.test(e.target.value)) {
          const { name, value } = e.target;
          setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
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
    
    
    


    // function checkFields(e) {
    //     const { name, value } = e.target;

    //     if (e.target.type === "file") {
    //         const grainimgImg = e.target.files[0];
    //         setAddColdStLand({ ...addColdStLandObj, [name]: grainimgImg })
    //     } else {
    //         setAddColdStLand({ ...addColdStLandObj, [name]: value.trim() })
    //     }
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        for (var key in addColdStLandObj) {
            if (addColdStLandObj[key]) {
                formData.append(key, addColdStLandObj[key]);
            }
        }

        const userEmail = jscookie.get("userEmail");
        if (userEmail) {
            formData.append("userEmail", userEmail);
            formData.append("_id", ColdSt._id);
        }

        UpdateColdSt(formData).then((data) => {
            if (data.message == "success") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Update ColdStorage Land Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                getcoldSts();

            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Unavailable to Update ColdStorage. Please try Again...",
                });
            }
            setLgShow(false)
        }).catch((err) => {
            console.log("err", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unavailable to Update ColdStorage. Please try Again...",
            });
            setLgShow(false)
        })
    }
    return (
        <>
             <button type="button" onClick={() => {
                setLgShow(true)
                setTimeout(print_state, 1000);
            }}
            name="" id="" className="btn btn-outline-success btn-sm" ><i class="bi bi-arrow-up-circle"></i>&nbsp;Update</button>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg ">
                        <h4 className="midgreen">Add ColdStorage Land</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="row m-0 w-100 p-0">
                        <div className="col-12 col-lg-7  p-3" >
                            <form
                                className="row g-1 needs-validation"
                                id="dataForm" onSubmit={handleSubmit}
                                noValidate
                            >
                                <div className="col-12 col-md-6 p-1 mt-1">
                                <label
                                    htmlFor="validationCustomUsername"
                                    className="form-label midgreen"
                                >
                                    Land Title
                                </label>
                                <div className="has-validation">
                                    <input
                                    placeholder="Enter Land Title"
                                    type="text"
                                    className="form-control form-control-sm mb-1"
                                    id="landTitle"
                                    aria-describedby="inputGroupPrepend"
                                    name="landTitle"
                                    defaultValue={ColdSt. landTitle}
                                    onChange={validateName}
                                    required
                                    />
                                    <div className="invalid-feedback">
                                    Please choose a Land Title.
                                    </div>
                                </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustomUsername"
                                        className="form-label midgreen"
                                    >
                                        Area
                                    </label>
                                    <div className="has-validation">
                                            <input
                                            placeholder="Enter land area"
                                            type="number"
                                            className="form-control form-control-sm mb-1"
                                            id="landarea"
                                            aria-describedby="inputGroupPrepend"
                                            name="area"
                                            defaultValue={ColdSt.area}
                                            onChange={validateAreaField}
                                            required
                                            />
                                        <div className="invalid-feedback">
                                            Please choose a Area.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Address (Street)
                                    </label>
                                    <input
                                        placeholder="Enter land Address"
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                        id="address"
                                        required
                                        onChange={checkField}
                                        defaultValue={ColdSt.address}
                                        name="address"
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid Address.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        State
                                    </label>
                                    {/* <select name="state" defaultValue={ColdSt.state} onChange={checkFields} id="state" className="form-control form-control-sm">
                                        <option value="null">Selecet State</option>
                                        <option value="mp">Mp</option>
                                        <option value="up">Up</option>
                                    </select> */}
                                     <select type="text" className="form-control form-control-sm mb-1 form-control-sm"  defaultValue={ColdSt.state} name="state" id="state" onChange={(e) => { print_city(e, 'city') }}></select>
                
                                    <div className="valid-feedback">
                                        valid State.
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid State.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        City
                                    </label>
                                    <select className="form-control form-control-sm mb-1 form-control-sm" name="city" id="city" onChange={checkField} ></select>
                 
                                    {/* <select name="city" defaultValue={ColdSt.city} onChange={checkFields} id="city" className="form-control form-control-sm">
                                        <option value="null">Selecet City</option>
                                        <option value="indore">Indore</option>
                                        <option value="bhopal">Bhopal</option>
                                    </select> */}
                                    <div className="valid-feedback">
                                        valid city.
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Pin code
                                    </label>
                                    <input
                                        placeholder="Enter your Pin code"
                                        type="number"
                                        className="form-control form-control-sm mb-1"
                                        id="validationCustom03"
                                        name="pincode" onChange={checkFields}
                                        defaultValue={ColdSt.pincode}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid Pincode.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Rent
                                    </label>
                                    <input
                                        placeholder="Enter Rent per month"
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                        id="validationCustom03"
                                        required
                                        name="rent" onChange={checkFields}
                                        defaultValue={ColdSt.rent}
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid Rent.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Infrastructure
                                    </label>

                                    <select name="infrastructure" defaultValue={ColdSt.infrastructure} className="form-control form-control-sm mb-2 form-control-sm" onChange={checkField} id="infrastructure" >
                                        <option value="null">Select Infrastructure</option>
                                        <option value="Good">Good</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Bad">Bad</option>
                                    </select>
                                    <div className="valid-feedback">
                                        Infrastructure selected!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please select Infrastructure !!
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Land Image
                                    </label>
                                    <input
                                        placeholder="Upload Image"
                                        type="file"
                                        className="form-control form-control-sm mb-1"
                                        id="image"
                                        required onChange={checkField}
                                        name="image"
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid Image.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="validationCustom03" className="form-label midgreen" >
                                        Avilable from
                                    </label>
                                    <input type="date" min={Date.now()} name="avilableFrom" onChange={checkField} className="form-control  form-control-sm mb-1" id="avilableFrom" required />
                                    <div className="valid-feedback">
                                        Looks Good
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a date.
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="validationCustom03" className="form-label midgreen" >
                                        Avilable till
                                    </label>
                                    <input type="date" min={Date.now()} name="avilableTill" onChange={checkField} className="form-control  form-control-sm mb-1" id="avilableTill" required />
                                    <div className="valid-feedback">
                                        Looks Good
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a date.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="validationCustom03" className="form-label midgreen" >
                                        <i class="fa-solid fa-street-view"></i>&nbsp;360 Image
                                    </label>
                                    <input placeholder="Upload Image" type="file" className="form-control form-control-sm mb-1" id="image360" name="image360" onChange={checkField} required
                                    />
                                    <p className="fs-6 text-danger " >Provide 360 image if avilable</p>
                                    <div className="valid-feedback">
                                        Looks Goods
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a Image.
                                    </div>
                                </div>
                                <div className="col-12 mt-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Enter description"
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                        id="description"
                                        onChange={checkField}
                                        name="description"
                                        defaultValue={ColdSt.description}
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid description.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6  columns signupbtn-col mt-5">
                                    <div className="d-grid gap-2">
                                        <button type="reset" name="" id="Submitbtn" className="btn btn-danger btn-sm" >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6  columns signupbtn-col mt-5">
                                    <div className="d-grid gap-2">
                                        <button type="submit" name="" id="Submitbtn" className="btn btn-success btn-sm" >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-12  col-lg-5 m-0 p-0" id="imgcol-grain">
                            <img src={"http://localhost:3000/" + ColdSt.image} className="w-100 imgcol-grain-img " alt={ColdSt.image} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateColdStModal;
