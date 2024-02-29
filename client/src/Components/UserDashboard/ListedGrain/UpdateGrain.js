import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddGrain.css";
import Swal from "sweetalert2";
import jscookie from "js-cookie"
import grainimg from "../../../assets/grainimg.webp";
import { UpdateGrain } from "../../../store/userSlice"
import state_arr from "../../../City.js";
import s_a from "../../../City.js";


var checkFields = false,
  state = false,
  city = false,
  image = false,
  description = false,
  grainname = false,
  graintype = false,
  quantity = false,
  price = false,
  selflife = false,
  moisturelevel = false,
  grain = false


function UpdateGrainModal(props) {
  const { Grain, getGrians } = props;
  const [lgShow, setLgShow] = useState(false);
  const [UpdateGrainObj, setUpdateGrain] = useState(false);

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
    const pattern = /^[a-zA-Z ]+$/;
    var grainName = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      grainName.classList.add('is-valid');
      grainName.classList.remove('is-invalid');
      checkFields = true;
      if (e.target.name === "grainname") {
        grainname = true;
      }
    }
    else {
      grainName.classList.remove('is-valid');
      grainName.classList.add('is-invalid');
      checkFields = false;
      if (e.target.name === "grainname") {
        grainname = false;
      }
    }
    if (e.target.value === "") {
      grainName.classList.remove('is-valid');
      grainName.classList.remove('is-invalid');
      checkFields = false;
    }
  }

  function validateShelfLife(e) {
    const pattern = /^[1-9]\d*$/
    var grainShelfLife = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      grainShelfLife.classList.add('is-valid');
      grainShelfLife.classList.remove('is-invalid');
      checkFields = true;
      if (e.target.name === "selflife") {
        selflife = true;
      }
    }
    else {
      grainShelfLife.classList.remove('is-valid');
      grainShelfLife.classList.add('is-invalid');
      checkFields = false;
      if (e.target.name === "selflife") {
        selflife = false;
      }
    }
    if (e.target.value === "") {
      grainShelfLife.classList.remove('is-valid');
      grainShelfLife.classList.remove('is-invalid');
      checkFields = false;
    }
  }


  function validateGrainType(e) {
    const pattern = /^(?=.*[a-zA-Z])[\w\d\s]+$/;
    var grainType = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      grainType.classList.add('is-valid');
      grainType.classList.remove('is-invalid');
      checkFields = true;
      if (e.target.name === "graintype") {
        graintype = true;
      }
    }
    else {
      grainType.classList.remove('is-valid');
      grainType.classList.add('is-invalid');
      checkFields = false;
      if (e.target.name === "graintype") {
        graintype = false;
      }
    }
    if (e.target.value === "") {
      grainType.classList.remove('is-valid');
      grainType.classList.remove('is-invalid');
      checkFields = false;
    }
  }


  function validateMoistureLevel(e) {
    const pattern = /^(100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)%?$/;
    var MoiField = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      // Remove the percentage sign before storing in the object
      const trimmedValue = value.trim().replace('%', '');
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      MoiField.classList.add('is-valid');
      MoiField.classList.remove('is-invalid');
      checkFields = true;
    } else {
      MoiField.classList.remove('is-valid');
      MoiField.classList.add('is-invalid');
      checkFields = false;
    }
    if (e.target.value === "") {
      MoiField.classList.remove('is-valid');
      MoiField.classList.remove('is-invalid');
      checkFields = false;
    }
  }


  function validateQuantityField(e) {
    const pattern = /^[1-9]\d*$/;
    const quantityField = document.getElementById(e.target.id);

    const { name, value } = e.target;
    const trimmedValue = value.trim();

    if (pattern.test(trimmedValue)) {
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      quantityField.classList.add('is-valid');
      quantityField.classList.remove('is-invalid');
      checkFields = true;
    } else {
      quantityField.classList.remove('is-valid');
      quantityField.classList.add('is-invalid');
      checkFields = false;
    }

    if (value === "") {
      quantityField.classList.remove('is-valid');
      quantityField.classList.remove('is-invalid');
      checkFields = false;
    }
  }



  function validatePriceField(e) {
    const pattern = /^[1-9]\d*(\.\d{1,2})?$/;
    const priceField = document.getElementById(e.target.id);

    const { name, value } = e.target;
    const trimmedValue = value.trim();

    if (pattern.test(trimmedValue)) {
      setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
      priceField.classList.add('is-valid');
      priceField.classList.remove('is-invalid');
      checkFields = true;
    } else {
      priceField.classList.remove('is-valid');
      priceField.classList.add('is-invalid');
      checkFields = false;
    }

    if (value === "") {
      priceField.classList.remove('is-valid');
      priceField.classList.remove('is-invalid');
      checkFields = false;
    }
  }


  function handleRadioChange(e) {
    const field = document.getElementById(e.target.id)
    if (e.target.value.trim() === "" || e.target.value === "null") {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      if (e.target.name === "grain") {
        grain = false;
      }
    }
    const { name, value } = e.target;
    setUpdateGrain({ ...UpdateGrainObj, [name]: value })
    if (e.target.value === 'organic') {
      Grain['grain'] = 'organic';
    } else {
      Grain['grain'] = 'inorganic';
    }
    if (e.target.name === "grain") {
      grain = false;
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
      else if (e.target.name === "description") {
        description = false;
      }
    }
    else {
      field.classList.add('is-valid');
      field.classList.remove('is-invalid');
      const { name, value } = e.target;

      if (e.target.type === "file") {
        const grainimgImg = e.target.files[0];
        setUpdateGrain({ ...UpdateGrainObj, [name]: grainimgImg })
      } else {
        setUpdateGrain({ ...UpdateGrainObj, [name]: value.trim() })
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
      else if (e.target.name === "description") {
        description = true;
      }
    }
    if (e.target.value === "" && e.target.type !== "textarea") {
      field.classList.remove('is-invalid');
    }
  }


  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (var key in UpdateGrainObj) {
      if (UpdateGrainObj[key]) {
        formData.append(key, UpdateGrainObj[key]);
      }
    }

    const userEmail = jscookie.get("userEmail");
    if (userEmail) {
      formData.append("userEmail", userEmail);
      formData.append("_id", Grain._id);
    }

    UpdateGrain(formData).then((data) => {
      if (data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 2000
        });
        getGrians();
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unavailable to Update Grain. Please try Again...",
        });
      }
      setLgShow(false)
    }).catch((err) => {
      console.log("err", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unavailable to Update Grain. Please try Again...",
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
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Grain

          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" id="modal-body">
          <div className="row m-0 w-100 p-0">
            <div className="col-12 col-lg-7 col-md-12  p-3" id="graincol" >
              <form
                className="row g-1 needs-validation"
                id="dataForm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label midgreen"
                  >
                    Name
                  </label>
                  <div className="has-validation">
                    <input
                      placeholder="Enter Grain Name "
                      type="text"
                      name="grainname"
                      className="form-control form-control-sm mb-1"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
                      defaultValue={Grain.grainname}
                      onChange={validateName}
                    />
                    <div className="invalid-feedback">
                      Please choose a Grainname.
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Type
                  </label>
                  <input
                    placeholder="Enter Type "
                    type="text"
                    name="graintype"
                    className="form-control form-control-sm mb-1"
                    id="graintype"
                    defaultValue={Grain.graintype}
                    onChange={validateGrainType}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a valid Type.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Quantity
                  </label>
                  <input
                    placeholder="Enter Quantity"
                    type="number"
                    name="quantity"
                    className="form-control form-control-sm mb-1"
                    id="quantityField"
                    defaultValue={Grain.quantity}
                    onChange={validateQuantityField}
                    required
                  />
                  <div className="valid-feedback">
                    valid Quantity.
                  </div>
                  <div className="invalid-feedback">
                    Please provide a valid Quantity.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Shelf Life
                  </label>
                  <input
                    placeholder="Enter Shelf Life"
                    type="number"
                    name="selflife"
                    id="selflife"
                    className="form-control form-control-sm mb-1"
                    onChange={validateShelfLife}
                    defaultValue={Grain.selflife}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide a vaild Shelf Life.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Price(per quantel)
                  </label>

                  <input
                    placeholder="Enter Your Price per Quantel"
                    type="number"
                    className="form-control form-control-sm mb-1"
                    id="price"
                    name="price"
                    onChange={validatePriceField}
                    defaultValue={Grain.price}
                    required
                  />
                  <div className="valid-feedback">
                    looks good!!
                  </div>
                  <div className="invalid-feedback">
                    Please enter price!!
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Moisture Level
                  </label>
                  <input
                    placeholder="Enter Moisture Level"
                    type="text"
                    className="form-control form-control-sm mb-1"
                    id="moisturelevel"
                    name="moisturelevel"
                    onChange={validateMoistureLevel}
                    defaultValue={Grain.moisturelevel}
                    required
                  />
                  <div className="valid-feedback">
                    Correct !!
                  </div>
                  <div className="invalid-feedback">
                    Invalid!!
                  </div>
                </div>


                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    State
                  </label>
                  <select type="text" defaultValue={Grain.state} className="form-controlform-control-sm mb-1 form-control-sm" name="state" id="state" onChange={(e) => { print_city(e, 'city') }}></select>
                  <div className="valid-feedback">
                    valid State.
                  </div>
                  <div className="invalid-feedback">
                    Please provide a valid State.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    City
                  </label>
                   <select className="form-control form-control-sm mb-1 form-control-sm" defaultValue={Grain.city} name="city" id="city" onChange={checkField} ></select>
                  <div className="valid-feedback">
                    valid city.
                  </div>
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Grain Image
                  </label>
                  <input
                    placeholder="Upload Image"
                    type="file"
                    className="form-control form-control-sm mb-1"
                    id="image"
                    name="image"
                    // defaultValue={Grain.image}
                    onChange={checkField}
                    required
                  />
                  <div className="valid-feedback">
                    looks good!!.
                  </div>
                  <div className="invalid-feedback">
                    Please provide a image.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-1">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                  </label><br />
                  <input id="organic" className="m-2 mt-3" type="radio" name="grain" value="organic" checked={Grain.grain === 'organic'} onChange={handleRadioChange} />
                  <label htmlFor="organic">Organic</label>
                  <input id="inorganic" className="m-2 mt-3" type="radio" name="grain" value="inorganic" checked={Grain.grain === 'inorganic'} onChange={handleRadioChange} />
                  <label htmlFor="inorganic">Inorganic</label>
                  <div className="invalid-feedback">
                    Please provide correct.
                  </div>
                </div>

                <div className="col-12 ">
                  <label
                    htmlFor="validationCustom03"
                    className="form-label midgreen"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    type="text"
                    name="description"
                    className="form-control form-control-sm mb-1"
                    id="description"
                    defaultValue={Grain.description}
                    onChange={checkField}
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide.
                  </div>
                </div>
                <div className="col-12 col-md-6 p-2 columns signupbtn-col mt-3">
                  <div className="d-grid gap-2">
                    <button type="reset" name="" id="Submitbtn" className="btn btn-danger btn-sm" >
                      Reset
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-2 columns signupbtn-col mt-3">
                  <div className="d-grid gap-2">
                    <button type="submit" name="" id="Submitbtn" className="btn btn-success btn-sm" >
                      Update
                    </button>
                  </div>
                </div>

              </form>
            </div>

            <div className="col-12  col-lg-5 m-0 p-0" id="imgcol-grain">
              <img src={"http://localhost:3000/" + Grain.image} className="w-100 imgcol-grain-img " alt="" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateGrainModal;