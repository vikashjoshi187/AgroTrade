// import "./Header.css";
import UserSingUp from "../UserSignUp/UserSingUp.js";
import UserSingIn from "../UserSignIn/UserSignIn.js";
import OrgSingIn from "../OrgSignIn/OrgSignIn.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoleStatus } from "../../store/commonSlice.js";
import { setUserData } from "../../store/userSlice.js";
import { setOrgData } from "../../store/organizationSlice.js";
import { setAdminData } from "../../store/adminSlice.js";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../store/marketSlice.js";

import jscookie from 'js-cookie';
import { useEffect, useState } from "react";

function Nablinks() {
  const token = jscookie.get("token");
  const email = jscookie.get("userEmail");
  const [cartCount, setCartCount] = useState(0);

  console.log("hiii");
  const { role, status } = useSelector(state => state.commonSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    var data = {
      user_status: "",
      expert_status: ""
    }
    dispatch(setRoleStatus({ role: "", data: data, status: false }));
    jscookie.set('userEmail', "");
    // dispatch(setRoleStatus({role:"", status:false}));
    dispatch(setUserData({}));
    dispatch(setOrgData({}));
    dispatch(setAdminData({}));
    jscookie.set('token', '')
    navigate('/');
  }

  useEffect(() => {

    const getCartitem = async ({ token, email }) => {
      const cartItems = await dispatch(getCart({ token, email }));
      console.log("cart items in Navbar component", cartItems);
      if (cartItems.payload)
        setCartCount(cartItems.payload.length);
    }
    getCartitem({ token, email })
  })
  return (
    <>
      <div
        id="nacLinksdiv"
        className="bg-darkgreen d-felx aling-items-center"
      >
        <div className="row m-0">
          <div className="col-md-8 offset-1">



            {
              token ? <ul id="navLinkul" className="nav d-felx justify-content-around aling-items-center" >
                <li className="nav-item ">

                  <Link to='/' className=" text-white nav-link">
                    <i className="bi bi-house-fill"></i>&nbsp;Home
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/market">
                    <i className="bi bi-basket3-fill"></i>&nbsp;Market
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className=" text-white nav-link" to="/community">
                    {" "}
                    <i className="bi bi-chat-fill"></i>&nbsp;Community
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/dashboard">
                    <i className="bi bi-layout-text-window-reverse"></i>&nbsp;Dashboard
                  </Link>
                </li>

                <li className="nav-item">

                  <Link className=" text-white nav-link" to='/market/cartMarket'>
                    <i className="bi bi-cart-fill"></i>&nbsp;<span className="mt-2 d-none ">{cartCount}</span>Cart
                  </Link>
                </li>
                <div className="btn-group nav-item">
                  <Link className=" text-white nav-link dropdown-toggle" style={{ fontSize: "20px" }} data-bs-toggle="dropdown" to="contact">
                    &nbsp;More
                  </Link>
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
              </ul> : <ul id="navLinkul" className="nav d-felx justify-content-around aling-items-center" >
                <li className="nav-item ">
                  <Link
                    className=" text-white nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    <i className="bi bi-house-fill"></i>&nbsp;Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/aboutus">
                    <i className="bi bi-info-circle-fill"></i>&nbsp;About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/services">
                    {" "}
                    <i className="bi bi-gear-wide-connected"></i>&nbsp;Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/contactus">
                    <i className="bi bi-telephone-fill"></i>&nbsp;Contact
                  </Link>
                </li>
              </ul>
            }
          </div>

          <div className=" col-3 order-last d-flex justify-content-around ">



            {
              token ? <button
                type="Button"
                className="btn btn-danger" onClick={handleLogout}
              >Log Out&nbsp;<i className="bi bi-box-arrow-right"></i>
              </button> :
                <>
                  <div className="dropdown m-0">
                    <Link
                      className="btn linksbtn btn-warning dropdown-toggle mt-1"
                      to="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sign In&nbsp;<i className="bi bi-box-arrow-in-right"></i>
                    </Link>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li>
                        <a className="dropdown-item" to="#">
                          <UserSingIn />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" to="#">
                          <OrgSingIn />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown m-0">
                    <a
                      className="btn linksbtn btn-warning dropdown-toggle mt-1"
                      to="/orgSignup"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sign Up&nbsp;<i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li>
                        <a className="dropdown-item" to="#">
                          <UserSingUp />
                        </a>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orgSignup">
                          <i className="bi bi-people-fill"></i>&nbsp;Orgnisation
                        </Link>
                      </li>
                    </ul>
                  </div>


                </>
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default Nablinks;