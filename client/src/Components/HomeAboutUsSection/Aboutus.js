import about from "../../assets/about.jpeg"
import "./About.css"


function AboutUs() {
    return (
        <>
            <div className="site-section pb-0 mt-5 pt-5">
                <div className="block-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <img src={about} alt="logo" id="aboutImg" className="img-fluid img-overlap" />
                            </div>
                            <div className="col-lg-5 ml-auto">
                                <h1 className=" text-center text-white">About Us</h1>
                                <p id="content">"Discover Agro Trade, your all-in-one platform revolutioning agriculture.We specialize in offering online land for cold storage to factory owners and farm rentals.Our commitment extends beyond transaction, providing farmers with a supportive community and expert guidance to cultivate new experience and adopt modern farming techniques. Join Agro Trade in cultivating a sustainable and thriving agricultural future. Your success is our harvest"</p>
                                <p className="mt-5" id="forLink">Learn More &nbsp;<i className="bi bi-arrow-right"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* 
            <div className="container-fluid p-3 bg-darkgreen" >
                <div className="row ms-5 me-5 bg-danger" >
                    <div className="col-12 col-md-6 bg-darkgreen" >
                        <img className="w-100 " src={about} alt=""/>
                    </div>

                    <div className="col-12 col-md-6 p-3 bg-darkgreen d-flex justify-content-center aling-items-center " >
                  <div>
                  <h1 className="text-center text-white wght-600" >About Us</h1>
                   <p id="aboutuspara" className="ms-5 me-5" >"Discover Agro Trade, your all-in-one platform revolutioning agriculture.We specialize in offering online land for cold storage to factory owners and farm rentals.Our commitment extends beyond transaction, providing farmers with a supportive community and expert guidance to cultivate new experience and adopt modern farming techniques. Join Agro Trade in cultivating a sustainable and thriving agricultural future. Your success is our harvest"</p>
                    
                  </div>        
                        
                    </div>
                </div>


            </div> */}
        </>
    )
}

export default AboutUs;