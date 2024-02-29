import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../assets/Agro-Trade-logo.png'
import UserSingUp from '../UserSignUp/UserSingUp.js';
import UserSingIn from '../UserSignIn/UserSignIn.js';
import OrgSingIn from '../OrgSignIn/OrgSignIn.js';
import { Link, useNavigate } from 'react-router-dom';
import jscookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { setRoleStatus } from '../../store/commonSlice';
import { setUserData } from '../../store/userSlice';
import { setOrgData } from '../../store/organizationSlice';
import { setAdminData } from '../../store/adminSlice';
function OffCanvasExample({ name, ...props }) {
  const token = jscookie.get("token");
  const email = jscookie.get("userEmail");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const {role,status} = useSelector(state=>state.commonSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout(){
    var data={
      user_status:"",
      expert_status:""
    }
    dispatch(setRoleStatus({role:"",data:data,status:false}));
    jscookie.set('userEmail',""); 
    // dispatch(setRoleStatus({role:"", status:false}));
    dispatch(setUserData({}));
    dispatch(setOrgData({}));
    dispatch(setAdminData({}));
    jscookie.set('token','')
    navigate('/');
  }

  return (
    <>
      <Button style={{ background: "transparent", border: "none", color: "green", fontSize: "40px" }} onClick={handleShow} className="me-2">
        <i className="bi bi-list"></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>

            <img src={logo} style={{ width: "100px" }} alt="Agro Trade" />

          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='row w-100 '>
            {
              token ? 
              <button 
                type="Button" 
                className="btn btn-danger" onClick={handleLogout}
                >Log Out&nbsp;<i className="bi bi-box-arrow-right"></i>
              </button>                :
                <div className='col-12  d-flex justify-content-around mb-3 '>
                  <div className="dropdown m-0">
                    <a className="btn linksbtn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      Sign In&nbsp;<i className="bi bi-box-arrow-in-right"></i>
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a className="dropdown-item" href="#"><UserSingIn/></a></li>
                      <li><a className="dropdown-item" href="#"><OrgSingIn/></a></li>
                    </ul>
                  </div>
                  <div className="dropdown m-0">
                    <a className="btn linksbtn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      Sign Up&nbsp;<i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a className="dropdown-item" href="#"><UserSingUp /></a></li>
                      <li><Link className="dropdown-item" to="orgSignup"><i className="bi bi-people-fill"></i>&nbsp;Orgnisation</Link></li>
                    </ul>
                  </div>

                </div>
            }
            
            {
              token ? <div className='col-12 mt-2 mb-5 ' >
                <ul className="nav d-flex flex-column">
                  <li className="nav-item ">
                    <Link className="offcanvasLinks  darkgreen mb-1 nav-link active" aria-current="page" to="/"><i className="bi bi-house-fill"></i>&nbsp;Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="offcanvasLinks darkgreen mb-1  nav-link" to="/market"><i className="bi bi-basket3-fill"></i>&nbsp;Market</Link>
                  </li>
                  <li className="nav-item">
                    <Link className=" offcanvasLinks darkgreen mb-1 nav-link" to="/community"><i className="bi bi-chat-fill"></i>&nbsp;Community</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="offcanvasLinks darkgreen  mb-1  nav-link" to="/dashboard"><i className="bi bi-layout-text-window-reverse"></i>&nbsp;Dashboard</Link>
                  </li>

                  <div className="btn-group">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      More
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <Link className=" text-success nav-link" to="/aboutus">
                          <i className="bi bi-info-circle-fill"></i>&nbsp;About us
                        </Link>
                      </li>

                      <li className="dropdown-item">
                        <Link className=" text-success nav-link" to="/services">
                          {" "}
                          <i className="bi bi-gear-wide-connected"></i>&nbsp;Services
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link className=" text-success nav-link" to="/contactus">
                          <i className="bi bi-telephone-fill"></i>&nbsp;Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ul>
              </div> :
                <div className='col-12 mt-2 mb-5 ' >
                  <ul className="nav d-flex flex-column">
                    <li className="nav-item ">
                      <Link className="offcanvasLinks  darkgreen mb-1 nav-link active" aria-current="page" to="/"><i className="bi bi-house-fill"></i>&nbsp;Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="offcanvasLinks darkgreen mb-1  nav-link" to="/aboutus"><i className="bi bi-info-circle-fill"></i>&nbsp;About us</Link>
                    </li>
                    <li className="nav-item">
                      <Link className=" offcanvasLinks darkgreen mb-1 nav-link" to="/services"> <i className="bi bi-gear-wide-connected"></i>&nbsp;Services</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="offcanvasLinks darkgreen  mb-1  nav-link" to="/contactus"><i className="bi bi-telephone-fill"></i>&nbsp;Contact</Link>
                    </li>
                  </ul>
                </div>
            }
            <div className='col-12 mt-5'>
              <div className='ps-3'>
                <h5 className='darkgreen wght-600'><i className="bi bi-geo-fill"></i> <span>Address</span></h5>
                <p className='ms-3 text-break darkgreen'>
                  Yashwant Ganj,M.T Cloth Market,
                  Indore, Madhya Pradesh 452002
                </p>
              </div>
            </div>

            <div className='col-12'>
              <div className='ps-3'>
                <h5 className='darkgreen wght-600'><i className="bi bi-telephone-fill"></i> <span>Contact</span></h5>
                <p className='ms-3 text-break darkgreen'>
                  +91 99778 839880 <br />
                  +91 99778 839880
                </p>
              </div>
            </div>

            <div className='col-12   bginfo '>
              <div className='ps-3 '>
                <h5 className='darkgreen wght-600'><i className="bi bi-envelope"></i> <span>Email</span></h5>
                <p className='ms-3 text-break darkgreen'>
                  agrotrade@gmail.com
                </p>

              </div>
            </div>



          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>

      <OffCanvasExample key={1} placement={"end"} name={"end"} />

    </>
  );
}

export default Example;