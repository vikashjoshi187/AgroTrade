import logo from "../../assets/Agro-Trade-logo.png"
import "./Footer.css"
function Footer() {
return ( <>
   <div className="container-fluid  d-flex justify-content-center p-0" id="footerMiandiv">
    <div className="overlay w-100 h-100 pt-4 pb-4" >
      <div className="w-100" id="footer-innercointaner  " >
       
        <div className="row m-0 w-100 mb-1 ps-5 pe-3" >
          <div className="col-12 col-md-6 mt-2 p-1" >
            <h1 className="midgreen" >Agro Trade</h1>    
         </div>
         <div className="col-12 col-md-6  mt-2">
          <div>
         <div className="input-group mb-2 bg-white p-1 pe-2">
           <input type="email" className="form-control form-control-sm m-0" placeholder="Enter email" id="subscribeInput" aria-label="Enter email" aria-describedby="button-addon2"/>
           <button className="btn btn-success btn-sm m-0 pe-3 ps-3" type="button" id="subscribeBtn">SUBSCRIBE</button>
         </div>
            <p className="text-white" >Subscribe for new updates and alerts . Let's do it! </p>
          </div>
        </div>
        </div>
       
       </div>
       <hr id="footerHr"/>
       <div className="p-3" id="footer-innercointaner" >
        <div className="row m-0 w-100">
            <div className="col-12 col-sm-6  col-md-2  d-flex aling-items-center">
                <div className="w-100">
                  <div className="d-flex justify-content-center w-100" >
                    <img src={logo} className="w-75" alt=""/>
                  </div>  
                 <p className="text-center  midgreen " >Follow Us on</p>
                   <div className="row m-0 w-100" >
                      <div className="col-4" >
                         <h4 className="text-center" > <a className="footerLink" href=""><i className="bi bi-facebook"></i></a></h4> 
                      </div>
                      <div className="col-4" >
                        <h4 className="text-center" ><a  className="footerLink"href=""><i className="bi bi-instagram"></i></a></h4>
                      </div>
                      <div className="col-4" >
                        <h4 className="text-center" ><a className="footerLink" href=""><i className="bi bi-twitter-x"></i></a></h4>
                      </div>
                   </div>
                </div>
            </div>

            <div className="col-12 col-sm-6  col-md-2  p-3 ps-4 pt-4">
                <h4 className="  midgreen  ">Services</h4>
                 <h6 className="mt-3 "><a className="footerLink" href="/">Book Land</a></h6> 
                 <h6 className="mt-3 "><a className="footerLink" href="/">Rent Equipment</a></h6>
                 <h6 className="mt-3 "><a className="footerLink" href="/">Buy Grains</a></h6>
                 <h6 className="mt-3 "><a className="footerLink" href="/">Talk Expert </a></h6>
            </div>

            <div className="col-12 col-sm-6  col-md-2  p-3 ps-4 pt-4">
                <h4 className="  midgreen">Go to</h4>
                 <h6 className="mt-3 "><a className="footerLink" href="/">Dashboard</a></h6> 
                 <h6 className="mt-3 "><a className="footerLink" href="/">Community</a></h6>
                 <h6 className="mt-3 "><a className="footerLink" href="/">Shopping</a></h6>
            </div>

            <div className="col-12 col-sm-6  col-md-2 p-3 ps-4 pt-4">
                <h4 className="  midgreen">Company</h4>
                 <h6 className="mt-3"><a className="footerLink" href="/">About us</a></h6> 
                 <h6 className="mt-3"><a className="footerLink" href="/">Contact us</a></h6>
                 <h6 className="mt-3"><a className="footerLink" href="/">FAQs</a></h6>
                 <h6 className="mt-3"><a className="footerLink" href="/">Terms</a></h6>
            </div>
            <div className="col-12 col-sm-6  col-md-4  p-3 ps-4 pt-4">
                <h4 className="  midgreen ">Contact us</h4>
                 <h6 className="mt-3 "><a className="footerLink" href="/"><i className="bi bi-geo-alt-fill">&nbsp;Yashwant Ganj,M.T Cloth Market, Indore, Madhya Pradesh 452002</i></a></h6> 
                 <h6 className="mt-3 text-white"><a className="footerLink" href="/"><i className="bi bi-envelope"></i>&nbsp;agrotrade@gmail.com</a></h6>
                 <h6 className="mt-3 text-white"><a className="footerLink" href="/"><i className="bi bi-telephone-fill"></i>&nbsp;+91 9977839880</a></h6>

            </div>
            
        </div>
    </div>
    </div> 
   </div>
</> );
}

export default Footer;