import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jscookie from "js-cookie"
import Swal from "sweetalert2";
import { bookExpert } from '../../store/userSlice';

function BookExpert(props) {
  const [show, setShow] = useState(false);
  const { ExpertId } = props
  const [bookData, setBookData] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value.trim() })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const userEmail = jscookie.get("userEmail");
    const updatedBookData = { ...bookData, userEmail: userEmail };
    const finalUpdatedBookData = { ...updatedBookData, ExpertId: ExpertId };
    bookExpert(finalUpdatedBookData).then((data) => {
      if (data.message == "success") {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: " Wait For Conform ",
          showConfirmButton: false,
          timer: 2000
        });
        setShow(false)
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unavailable to Book Expert. Please try Again...",
        });
        setShow(false)
      }
    }).catch((err) => {
      console.log("err", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unavailable to Book Expert. Please try Again...",
      });
      setShow(false)
    })
  }

  return (
    <>
      {/* <Button className="btn btn-warning btn-sm bg-warning has-icon btn-block" type="button" >Book Expert</Button> */}
 <button class="btn btn-success " onClick={handleShow}><i class="fa fa-clock-o"></i><i class="bi bi-bookmark-check" ></i>&nbsp;Book Session</button>
           
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='darkgreen'>Book Expert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row w-100 m-0 g-0 ">
            <div className="col-12" >
              <form id="orgExpert" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="row m-0 w-100">
                  <div className="col-12 col-md-12 p-2 " id="fee-video">
                    <label htmlFor="validationServer01" className="form-label midgreen">Consulting Topic</label>
                    <input name="consultingTopic" type="text" className="form-control form-control-sm"
                      id="consultingTopic" placeholder="Enter Consultancy Topic" onChange={getData} required />
                    <div className="valid-feedback">
                      Correct Consulting Topic!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid Consulting Topic!!
                    </div>
                  </div>

                  <div className=" col-12 col-md-12 p-2">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consulting Type</label>
                    <select name="consultingType" className="form-control form-control-sm" onChange={getData} id="consultingType" required >
                      <option value="null">Select Consulting Type</option>
                      <option value="Charts">Charts</option>
                      <option value="Video Call">Video Call</option>
                    </select>
                    <div className="valid-feedback">
                      Consulting Type selected!!
                    </div>
                    <div className="invalid-feedback">
                      Please select Consulting Type!!
                    </div>
                  </div>




                  <div className=" col-12 col-md-12 p-2  " id="fee-chat">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consultancy Time</label>
                    <input name="consultingTime" type="time" className="form-control form-control-sm" onChange={getData} id="consultingTime" placeholder="Enter Consultancy Time" required />
                    <div className="valid-feedback">
                      Correct Consultancy Time!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid Consultancy Time !!
                    </div>
                  </div>

                  <div className=" col-12 col-md-12 p-2" id="consultingDate">
                    <label htmlFor="validationServer01" className="form-label midgreen m-0 mt-1">Consulting Date</label>
                    <input name="consultingDate" type="date"
                      className="form-control form-control-sm" id="experience" onChange={getData} placeholder="Enter Consulting Date" required />
                    <div className="valid-feedback">
                      Valid Consulting Date!!
                    </div>
                    <div className="invalid-feedback">
                      Invalid Consulting Date!!
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

export default BookExpert;