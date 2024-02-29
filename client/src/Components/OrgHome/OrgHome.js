import Header from "../OrgHeader/Header.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { LandMarket, storageMarket } from "../../store/marketSlice.js";

import jscookie from "js-cookie"
import Footer from "../Footer/Footer.js";
import AboutUs from "../AboutUsPage/AboutUs.js";
function OrgHome(){
  return(<>
    <Header/>
  {/* <AboutUs/> */}
   <div>
   <Outlet context={"hello"} />
   <Footer/>
   </div>
  
 </>)
}
export default OrgHome;