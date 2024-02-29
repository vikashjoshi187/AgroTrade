import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import logo from "../../assets/imagecontactpage.jpg"
import "./ContactUs.css";
import {addMessage} from "../../store/userSlice.js"
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Swal from "sweetalert2";


var orgObj = {}
var  Conname = false, Conemail = false ,Conmessage = false;


function ContactUs() {
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     authorize(dispatch);
    // },[])

    const [contactData, setContactData] = useState({});

    var getData = (event) => {
        const { name, value } = event.target;
        setContactData({
            ...contactData,
            [name]: value,
        });
    };

    function validataName(event) {
        const pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
        var contactName = document.getElementById(event.target.id);
        if (pattern.test(event.target.value)) {
            const { name, value } = event.target;
            orgObj = { ...orgObj, [name]: value.trim() }
            contactName.classList.add('is-valid');
            contactName.classList.remove('is-invalid');
            if (event.target.name === 'Con_name') {
                Conname = true;
            }
            else if (event.target.email === "userEmail") {
                Conemail = true;
            }
            else if (event.target.message === "Con_message") {
                Conmessage = true;
            }
        } else {
            contactName.classList.remove('is-valid');
            contactName.classList.add('is-invalid');
            if(event.target.name === "Con_name"){
               Conname = false; 
            }
            else if(event.target.email === "userEmail"){
                Conemail = false;
            }
            else if(event.target.message === "Con_message"){
                Conmessage = false;
            }
        }
        if(event.target.value === ""){
            contactName.classList.remove('is-valid');
            contactName.classList.add('is-invalid');
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
          if (e.target.name === "userEmail") {
            Conemail = true;
          }
        }
        else {
          EmailField.classList.remove('is-valid');
          EmailField.classList.add('is-invalid');
          if (e.target.value === "email") {
            Conemail = false;
          }
        }
        if (e.target.value === "") {
          EmailField.classList.remove('is-valid');
          EmailField.classList.remove('is-invalid');
        }
      }

    function validateMessage(event){
        const pattern = /\w+$/;
        var Messagefield = document.getElementById(event.target.id);
        if(pattern.test(event.target.value)){
            const {name,value} = event.target;
            orgObj = {...contactData, [name] : value.trim()}
            Messagefield.classList.add("is-valid");
            Messagefield.classList.remove("is-invalid");
            if(event.target.name === 'Con_message'){
                Conmessage = false;
            }
            else{
                Messagefield.classList.remove('is-valid');
                Messagefield.classList.remove('is-invalid');
                if(event.target.value === 'message'){
                    Conmessage = false;
                }
            }
            if(event.target.value === ''){
                Messagefield.classList.remove('is-valid');
                Messagefield.classList.add('is-invalid');
            }
        }
    }

    var handleSubmit = (event)=>{
        event.preventDefault();
        if(Conname && Conemail && Conmessage){

        }
        addMessage(contactData).then((data)=>{   
            if(data.message=="success"){
             Swal.fire({
                 position: "middle",
                 icon: "success",
                 title: "Message Send Successfully",
                 showConfirmButton: false,
                 timer: 2000
               });
               event.target.reset();
            }
            else {
             Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Unavailable to Send Message. Please try Again...",
             });
         }
         }).catch((err) => {
             console.log("err", err);
             Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Unavailable to Send Message. Please try Again...",
             });
           })
    }

    return (
        <>
            <Header/>
            <div className="container-fluid p-0">
                <Row className="p-0">
                    <Col sm={12}>
                        <Image src={logo} alt="Example Image" className='banner1 img-fluid w-100' />
                    </Col>
                </Row>
            </div>
            <Container className="container-fluid p-0 mt-5">
                <Row>
                    <Col sm={6} id="col" className="col-sm-6 p-3">
                        <h2 className="textcolor">Have Any Question?</h2>
                        <p className="textcolor" style={{textAlign:"justify"}}>
                            AgroTrade is an innovative online platform revolutionizing
                            agricultural trade by connecting farmers, factory owners,
                            and buyers in an efficient and transparent marketplace.
                            Our digital ecosystem optimizes land utilization,
                            crop cultivation, and product purchase, fostering a seamless
                            network for agricultural trade and growth.
                        </p>
                        <div>
                            <Form className="needs-validation" id="contactForm" onSubmit={handleSubmit} novalidate>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="textcolor">Your Name</Form.Label>
                                    <Form.Control type="text" name="userName" id="contact_name" onChange={(event) => {validataName(event); getData(event); }} placeholder="Enter Your Name" required />
                                    <div className="valid-feedback">
                                        Correct name!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Invalid name!!
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="textcolor">Your Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Your Email" onChange={(event) => { validateEmail(event); getData(event); }} name="userEmail" id="contact_email" required />
                                    <div className="valid-feedback">
                                        Correct email!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Invalid email!!
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className="textcolor">Enter Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} className='fs-6' size="lg" onChange={(event) => { validateMessage(event); getData(event); }} id="contact_message" name="message" placeholder='Enter Message' required />
                                    <div className="valid-feedback">
                                        Correct message!!
                                    </div>
                                    <div className="invalid-feedback">
                                        Invalid message!!
                                    </div>
                                </Form.Group>
                                <div className=" col-12 col-md-12 mt-1 mb-1 p-1">
                                    <div className="d-grid gap-2">
                                        <button type="submit" name="" id="send_msg" className="btn btn-success btn1 mt-1">
                                            Send Message
                                        </button>
                                    </div>

                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col sm={6} className="col-sm-6 p-3">
                        <div className="google-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14719.188998439324!2d75.86501435!3d22.73577615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1702892842353!5m2!1sen!2sin " allowfullscreen="" title="dddd" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div style={{marginTop:"60px"}}>
                            <i className="mt-5 fa-solid fa-phone textcolor p-1"></i>&nbsp;&nbsp;+91574534567
                        </div>
                        <div>
                            <i className="fa-solid fa-message mt-2 textcolor p-1"></i>&nbsp;&nbsp;agrotradehelp@gmail.com
                        </div>
                        <div>
                            <i className="fa-solid fa-location-dot mt-2 textcolor p-1"></i>&nbsp;&nbsp;Yashwant Ganj,M.T Cloth Market, Indore,MP.
                        </div>
                        <div>
                            <i className="fa-solid fa-clock mt-2 textcolor p-1"></i>&nbsp;&nbsp;9:00 am to 5:00 pm
                            <br /><p className="ms-4 p-1">Monday to Saturday</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="container-fluid pt-2 mt-2 bg-white">
                <Row className="mt-2 mb-2 pt-0">
                    <Col sm={12} className="mt-4 justify-content-center align-items-center">
                        <h2 className="text-center textcolor">Follow Us On Social Media</h2>
                        <p className="text-center">Our AgroTread Web-Application Is To Easy Undarstand To Client And Formers</p>
                        <div className='p-1 text-center'>
                            <i className="fa-brands fa-square-facebook fs-1 m-2 socialicons Sicons"></i>
                            <i className="fa-brands fa-square-instagram fs-1 m-2 socialicons Sicons"></i>
                            <i className="fa-brands fa-square-twitter fs-1 m-2 socialicons Sicons"></i>
                            <i className="fa-brands fa-square-whatsapp fs-1 m-2 socialicons Sicons"></i>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer/>
        </>
    );
}
export default ContactUs;