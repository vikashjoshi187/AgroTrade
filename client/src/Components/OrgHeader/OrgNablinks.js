
import OrgSingIn from "../OrgSignIn/OrgSignIn.js";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setRoleStatus } from "../../store/commonSlice.js";
import { setUserData } from "../../store/userSlice.js";
import { setOrgData } from "../../store/organizationSlice.js";

import { useNavigate } from "react-router-dom";
import jscookie from 'js-cookie';
function OrgNablinks(){
  console.log("hiii");
  const {role,status} = useSelector(state=>state.commonSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout(){
    var data={
      user_status:"",
      expert_status:"",
      dealer_email:""
    }
    dispatch(setRoleStatus({role:"",data:data,status:false}));
    jscookie.set('dealer_email',""); 
    // dispatch(setRoleStatus({role:"", status:false}));
    dispatch(setUserData({}));
    dispatch(setOrgData({}));
    // dispatch(setAdminData({}));
    jscookie.set('token','')
    navigate('/');
  }
 return(<>
     <div
        id="nacLinksdiv"
        className="bg-darkgreen d-felx aling-items-center"
      >
        <div className="row m-0">
          <div className="col-md-10  offset-1">            
               <ul id="navLinkul" className="nav d-felx justify-content-around  aling-items-center" >
               <li className="nav-item  m-1">
                  <Link to='/orgnization' className=" text-white nav-link">
                    <i className="bi bi-house-fill"></i>&nbsp;Home
                  </Link>
                </li>
                <li className="nav-item  m-1">
                  <Link to='/orgnization/profile' className=" text-white nav-link">
                  <i class="bi bi-person-fill"></i>&nbsp;Profile
                  </Link>
                </li>
                <div className="btn-group nav-item  m-1">
                  <Link className=" text-white nav-link dropdown-toggle" style={{ fontSize: "20px" }} data-bs-toggle="dropdown" to="contact">
                    &nbsp;Market
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/agricultureLand">
                        <i className="bi bi-info-circle-fill"></i>&nbsp;Agricuture Land
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/coldstorageLand">
                        {" "}
                        <i className="bi bi-gear-wide-connected"></i>&nbsp;ColdStorage Land
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="btn-group nav-item m-1 ">
                  <Link className=" text-white nav-link dropdown-toggle" style={{ fontSize: "20px" }} data-bs-toggle="dropdown" to="contact">
                    &nbsp;Contract
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                    <Link className=" text-success nav-link" to="/orgnization/AgriLandContaract">
                        <i className="bi bi-info-circle-fill"></i>&nbsp;Agricuture Land
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/ColdStContaract">
                        <i className="bi bi-gear-wide-connected"></i>&nbsp;ColdStorage Land
                      </Link>
                    </li>
                  </ul>
                </div>
              
                <div className="btn-group nav-item m-1">
                  <Link className=" text-white nav-link dropdown-toggle" style={{ fontSize: "20px" }} data-bs-toggle="dropdown" to="contact">
                    &nbsp;More
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/aboutus">
                        <i className="bi bi-info-circle-fill"></i>&nbsp;About us
                      </Link>
                    </li>

                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/services">
                        {" "}
                        <i className="bi bi-gear-wide-connected"></i>&nbsp;Services
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className=" text-success nav-link" to="/orgnization/orgcontactus">
                        <i className="bi bi-telephone-fill"></i>&nbsp;Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className=" offset-1 col-2 te order-last d-flex justify-content-around ">
              <button 
                type="Button" 
                className="btn btn-danger " onClick={handleLogout}
                >Log Out&nbsp;<i className="bi bi-box-arrow-right"></i>
              </button> 
              </div>
                
               </ul>
          </div>
        </div>
      </div>
    </>
 )
 }

export default OrgNablinks;