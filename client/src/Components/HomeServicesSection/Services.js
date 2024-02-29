import "./Services.css"

import { useRef,useState } from "react"
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
function HomeServices() {
 
  const headerDiv = useRef(null);
  useGSAP(() => {
   // gsap code here...
   gsap.from(".services-box", {duration:1.5,y:-200,opacity:0,stagger: 0.5}); // <-- automatically reverted
 
 },);
 
 return (< >
    <div className="container-fluid   d-flex justify-content-center"  >
      <div className="row" id="services-row" >
        <h1 className="text-center wght-600 darkgreen" >Services</h1>

        <div className=" services-box col-12 col-sm-6 col-md-4   mb-2 " >
          <div className="p-3 serviceBox " >
            <h1 className="serviceIcon" > <i className="fa-solid fa-tractor"></i></h1>
            <h2 className="text-center darkgreen" >Rent Equipment</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Empower farmers with affordable access to essential farming equipment through our convenient rental service, fostering efficiency and sustainable agricultural practices."
              </p>
            </div>
          </div>
        </div>
        <div className=" services-box col-12 col-sm-6 col-md-4  mb-2" >
          <div className=" p-3 serviceBox " >
            <h1 className="serviceIcon" > <i className="fa-solid fa-wheat-awn"></i></h1>
            <h2 className="text-center darkgreen" >Rent Farm</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Optimize your industrial space with our efficient farming-on-rent service, providing factory owners hassle-free access to sustainable agriculture within their premises."
              </p>
            </div>
          </div>
        </div>

        <div className=" services-box col-12 col-sm-6 col-md-4 mb-2" >
          <div className=" p-3 serviceBox " >
            <h1 className="serviceIcon" ><i className="fa-solid fa-warehouse"></i></h1>
            <h2 className="text-center darkgreen" >Rent Farm</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Enhance your storage capabilities with our cold storage land rental service, offering factory owners a seamless solution for temperature-controlled warehousing."   </p>
            </div>
          </div>
        </div>



        <div className=" services-box col-12 col-sm-6 col-md-4 mb-2" >
          <div className=" p-3 serviceBox " >
            <h1 className="serviceIcon" ><i className="fa-solid fa-user-tie"></i></h1>
            <h2 className="text-center darkgreen" >Talk Expert</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Elevate your farming with expert support. Learn modern techniques and tricks to enhance agricultural practices, ensuring success and sustainability."             </p>
            </div>
          </div>
        </div>


        <div className=" services-box col-12 col-sm-6 col-md-4  mb-2" >
          <div className="p-3  serviceBox " >
            <h1 className="serviceIcon" ><i className="bi bi-people-fill"></i></h1>
            <h2 className="text-center darkgreen" >Community Support</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Foster farming communities with our support service, sharing experiential knowledge and modern techniques for sustainable agriculture, empowering farmers collectively."
              </p>
            </div>
          </div>
        </div>


        <div className=" services-box col-12 col-sm-6 col-md-4  mb-2" >
          <div className=" p-3 serviceBox " >
            <h1 className="serviceIcon" ><i className="bi bi-box-seam-fill"></i></h1>
            <h2 className="text-center darkgreen" >Community Support</h2>
            <div className="d-felx " >
              <p className="servicepara darkgreen" >
                "Direct from farmers, our service offers organic, chemical-free grains for health-conscious citizens, ensuring quality, purity, and a sustainable food source."
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>


  </>);
}

export default HomeServices;