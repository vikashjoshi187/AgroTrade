import "./AdminDashboardLinks.css"
import { Link } from "react-router-dom";
import jscookie from "js-cookie"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoleStatus } from "../../store/commonSlice";
import { setAdminData } from "../../store/adminSlice";
function AdminDashboardLinks() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    var show=false;
    function silderBarToggle(params) {
      var  sliderBar=document.getElementById("siderBar");
      var content =document.getElementById("content")
      if (show) {
        sliderBar.classList.remove("open")  
        content.classList.remove("open")
        show=false;
      }
      else{
        sliderBar.classList.add("open")
        content.classList.add("open")
        show=true;
      }

    }

    function handleLogout(){
      var data={
        admindata:""
      }
      dispatch(setRoleStatus({role:"",data:data,status:false}));
      jscookie.set('adminEmail',"");
      dispatch(setAdminData({}));
      jscookie.set('token','')
      navigate('/adminLogin');

    }



    return (<>
    <div>
            <nav className="navbar navbar-expand light-yellow  px-4 py-0  d-flex justify-content-between">
            <a href="#" className="sidebar-toggler m-2 text-decoration-none flex-shrink-0" id="sidebar-toggler" onClick={silderBarToggle}>
            <i className="fa-solid fa-bars midgreen"></i>
            </a>
           
            <div className="navbar-nav  w-75 d-flex  align-items-center" id="lg-links">
               {/* <ul id="navLinkul" className="nav d-felx justify-content-around  w-100 aling-items-center" >
                <li className="nav-item ">

                  <Link to='/' className=" text-white nav-link">
                    <i className="bi bi-house-fill midgreen"></i>&nbsp;Home
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/aboutus">
                    <i className="bi bi-basket3-fill midgreen"></i>&nbsp;Market
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/services">
                    {" "}
                    <i className="bi bi-chat-fill midgreen"></i>&nbsp;Community
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/dashboard">
                    <i className="bi bi-layout-text-window-reverse midgreen"></i>&nbsp;Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className=" text-white nav-link" to="/bookExpert">
                    <i className="bi bi-person-fill-add midgreen"></i>&nbsp;Book Expert
                  </Link>
                </li>
                </ul>  */}
                <div className="w-75" >
                <h3 className="midgreen mt-3 text-center"><i class="bi bi-person-video2"></i>&nbsp;Admin Dashboard</h3>
                </div>
                <div className="w-25  d-flex justify-content-end">
                <div className="nav-item dropdown ">
                <a
                  href="#"
                  className="nav-link dropdown-toggle  text-white"
                  data-bs-toggle="dropdown"
                  style={{fontSize:"16px"}}
                >
                  <i className="fa fa-bell me-lg-2 midgreen "></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                  <a href="#" className="dropdown-item">
                    <h6 className=" mb-0">Profile updated</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <h6 className=" mb-0">New user added</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <h6 className="mb-0">Password changed</h6>
                    <small>15 minutes ago</small>
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item text-center">
                    See all notifications
                  </a>
                </div>
                 </div>
                </div>
              
            </div>
            <div className="d-flex align-items-center justify-content-center" >
            {/* <a href="#" className="sidebar-toggler m-2 text-decoration-none flex-shrink-0 " id="navToggler">
                 <i className="fa-solid fa-bars midgreen"></i>
             </a> */}
              <div className="nav-item" id="logIutButton" >
              <button type="button" className="btn btn-outline-danger btn-sm m-1" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
       </nav>
    </div>
    
    
    </>  );
}

export default AdminDashboardLinks;