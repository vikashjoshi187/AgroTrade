import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import expert from "../../assets/expert.jpg"
import "./ExpertModal.css"
import { newExpert } from '../../store/expertSlice';
import { useDispatch, useSelector } from 'react-redux';

function ExpertModal({ setShow, show }) {
  var checkFields = false,
    consultancy_type = false,
    vedio_call = false,
    chats = false,
    education = false,
    certificate = false,
    consultancy_fee_video = false,
    fertilizer=false,
    seed=false,
    consultancy_field=false,
    experiences=false,
    consultancy_fee_chat = false;
  var expertObj = {}
  const dispatch = useDispatch();
 const userEmail=useSelector(state=>state.userSlice.userData)

  // const [expert,setExpert]=useState({})
  // const [show, setShow] = useState(false);


  function validateFee(e) {
    const pattern = /^\d{2,5}$/
    var fee = document.getElementById(e.target.id);
    if (pattern.test(e.target.value)) {
      const { name, value } = e.target;
      expertObj = { ...expertObj, [name]: value.trim() }
      fee.classList.add('is-valid');
      fee.classList.remove('is-invalid');
      if (e.target.name === 'consultancy_fee_video') {
        consultancy_fee_video = true;
        checkFields = true;
      }
      else if (e.target.name === 'consultancy_fee_chat') {
        consultancy_fee_chat = true;
        checkFields = true;
      }

    }
    else {
      fee.classList.remove('is-valid');
      fee.classList.add('is-invalid');
      checkFields = false;
    }
    if (e.target.value === "") {
      fee.classList.remove('is-valid');
      fee.classList.remove('is-invalid');
      checkFields = false;
    }
  }

  function validateExperience(e) {
    var experience = document.getElementById(e.target.id);
    if ((e.target.value)>0&&e.target.value<50) {
      const { name, value } = e.target;
      expertObj = { ...expertObj, [name]: value.trim() }
      experience.classList.add('is-valid');
      experience.classList.remove('is-invalid');
      experiences=true;

    }
    else {
      experience.classList.remove('is-valid');
      experience.classList.add('is-invalid');
      experiences = false;
    }
    if (e.target.value === "") {
      experience.classList.remove('is-valid');
      experience.classList.remove('is-invalid');
      experiences = false;
    }
  }


  function checkField(e) {
    const field = document.getElementById(e.target.id)
    if (e.target.value.trim() === "" || e.target.value === "null") {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      //  if (e.target.name === "consultancy_type") {
      //     consultancy_type = false;
      //   }
      //   else
      if (e.target.name === "certificate") {
        certificate = false;
      }
      else if (e.target.name === "education") {
        education = false;
      }
    }
    else {
      field.classList.add('is-valid');
      field.classList.remove('is-invalid');
      const { name, value } = e.target;
      if (e.target.type === "file") {
        const certificate = e.target.files[0];
        expertObj = { ...expertObj, [name]: certificate }
      }
      else {
        expertObj = { ...expertObj, [name]: value.trim() }
      }
      if (e.target.name === "certificate") {
        certificate = true;
      }
      else if (e.target.name === "education") {
        education = true;
      }

    }

  }

  //consultancy Field

const handleConsultancyField= (e) => {
  const { name, value, checked, id } = e.target;

  const updatedExpertObj = { ...expertObj };
  updatedExpertObj.consultancy_field = updatedExpertObj.consultancy_field ? updatedExpertObj.consultancy_field : "";
  const cfield = updatedExpertObj.consultancy_field.split(" ");

  if (checked && !cfield.includes(value)) {
    cfield.push(value)

  } else if (!checked && cfield.includes(value)) {
    const index = cfield.indexOf(value);
    cfield.splice(index, 1);
  }
  updatedExpertObj.consultancy_field = cfield.join(" ");
  console.log("expert object with consultancy field before update", expertObj);

  expertObj = { ...updatedExpertObj };
  console.log("expert object with consultancy field", expertObj);

  console.log("consutancy type", updatedExpertObj);

  // Validate Consultancy field checkboxes
  if (name === 'consultancy_field') {
    if (id === "fertilizer") {
      fertilizer = true
    }
    if (id === "seeds") {
      seed = true
    }
    consultancy_field = fertilizer || seed;
  }
};



  const handleCheckboxChange = (e) => {
    const { name, value, checked, id } = e.target;
    // const updatedExpertObj = {
    //   ...expertObj,
    //   [name]: checked
    //     ? [...(expertObj[name] || []), value]
    //     : (expertObj[name] || []).filter((item) => item !== value),
    // };

    const updatedExpertObj = { ...expertObj };
    updatedExpertObj.consultancy_type = updatedExpertObj.consultancy_type ? updatedExpertObj.consultancy_type : "";
    const ctype = updatedExpertObj.consultancy_type.split(" ");

    if (checked && !ctype.includes(value)) {
      ctype.push(value)

    } else if (!checked && ctype.includes(value)) {
      const index = ctype.indexOf(value);
      ctype.splice(index, 1);
    }
    updatedExpertObj.consultancy_type = ctype.join(" ");
    console.log("expert object with consultancy type before update", expertObj);

    expertObj = { ...updatedExpertObj };
    console.log("expert object with consultancy type", expertObj);

    console.log("consutancy type", updatedExpertObj);



    const vc = document.getElementById("fee-video");
    const c = document.getElementById("fee-chat");

    // Validate Consultancy Type checkboxes
    if (name === 'consultancy_type') {
      if (id === "vedio_call") {
        vedio_call = true
        console.log("inside video call")
        if (checked) {
          vc.classList.remove('d-none')
          vc.classList.add('d-block');
        } else if (!checked) {
          vc.classList.add('d-none')
          vc.classList.remove('d-block');
        }

      }
      if (id === "chats") {
        chats = true
        if (checked) {
          c.classList.remove('d-none')
          c.classList.add('d-block');
        } else if (!checked) {
          c.classList.add('d-none')
          c.classList.remove('d-block');
        }

      }
      consultancy_type = chats || vedio_call;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("expert object ", expertObj)
    console.log("current user ",userEmail.email);
    const formData = new FormData();
    for (var key in expertObj) {
      if (expertObj[key]) {
        formData.append(key, expertObj[key]);
      }
    }
    var email="email";
    formData.append(email,userEmail.email);
    dispatch(newExpert(formData));

    setShow(false);

  }
  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Expert Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
              <div className="row w-100 m-0 g-0 ">
                <div className="col-12" >
                  <form id="orgExpert" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="row m-0 w-100">
                      <div className=" col-12 col-md-12 p-2">
                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Education</label>
                        <select name="education" className="form-control form-control-sm" onChange={checkField} id="education" required >
                          <option value="null">Select Education</option>
                          <option value="higher_secondary">higher secondary</option>
                          <option value="graduation">Graduation</option>
                          <option value="masters">Masters</option>
                          <option value="phd">Phd</option>
                        </select>
                        <div className="valid-feedback">
                          Education selected!!
                        </div>
                        <div className="invalid-feedback">
                          Please select Education!!
                        </div>
                      </div>


                      <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consultancy Field</label>

                      <div className="col-12 col-md-12 p-2 d-flex">
                        <div className="form-check me-5 ">
                          <label className="form-check-label" htmlFor="fertilizer">Frtilizer</label>

                          <input
                            type="checkbox"
                            name="consultancy_field"
                            value="fertilizer"
                            onChange={handleConsultancyField}
                            className="form-check-input"
                            id="fertilizer"
                          />
                        </div>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="seeds">Seeds</label>
                          <input
                            type="checkbox"
                            name="consultancy_field"
                            value="seeds"
                            onChange={handleConsultancyField}
                            className="form-check-input"
                            id="seeds"
                          />
                        </div>
                        {/* Validation feedback */}
                        {!consultancy_field && (
                          <div className="invalid-feedback">
                            Please select at least one option for Consultancy field.
                          </div>
                        )}
                      </div>


                      {/* <div className=" col-12 col-md-12 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consultancy Type</label>
                    <select name="consultancy_type" className="form-control form-control-sm" onChange={checkField}  id="consultancy_type" multiple>
                      <option value="null">Select Consultancy Type</option>
                      <option value="Vedio_Call">Vedio Call</option>
                      <option value="Chats">Chats</option>
                    </select>
                    <div className="valid-feedback">
                    Consultancy type selected!!
                    </div>
                    <div className="invalid-feedback">
                      Please select Consultancy type!!
                    </div>
                  </div> */}

                      <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consultancy Type</label>

                      <div className="col-12 col-md-12 p-2 d-flex">
                        <div className="form-check me-5 ">
                          <label className="form-check-label" htmlFor="vedio_call">Video Call</label>

                          <input
                            type="checkbox"
                            name="consultancy_type"
                            value="vedio_call"
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                            id="vedio_call"
                          />
                        </div>
                        <div className="form-check">
                          <label className="form-check-label" htmlFor="chats">Chats</label>
                          <input
                            type="checkbox"
                            name="consultancy_type"
                            value="chats"
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                            id="chats"
                          />
                        </div>
                        {/* Validation feedback */}
                        {!consultancy_type && (
                          <div className="invalid-feedback">
                            Please select at least one option for Consultancy Type.
                          </div>
                        )}
                      </div>


                      <div className="col-12 col-md-12 p-2 d-none" id="fee-video">
                        <label htmlFor="validationServer01" className="form-label midgreen">Consultancy Fee Video</label>
                        <input name="consultancy_fee_video" type="number" onChange={validateFee} className="form-control form-control-sm"
                          id="consultancy_fee_video" placeholder="Enter Consultancy Fee For Video" />
                        <div className="valid-feedback">
                          Correct Consultancy Fee Video!!
                        </div>
                        <div className="invalid-feedback">
                          Invalid Consultancy Fee Video!!
                        </div>
                      </div>


                      <div className=" col-12 col-md-12 p-2 d-none " id="fee-chat">
                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consultancy Fee chat</label>
                        <input name="consultancy_fee_chat" type="number" onChange={validateFee} className="form-control form-control-sm" id="consultancy_fee_chat" placeholder="Enter Consultancy Fee chat" />
                        <div className="valid-feedback">
                          Correct Consultancy Fee chat!!
                        </div>
                        <div className="invalid-feedback">
                          Invalid Consultancy Fee chat !!
                        </div>
                      </div>

                      <div className=" col-12 col-md-12 p-2" id="experiences">
                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Year of Experience</label>
                        <input name="experience" type="number" onChange={validateExperience} 
                        className="form-control form-control-sm" id="experience" placeholder="Enter Year of Experience" />
                        <div className="valid-feedback">
                          Valid Experience Year!!
                        </div>
                        <div className="invalid-feedback">
                          Invalid Experience Year!!
                        </div>
                      </div>

                      <div className=" col-12 col-md-12 p-2">
                        <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Certificate Image </label>
                        <input type="file" className="form-control form-control-sm" onChange={checkField} name="certificate" id="certificate" required />
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
                            Submit
                          </button>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
               
              </div>
           
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpertModal;