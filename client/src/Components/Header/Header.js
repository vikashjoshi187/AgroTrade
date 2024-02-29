import './Header.css'
import logo from "../../assets/Agro-Trade-logo.png"
import Nablinks from './Navlink.js';
import Example from './OffCanwas.js';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import "./HeaderGSAP.js"
import { useGSAP } from "@gsap/react";
function Header() {


   const headerDiv = useRef(null);
   useGSAP(() => {
    // gsap code here...
    gsap.from("#headerDiv", {duration:1,y:300}); // <-- automatically reverted
  
  }, { scope: headerDiv }); // <-- scope is for selector text (optional)





  
  return (< >
    <div ref={headerDiv}>
      <div  id='headerDiv' className="container-fluid w-100 ps-4   downDhadow " >
        <div className='row w-100 m-0 '>
          <div className='col-6 col-md-2 '>
            <div className='ms-2' >
              <img id='logo' src={logo} alt="Agro Trade" />
            </div>
          </div>
          <div className='col-12 col-md-3 pt-4  header-content '>
            <div className='pt-2'>
              <h3 className='darkgreen wght-600'><i className="bi bi-geo-fill"></i> <span>Address</span></h3>
              <p className='ms-3 text-break darkgreen'>
                Yashwant Ganj,M.T Cloth Market,
                Indore, Madhya Pradesh 452002
              </p>
            </div>
          </div>

          <div className='col-12 col-md-3 pt-3 header-content ps-5'>
            <div className='ps-3 pt-2'>
              <h3 className='darkgreen wght-600'><i className="bi bi-telephone-fill"></i> <span>Contact</span></h3>
              <p className='ms-3 text-break darkgreen'>
                +91 99778 839880 <br />
                +91 99778 839880
              </p>
            </div>
          </div>

          <div className='col-12 col-md-3 pt-3 bginfo header-content ps-5'>
            <div className='ps-3 pt-2'>
              <h3 className='darkgreen wght-600'><i className="bi bi-envelope"></i> <span>Email</span></h3>
              <p className='ms-3 text-break darkgreen'>
                agrotradehelp@gmail.com
                agrotrade@gmail.com
              </p>

            </div>
          </div>
          <div id='offcanvasDiv' className='col-6 col-md-8 ' >
            <Example />
          </div>
        </div>
      </div>
      <Nablinks />
    </div>
  </>);
}

export default Header;