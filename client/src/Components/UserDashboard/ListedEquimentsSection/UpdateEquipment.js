import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddEquipment.css";
import Equipmentimage from "../../../assets/Equipment.jpg"
import { UpdateEquipment } from "../../../store/userSlice";
import Swal from "sweetalert2";
import jscookie from "js-cookie"
import state_arr from "../../../City.js";
import s_a from "../../../City.js";





var checkFields = false,
    equipmentname = false,
    modelnumber = false,
    state = false,
    city = false,
    city = false,
    image = false,
    address = false,
    description = false,
    equipmenttype = false,
    price = false,
    condition = false

function UpdateEquipmentModal(props) {
    const { Equipment, getEquipments } = props;
    const [lgShow, setLgShow] = useState(false);
    const [UpdateEquipmentObj, setUpdateEquipment] = useState(false);

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
    const print_city = (event, city_id) => {
        var { name, value } = event.target;
        var state_index = event.target.selectedIndex;
        console.log('event ', event.target.selectedIndex);
        var option_str = document.getElementById(city_id);
        option_str.length = 0;
        option_str.options[0] = new Option('Select City', '');
        option_str.selectedIndex = 0;
        var city_arr = s_a.s_a[state_index].split("|");
        for (var i = 0; i < city_arr.length; i++) {
            option_str.options[option_str.length] = new Option(city_arr[i], city_arr[i]);
        }
        checkField(event);
    }



    function validateName(event) {
        const pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
        var EquipmentName = document.getElementById("EquipmentName");
        if (pattern.test(event.target.value)) {
            const { name, value } = event.target;
            setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() })
            EquipmentName.classList.add('is-valid');
            EquipmentName.classList.remove('is-invalid');
            checkFields = true;
            if (event.target.name === "equipmentname") {
                equipmentname = true;
            }
        }
        else {
            EquipmentName.classList.remove('is-valid');
            EquipmentName.classList.add('is-invalid');
            checkFields = false;
            if (event.target.name === "equipmentname") {
                equipmentname = false;
            }
        }
        if (event.target.value === "") {
            EquipmentName.classList.remove('is-valid');
            EquipmentName.classList.remove('is-invalid');
            checkFields = false
        }
    }

    function validateModelNumber(event) {
        const pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
        var EquipmentModelNumber = document.getElementById("EquipmentModelNumber");
        if (pattern.test(event.target.value.trim())) {
            const { name, value } = event.target;
            setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() })
            EquipmentModelNumber.classList.add('is-valid');
            EquipmentModelNumber.classList.remove('is-invalid');
            checkFields = true;
            if (event.target.name === "modelnumber") {
                modelnumber = true;
            }
        }
        else {
            EquipmentModelNumber.classList.remove('is-valid');
            EquipmentModelNumber.classList.add('is-invalid');
            checkFields = false;
            if (event.target.name === "modelnumber") {
                modelnumber = false;
            }
        }
        if (event.target.value === "") {
            EquipmentModelNumber.classList.remove('is-valid');
            EquipmentModelNumber.classList.remove('is-invalid');
            checkFields = false;
        }
    }
    function validatePrice(event) {
        const pattern = /^\d+(\.\d{2})?$/;
        var Equipmentprice = document.getElementById("Equipmentprice");
        if (pattern.test(event.target.value.trim())) {
            const { name, value } = event.target;
            setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() })
            Equipmentprice.classList.add('is-valid');
            Equipmentprice.classList.remove('is-invalid');
            checkFields = true
            if (event.target.name === "price") {
                price = true;
            }
        }
        else {
            Equipmentprice.classList.remove('is-valid');
            Equipmentprice.classList.add('is-invalid');
            checkFields = false;
            if (event.target.name === "price") {
                price = false;
            }

        }
        if (event.target.value === "") {
            Equipmentprice.classList.remove('is-valid');
            Equipmentprice.classList.remove('is-invalid');
            checkFields = false;
        }
    }

    function validateQuantityField(e) {
        const pattern = /^[1-9]\d*$/;
        const quantityField = document.getElementById(e.target.id);
        const { name, value } = e.target;
        const trimmedValue = value.trim();
        if (pattern.test(trimmedValue)) {
            setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() })
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
    function checkField(event) {
        const field = document.getElementById(event.target.id)
        if (event.target.value.trim() === "" || event.target.value === "null") {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');

            if (event.target.name === "state") {
                state = false;
            }
            else if (event.target.name === "city") {
                city = false;
            }
            else if (event.target.name === "equpmentimage") {
                image = false;
            }
            else if (event.target.name === "address") {
                address = false;
            }
            else if (event.target.name === "description") {
                description = false;
            }
            else if (event.target.name === "equipmenttype") {
                equipmenttype = false;
            }
            else if (event.target.name === "condition") {
                condition = false;
            }

        }
        else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
            const { name, value } = event.target;

            if (event.target.type === "file") {
                const equipImg = event.target.files[0];
                setUpdateEquipment({ ...UpdateEquipmentObj, [name]: equipImg })

            } else {
                setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() })


                if (event.target.name === "state") {
                    state = true;
                }
                else if (event.target.name === "city") {
                    city = true;
                }
                else if (event.target.name === "equpmentimage") {
                    image = true;
                }
                else if (event.target.name === "address") {
                    address = true;
                }
                else if (event.target.name === "description") {
                    description = true;
                }
                else if (event.target.name === "equipmenttype") {
                    equipmenttype = true;
                }
                else if (event.target.name === "condition") {
                    condition = true;
                }
            }
            if (event.target.value === "" && event.target.type !== "textarea") {
                field.classList.remove('is-invalid');
            }
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateEquipment({ ...UpdateEquipmentObj, [name]: value.trim() });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (var key in UpdateEquipmentObj) {
            if (UpdateEquipmentObj[key]) {
                formData.append(key, UpdateEquipmentObj[key]);
            }
        }
        const userEmail = jscookie.get("userEmail");
        if (userEmail) {
            formData.append("userEmail", userEmail);
            formData.append("_id", Equipment._id);
        }

        UpdateEquipment(formData).then((data) => {
            if (data.message == "success") {
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Add Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                getEquipments();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Unavailable to Add Grain. Please try Again...",
                });
            }
            setLgShow(false)
        }).catch((err) => {
            console.log("err", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unavailable to Add Grain. Please try Again...",
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
                    <Modal.Title id="example-modal-sizes-title-lg" className="darkgreen">
                        Update Equipment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="row m-0 w-100 p-0">
                        <div className="col-12 col-lg-7 col-md-12  p-3" id="equipmentcol" >
                            <form
                                className="row g-1 needs-validation"
                                id="dataForm"
                                noValidate
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
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
                                            placeholder="Enter Equipment Name "
                                            type="text"
                                            className="form-control form-control-sm mb-1"
                                            id="EquipmentName"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="name"
                                            defaultValue={Equipment.equipmentname}
                                            onChange={(event) => { validateName(event); handleChange(event) }}

                                        />
                                        <div className="valid-feedback">
                                            Looks good!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please choose a Equipment name.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Model No.
                                    </label>
                                    <input
                                        placeholder="Enter Model Number "
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                        id="EquipmentModelNumber"
                                        required
                                        name="modelnumber"
                                        defaultValue={Equipment.modelnumber}
                                        onChange={(event) => { validateModelNumber(event); handleChange(event) }}
                                    />
                                    <div className="valid-feedback">
                                        Looks good!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid Model No.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Equipment Type
                                    </label>

                                    <select name="equipmenttype" defaultValue={Equipment.equipmenttype} onChange={(event) => { checkField(event); handleChange(event) }} id="equipmenttype" className="form-control form-control-sm">
                                        <option value="null">Select Equipment Type</option>
                                        <option value="Vehical">Vehical</option>
                                        <option value="Equipment">Equipment</option>
                                    </select>
                                    <div className="valid-feedback">
                                        selected!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please select Equipment !!
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustomUsername"
                                        className="form-label midgreen"
                                    >
                                        Price(per hours)
                                    </label>
                                    <div className="has-validation">
                                        <input
                                            placeholder="Enter price per hours"
                                            type="number"
                                            className="form-control form-control-sm mb-1"
                                            id="Equipmentprice"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="price"
                                            defaultValue={Equipment.price}

                                            onChange={(event) => { validatePrice(event); handleChange(event) }}
                                        />
                                        <div className="valid-feedback">
                                            looks good!!
                                        </div>
                                        <div className="invalid-feedback">
                                            Please give price.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Condition
                                    </label>
                                    <select name="condition" defaultValue={Equipment.condition} onChange={(event) => { checkField(event); handleChange(event) }} id="condition" className="form-control form-control-sm">
                                        <option value="null">Select Condition</option>
                                        <option value="Good">Good</option>
                                        <option value="Modrate">Moderate</option>
                                        <option value="Bad">Bad</option>
                                    </select>
                                    <div className="valid-feedback">
                                        Condition selected!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please select Condition!!
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
                                        className="form-control form-control-sm mb-1"
                                        id="quantity"
                                        name="quantity"
                                        defaultValue={Equipment.quantity}
                                        // onChange={validateQuantityField}
                                        onChange={(event) => { validateQuantityField(event); handleChange(event) }}
                                        required
                                    />
                                    <div className="valid-feedback">
                                        look good!!.
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a Quantity.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        State
                                    </label>
                                    <select type="text" className="form-control form-control-sm mb-1 form-control-sm" defaultValue={Equipment.state} name="state" id="state" onChange={(event) => { print_city(event, 'city');  handleChange(event) }}></select>
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
                                    <select name="city" defaultValue={Equipment.city} onChange={(event) => { checkField(event); handleChange(event) }} id="city" className="form-control form-control-sm mb-1 form-control-sm">
                                     </select>
                                    <div className="valid-feedback">
                                        City selected!!
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
                                        Address
                                    </label>
                                    <input
                                        placeholder="Enter Address"
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                        id="address"
                                        name="address"
                                        defaultValue={Equipment.address}
                                        onChange={checkField}
                                        required
                                    />
                                    <div className="valid-feedback">
                                        Correct Address!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide address.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1">
                                    <label
                                        htmlFor="validationCustom03"
                                        className="form-label midgreen"
                                    >
                                        Equipment Image
                                    </label>
                                    <input
                                        placeholder="Upload Image"
                                        type="file"
                                        className="form-control form-control-sm mb-1"
                                        id="equipmentimage"
                                        name="image"
                                        onChange={checkField}
                                        required
                                    />
                                    <div className="valid-feedback">
                                        look good!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a Image.
                                    </div>
                                </div>

                                <div className="col-12  p-1">
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
                                        name="description"
                                        defaultValue={Equipment.description}
                                        onChange={(event) => { checkField(event); handleChange(event) }}
                                        required
                                    />
                                    <div className="valid-feedback">
                                        look good!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid Description.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1  mt-1">
                                    <div className="d-grid gap-2">
                                        <button type="reset" name="" id="Submitbtn" className="btn btn-danger btn-sm" >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 p-1  mt-1">
                                    <div className="d-grid gap-2">
                                        <button type="submit" name="" id="Submitbtn" className="btn btn-success btn-sm" >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-12  col-lg-5 m-0 p-0" id="imgcol-equi">
                            <img src={Equipmentimage} className="img-fluid " alt="" />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default UpdateEquipmentModal;
