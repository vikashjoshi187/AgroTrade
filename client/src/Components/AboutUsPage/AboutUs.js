import React from 'react';
import './AboutUs.css';
import aboutimg from '../../assets/aboutimage.jpg'
import aboutlast from '../../assets/aboutlast.jpeg'
import about1 from '../../assets/aboutimag1.jpg'
import about2 from '../../assets/about2.webp'
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
// import { authorize } from '../../store/auth/auth.js';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

function AboutUs() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   authorize(dispatch);
  // }, []);

  return (
    <>
      <Header />
      <div className="blur">
        <img src={aboutimg} alt="" className='w-100' />
      </div>
      <div className="container pt-4 mb-4 w-100 ">
        <div className="row ">
          <div id='ourteam' className="col-lg-6 ml-auto p-4 ">
            <p>Welcome to <span className='heading'>AgroTrade</span></p>
            <h3 className="heading1 fw-bold">Our Team</h3>
            <p style={{ textAlign: "justify" }} className='fs-5'>OriFarm is a fresh and modern Elementor Template Kit that ideal to create a website for all kinds of Farming, Agriculture, Organic
              Food environment-friendly, and any other websites.
              OriFarm is a fresh and modern Elementor Template Kit that ideal to create a website for all kinds of Farming, Agriculture, Organic
              Food environment-friendly, and any other websites Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae id alias, nesciunt temporibus neque doloremque vero! Molestiae vero dolores odit?.</p>
          </div>
          <div className="col-lg-6 mt-4  ml-6  ">
            <img src={about2} alt="logo" className="img-fluid  image1 " />
          </div>
        </div>
      </div>
      <div className="container pt-4 mb-4 container-2 " >
        <div id="org-div" className="row">
          <div className="col-lg-6 mt-4 m-">
            <img src={about1} alt="logo" className="img-fluid  image2" />
          </div>
          <div className="col-lg-6 ml-auto mt-4 p-4">
            <h3 className="heading1 ">Our Organization</h3>
            <p style={{ textAlign: "justify" }} className='fs-5'>OriFarm is a fresh and modern Elementor Template Kit that ideal to create a website for all kinds of Farming, Agriculture, Organic
              Food environment-friendly, and any other websites.
              OriFarm is a fresh and modern Elementor Template Kit that ideal to create a website for all kinds of Farming, Agriculture, Organic
              Food environment-friendly, and any other websites Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur sunt aliquid harum nobis iure cum ipsa illo fuga nihil dignissimos..</p>
          </div>
        </div>
      </div>
      <div className="site-section  pt-5 pb-5">
        <div className="block-2 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 ">
                <h1 className=" text-center text-white">Why Agrotrade</h1>
                <p id="content">"Discover Agro Trade, your all-in-one platform revolutioning agriculture.We specialize in offering online land for cold storage to factory owners and farm rentals.Our commitment extends beyond transaction, providing farmers with a supportive community and expert guidance to cultivate new experience and adopt modern farming techniques. Join Agro Trade in cultivating a sustainable and thriving agricultural future. Your success is our harves"</p>
                {/* <p className="mt-5" id="forLink">Learn More &nbsp;<i className="bi bi-arrow-right"></i></p> */}
              </div>
              <div className="offset-lg-2 offset-md-1 col-lg-5 col-md-5 col-sm-12 col-xs-12  ">
                <img src={aboutlast} alt="logo" id="aboutImg" className="img-fluid img-overlap w-100" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>


  );
}


export default AboutUs;