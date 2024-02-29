import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as PANOLENS from 'panolens';
import { useRef } from "react";
import imgs from "../../../../assets/leaves_Image.jpeg"
import jscookie from "js-cookie"
import { addAgriLand } from "../../../../store/userSlice";
import "./AddLand.css";
import Swal from "sweetalert2";
import state_arr from "../../../../City.js";
import s_a from "../../../../City.js";
import ListGroup from 'react-bootstrap/ListGroup';




var checkFields = false,
    landTitle = false,
    agriType = false,
    soilType = false,
    suitableFor = false,
    rent = false,
    avilableFrom = false,
    avilableTill = false,
    address = false,
    city = false,
    state = false,
    infrastructure = false,
    image = false,
    image360 = false,
    description = false,
    area = false,
    zipCode = false




function AddAgricultureLand(props) {
    const { sendLands } = props;
    const [lgShow, setLgShow] = useState(false);
    const [landData, setlandData] = useState({})
    var newGrain=useRef();
    const print_state = () => {
        var option_str = document.getElementById("state");

        // option_str.length = 0;
        option_str.options[0] = new Option('Select State', '');
        option_str.selectedIndex = 0;
        console.log('', state_arr.state_arr);
        for (var i = 0; i < state_arr.state_arr.length; i++) {
            option_str.options[option_str.length] = new Option(state_arr.state_arr[i], state_arr.state_arr[i]);
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
            setlandData({ ...landData, [name]: value.trim() })
            console.log("this is land data in name ",landData);
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
            setlandData({ ...landData, [name]: value.trim() })
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
            setlandData({ ...landData, [name]: value.trim() })
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
            else if (e.target.name === "soilType") {
                soilType = false;
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
                const landImg = e.target.files[0];
                setlandData({ ...landData, [name]: landImg })

            } else {
                setlandData({ ...landData, [name]: value.trim() })
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
            else if (e.target.name === "soilType") {
                soilType = true;
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
            setlandData({ ...landData, [name]: value.trim() })
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

    function handleSubmit(e) {
        console.log("this is land data in habdel submit",landData);
        e.preventDefault();
        const formData = new FormData();
        for (var key in landData) {

            if (landData[key]) {
                formData.append(key, landData[key]);
            }
        }

        
        const userEmail = jscookie.get("userEmail");
        if (userEmail) {
            formData.append("ownerEmail", userEmail);
        }
 
        addAgriLand(formData).then((data) => {
            if (data.message == "success") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Land Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                setLgShow(false)
                sendLands(data.Lands)
                Grains=[];
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Unavailable to Add Land. Please try Again...",
                });
            }
        }).catch((err) => {
            console.log("err", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unavailable to Add Land. Please try Again...",
            });
            setLgShow(false)
        })

    }

   


   if (landData.suitableFor) {
    var Grains=landData.suitableFor
   }
   else{
    var Grains=[]
   }
    function addNewGrain() {
        if (newGrain.current.value.trim()!="") {
            Grains.push(newGrain.current.value)
            setlandData({...landData,["suitableFor"]:[...Grains]});
            newGrain.current.value="";
        }
        
    }
  

    function removeGrain(index) {
        alert("dcjbh")
    //     console.log(Grains);
    //   landData.= Grains.splice(index,1)  
    //   console.log(Grains);      
    }

    return (
        <>
            <button type="button" onClick={() => {
                setLgShow(true)
                setTimeout(print_state, 1000);
            }}
                className="btn btn-outline-success btn-sm">
                <i class="bi bi-plus-lg"></i>&nbsp;Add Land
            </button>
            <Modal size="xl" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg" className="darkgreen">
                        Add Agriculture Land
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">

                    <div className="container  bg-white p-0 w-100"  >
                        <div className="row w-100 m-0 g-0 ">
                            <div className="col-12 col-lg-6 h-100 bg-danger"  >
                                <div className="image_container h-100" >
                                    <img src={imgs} className="w-100" alt="" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-6  p-3" >
                                <form className="row g-1 needs-validation" onSubmit={handleSubmit} noValidate>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustomUsername" className="form-label midgreen ">Land Title</label>
                                        <div className="has-validation">
                                            <input placeholder="Enter land title" type="text" className="form-control form-control-sm mb-1 " id="landTitle" name="landTitle" onChange={validateName} aria-describedby="inputGroupPrepend" required />
                                            <div className="valid-feedback">
                                                Looks Good.
                                            </div>
                                            <div className="invalid-feedback">
                                                Please add area .
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustomUsername" className="form-label midgreen ">Area</label>
                                        <div className="has-validation">
                                            <input placeholder="Enter land area" type="number" className="form-control form-control-sm mb-1 " id="landarea" name="area" onChange={validateAreaField} aria-describedby="inputGroupPrepend" required />
                                            <div className="valid-feedback">
                                                Looks Good.
                                            </div>
                                            <div className="invalid-feedback">
                                                Please add area .
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Agriculture Type
                                        </label>
                                        <select name="agriType" className="form-control form-control-sm mb-1 form-control-sm" onChange={checkField} id="agriType" >
                                            <option value="null">Select Agriculture Type</option>
                                            <option value="Organic">Organic</option>
                                            <option value="Inorganic">Inorganic</option>
                                        </select>
                                        <div className="valid-feedback">
                                            Looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid Agriculture Type.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Soil Type
                                        </label>
                                        <select name="soilType" className="form-control form-control-sm mb-1 form-control-sm" onChange={checkField} id="soilType" >
                                            <option value="null">Select Soil Type</option>
                                            <option value="Alluvial Soilod">Alluvial Soil</option>
                                            <option value="Black Cotton Soil">Black Cotton Soil</option>
                                            <option value="Red & Yellow Soil">Red & Yellow Soil</option>
                                            <option value="Laterite Soil">Laterite Soil</option>
                                            <option value="Mountainous or Forest Soil">Mountainous or Forest Soil</option>
                                            <option value="Arid or Desert Soil">Arid or Desert Soil</option>
                                            <option value="Saline and Alkaline Soil">Saline and Alkaline Soil</option>
                                            <option value="Peaty and Marshy Soil">Peaty and Marshy Soil</option>
                                        </select>
                                        <div className="valid-feedback">
                                            Look Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a Soil Type.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Rent per month
                                        </label>
                                        <input placeholder="Enter Crop for farming" type="number" name="rent" onChange={validatePrice} className="form-control  form-control-sm mb-1" id="rent" required />
                                        <div className="valid-feedback">
                                            Looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a rent.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Avilable from
                                        </label>
                                        <input placeholder="Enter Crop for farming" type="date" min={Date.now()} name="avilableFrom" onChange={checkField} className="form-control  form-control-sm mb-1" id="avilableFrom" required />
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
                                        <input placeholder="Enter Crop for farming" type="date" min={Date.now()} name="avilableTill" onChange={checkField} className="form-control  form-control-sm mb-1" id="avilableTill" required />
                                        <div className="valid-feedback">
                                            Looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a date.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Address (Street or landmark)
                                        </label>
                                        <input
                                            placeholder="Enter land Address"
                                            type="text"
                                            name="address"
                                            className="form-control form-control-sm mb-1"
                                            id="address"
                                            onChange={checkField}
                                            required
                                        />
                                        <div className="valid-feedback">
                                            looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide  Address.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 p-1">
                                        <label
                                            htmlFor="validationCustom03"
                                            className="form-label midgreen"
                                        >
                                            State
                                        </label>
                                        <select type="text" className="form-control form-control-sm mb-1 form-control-sm" name="state" id="state" onChange={(e) => { print_city(e, 'city') }}></select>
                                        <div className="valid-feedback">
                                            State selected!!
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
                                        <select className="form-control form-control-sm mb-1 form-control-sm" name="city" id="city" onChange={checkField} ></select>
                                        <div className="valid-feedback">
                                            City selected!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid city.
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >Pin code</label>
                                        <input
                                            placeholder="Enter your Pin code"
                                            type="number"
                                            name="zipCode"
                                            className="form-control form-control-sm mb-1"
                                            id="validationCustom03"
                                            onChange={validatezipCode}
                                            required
                                        />
                                        <div className="valid-feedback">
                                            Looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide pin code.
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen">
                                            Infrastructure
                                        </label>

                                        <select name="infrastructure" className="form-control form-control-sm mb-1 form-control-sm" onChange={checkField} id="infrastructure" >
                                            <option value="null">Select Infrastructure</option>
                                            <option value="Good">Good</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Bad">Bad</option>
                                        </select>
                                        <div className="valid-feedback">
                                            State selected!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please select Infrastucture !!
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="validationCustom03" className="form-label midgreen" >
                                            Land Image
                                        </label>
                                        <input
                                            placeholder="Upload Image"
                                            type="file"
                                            className="form-control form-control-sm mb-1"
                                            id="image"
                                            name="image"
                                            onChange={checkField}
                                            required
                                        />
                                        <div className="valid-feedback">
                                            Looks Goods
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a Image.
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
                                    <div className="col-12">
                                        <label htmlFor="validationCustom03" className="form-label midgreen"  >
                                            Description
                                        </label>
                                        <textarea placeholder="Enter description" name="description" onChange={checkField} type="text" className="form-control form-control-sm mb-1" id="description" required />
                                        <div className="valid-feedback">
                                            Looks Good
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a  Description.
                                        </div>
                                    </div>

                                    
                                    <div className="col-12 col-md-8 mb-2">
                                        <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                                            <input ref={newGrain} className="form-control form-control-sm" type="text" name="" placeholder="Add Grains" />
                                             <button onClick={addNewGrain} className="btn btn-sm btn-outline-success w-100" type="button">Add</button>
                                        </div>
                                   </div>

                                    <div  className="col-12 col-md-4 mb-5 p-1" style={{ maxHeight:"50px",overflowY:"scroll"}}>
                                    <ul class="list-group">
                                      {
                                        // useEffect(()=>{
                                            Grains.map((Grain,index)=>{
                                                return ( <li key={index} class="list-group-item d-flex justify-content-between  p-1 text-success list-group-item-success">{Grain}<button type=""  className="btn"><i class="bi bi-trash3 text-end text-danger"></i></button></li>)
                                            })

                                        // },[landData])
                                     
                                      }
                                    </ul>
                                   </div>


                                    <div className="col-12  columns signupbtn-col mt-2">
                                        <div className="d-grid gap-2">
                                            <button type="submit" name="" id="Submitbtn" className="btn btn-success " >
                                                Add Land
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-12  columns signupbtn-col">
                                        <div className="d-grid gap-2">
                                            <button type="reset" name="" className="btn btn-danger" >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default AddAgricultureLand;

