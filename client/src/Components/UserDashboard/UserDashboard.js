import "./UserDashboard.css";
import logo from "../../assets/Agro-Trade-logo.png"
import DashboardLinks from "../DashboardLinks/DashboardLinks.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import ExpertModal from "../BecomeExpertModal/ExpertModal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import jscookie from 'js-cookie'
import { getDataonLoad, setUserData } from "../../store/userSlice";
import Swal from 'sweetalert2';
import { setRoleStatus } from "../../store/commonSlice";
import { setOrgData } from "../../store/organizationSlice";
import { setAdminData } from "../../store/adminSlice";

<link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
var show = false;
function silderBarToggle() {
  var sliderBar = document.getElementById("siderBar");
  var content = document.getElementById("content")
  if (show) {
    sliderBar.classList.remove("open")
    content.classList.remove("open")
    show = false;
  }
  else {
    sliderBar.classList.add("open")
    content.classList.add("open")
    show = true;
  }
}

function UserdashBoard() {
  var navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [socket, setSocket] = useState(null);
  const status = useSelector(state => state.commonSlice);
  
 
  const dispatch = useDispatch()
  var user = useSelector(state => state.userSlice.userData);
  console.log("inside dashboard", user)
  var expertStatus = user.expert_status;
  var userStatus = user.user_status;
  console.log("expert status in dashboard", String(expertStatus));
  var data = {}
  useEffect(() => {
    setSocket(io('http://127.0.0.1:3000'));
    const get = async () => {
      const email = jscookie.get("userEmail");
      const token = jscookie.get("token");

      data = await dispatch(getDataonLoad({ email, token }))
      console.log("inside dash", data.payload);
      expertStatus = data.payload.expert_status;
      userStatus = data.payload.user_status;

    }
    if (user.userData === null) {
      get();
    }

  }, [dispatch]);


  const checUser = (route) => {
    if (!userStatus) {
      Swal.fire({
        position: "middle",
        icon: "info",
        title: "Please complete your profiile first.🙏",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/dashboard/profile")
      return
    } else {
      navigate(String(route));
      console.log("route inside checkuser", String(route));
    }

  }

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0 ">
        <div  className="sidebar sidebar-user"  id="siderBar">
          <nav className="navbar navbar-light pe-2">
            <div className="d-flex justify-content-between ps-3 pe-3  w-100">
              <a href="#" className="navbar-brand ">
                <h3 className="midgreen text-center ">
                  Agro Trade
                </h3>
              </a>
              <h2 className=" text-white sidebar-toggler m-2 text-decoration-none flex-shrink-0" id="sidebar-toggler" onClick={silderBarToggle}>
                <i className="bi bi-x-circle-fill"></i>
              </h2>
            </div>
            <div className="d-flex align-items-center ms-4 mb-1">
              <div className="position-relative">
                <img className="rounded-circle" alt="" src={logo} style={{ width: "60px" }} />
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0 text-white">Vikas Joshi</h6>
                <span className=" text-white" >User</span>
              </div>
            </div>


            <div className="navbar-nav w-100 " id="scrollDivUser">
              <Link to="/dashboard/profile" className="nav-item nav-link  active  ">
                <i className="bi bi-person-circle text-center"></i>&nbsp;Profile
              </Link>
              <p onClick={() => checUser("/dashboard/chat")} className="nav-item nav-link ">
                <i className="fa fa-th me-2 text-success"></i>&nbsp;Chat
              </p>
              <p onClick={() => checUser("/dashboard/listedGrain")} className="nav-item nav-link ">
                <i className="fa fa-th me-2 text-success"></i>&nbsp;Listed Grains
              </p>
              <p onClick={() => checUser("/dashboard/listedEquipments")} className="nav-item nav-link ">
                <i className="fa-solid fa-tractor text-success"></i>&nbsp;Listed Equipments
              </p>
              <p onClick={() => checUser("/dashboard/video_call")} className="nav-item nav-link">
              <i class="bi bi-camera-video-fill text-success"></i>&nbsp;&nbsp;Video Call
              </p>

              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                <i className="fa-solid fa-building-wheat text-success"></i>&nbsp;Agriculture Land
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <p className="dropdown-item text-white" onClick={() => checUser("/dashboard/agricultureLands")}>
                    Listed Agriculture Lands
                  </p>
                  <p className="dropdown-item text-white" onClick={() => checUser("/dashboard/requestAgricultureLands")}>
                  Request for Agriculture Land
                  </p>
                
                </div>
              </div>



              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                <i className="fa-solid fa-building-wheat text-success"></i>&nbsp;Cold Storage Land
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <p className="dropdown-item text-white" onClick={() => checUser("/dashboard/coldStorageLand")}>
                    Listed Coldstorage Lands
                  </p>
                  <p className="dropdown-item text-white" onClick={() => checUser("/dashboard/requestColdStLands")}>
                  Request for Agriculture Land
                  </p>
                
                </div>
              </div>
              <p>{
                !expertStatus && userStatus ? <Button onClick={() => setShow(true)} className="nav-item nav-link">
                  <i className="bi bi-layout-text-window-reverse text-success"></i>&nbsp;
                  Become Expert
                </Button> : ""
              }</p>


              {/* <p onClick={() => checUser("/dashboard/grainOrder")} className="nav-item nav-link ">
                <i className="fa-solid fa-wheat-awn text-success"></i>&nbsp;Grain Orders
              </p>


              <p onClick={() => checUser("/dashboard/equipmentOrder")} className="nav-item nav-link ">
                <i className="bi bi-wrench-adjustable-circle-fill text-success"></i>&nbsp;Equipment Orders
              </p> */}



              {/* <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>Agreements
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <p className="dropdown-item text-white">
                    Agriculture agreements
                  </p>
                  <a href="signup.html" className="dropdown-item text-white">
                    Cold Sotrage agreements
                  </a>
                </div>
              </div> */}
            </div>
          </nav>
        </div>

        <div className="content " id="content" style={{ display: "flex", flexDirection: "column" }}>
          <DashboardLinks />
          {/* <DashboardLinks/> */}
          <ExpertModal setShow={setShow} show={show} />
          {/* --------------------------------Div to be nvigate----------------------------- */}
          <div className="container-fluid p-0 bg-light" style={{ flexGrow: 1 }}>
            <Outlet context={{ socket, user }} />
          </div>
          {/* --------------------------------Div to be nvigate ends ----------------------------- */}
        </div>
      </div>
    </>
  );
}

export default UserdashBoard;