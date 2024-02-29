import "./AdminDashboard.css";
import AdminDashboardLinks from "./AdminDashboardLinks";
import logo from "../../assets/Agro-Trade-logo.png"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
<link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
var show = false;
function silderBarToggle(params) {
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

function AdminDashboard() {
  var navigate = useNavigate();
  const [show, setShow] = useState(false);


  return (
    <>
      <div className="container-fluid position-relative d-flex p-0 ">
        <div className="sidebar sidebar-admin" id="siderBar">
          <nav className="navbar navbar-light pe-2">
            <div className="d-flex justify-content-between ps-3 pe-3  w-100">
              <p href="#" className="navbar-brand ">
                <h3 className="midgreen text-center ">
                  Agro Trade
                </h3>
              </p>
              <h2 className=" text-white sidebar-toggler m-2 text-decoration-none flex-shrink-0" id="sidebar-toggler" onClick={silderBarToggle}>
                <i class="bi bi-x-circle-fill"></i>
              </h2>
            </div>
            <div className=" mb-1 mt-0  w-100">
              <div className="d-flex aling-items-center justify-content-center" >
                <img className="rounded-circle w-50" alt="" src={logo} style={{ width: "60px" }} />
              </div>
              <div className=" d-flex aling-items-center justify-content-center">
                <div>
                  <h6 className="mb-0 text-white">Vikas Joshi</h6>
                  <span className=" text-white text-center" >Admin</span>
                </div>
              </div>
            </div>
            <div className="navbar-nav w-100 " id="scrollDiv">

              <Link to="/dashboard/profile" className="nav-item nav-link  active m-0  ">
                <i className="bi bi-person-circle text-center"></i>&nbsp;Profile
              </Link>
          
              <div className="nav-item dropdown m-0">
                <p
                  className="nav-link dropdown-toggle m-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>View List
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to="/adminDashboard/userList" className="dropdown-item text-white">
                    User List
                  </Link>
                  <Link to="/adminDashboard/expertList" className="dropdown-item text-white">
                    Expert List
                  </Link>
                  <Link to="/adminDashboard/organizationList" className="dropdown-item text-white">
                    Organization List
                  </Link>
                </div>
              </div>



              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle m-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>Grains
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to="/adminDashboard/listedGrainsAd" className="dropdown-item text-white">
                    Listed Grains
                  </Link>
                  <Link to="/adminDashboard/orderedGrains" className="dropdown-item text-white">
                    Ordered Grains
                  </Link>
                </div>
              </div>

              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle m-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>Farming Land
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to="/adminDashboard/listedFarmingLand" className="dropdown-item text-white">
                    Listed FarmingLand
                  </Link>
                  <Link to="/adminDashboard/contactFarmingLand" className="dropdown-item text-white">
                    Contract FarmingLand
                  </Link>
                </div>
              </div>

              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle m-0"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>Equipments
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to="/adminDashboard/listedEquipmentsAd" className="dropdown-item text-white">
                    Listed Equipments
                  </Link>
                  <Link to="/adminDashboard/orderedEquipments" className="dropdown-item text-white">
                    Ordered Equipments
                  </Link>
                </div>
              </div>


              <div className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-file-alt me-2 text-success "></i>Cold Storage Land
                </p>
                <div className="dropdown-menu bg-transparent border-0">
                  <Link to="/adminDashboard/listedColdStLand" className="dropdown-item text-white">
                    Listed ColdStorage Land
                  </Link>
                  <Link to="/adminDashboard/contractColdStLand" className="dropdown-item text-white">
                    Contract ColdStorage Land
                  </Link>
                </div>
              </div>

            </div>
          </nav>
        </div>

        <div className="content " id="content" style={{ display: "flex", flexDirection: "column" }}>
          <AdminDashboardLinks />
          {/* --------------------------------Div to be nvigate----------------------------- */}
          <div className="container-fluid p-0 bg-light" style={{ flexGrow: 1 }}>
            <Outlet />
          </div>
          {/* --------------------------------Div to be nvigate ends ----------------------------- */}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;