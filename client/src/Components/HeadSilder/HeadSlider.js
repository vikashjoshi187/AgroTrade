import banner1 from "../../assets/Banner1.jpeg"
import banner2 from "../../assets/Banner2.jpeg"
import banner3 from "../../assets/Banner3.jpeg"
import banner5 from "../../assets/banner5.jpeg"
import banner6 from "../../assets/Banner6.jpeg"
import Carousel from 'react-bootstrap/Carousel';
import { useRef,useState } from "react"
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

function HeadSlider() {

  const headerDiv = useRef(null);
  useGSAP(() => {
   // gsap code here...
   gsap.from("#sliderDiv", {duration:1.5,x:-1000,opacity:0}); // <-- automatically reverted
 
 },); // <-- scope is for selector text (optional)



  return (
    <div id="sliderDiv" style={{opacity:"100%"}}>
      
  
    <Carousel fade className="mb-5" >
      <Carousel.Item>
        <img src={banner3} className="w-100" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={banner2} className="w-100" alt="" />

      </Carousel.Item>


      <Carousel.Item>
        <img src={banner1} className="w-100" alt="" />

      </Carousel.Item>


      <Carousel.Item>
        <img src={banner5} className="w-100" alt="" />

      </Carousel.Item>

      <Carousel.Item>
        <img src={banner6} className="w-100" alt="" />

      </Carousel.Item>
    </Carousel>
    </div>
  );
}
export default HeadSlider;