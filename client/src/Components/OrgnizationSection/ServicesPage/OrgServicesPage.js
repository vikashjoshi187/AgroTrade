// import video1 from './media/svideo1.mp4'
// import video2 from './media/svideo2.mp4'
// import video3 from './media/svideo3.mp4'
import './ServicesPage.css'
import equipment from '../../../assets/equip1.jpg'
import grain from '../../../assets/grain2.jpg'
import land from '../../../assets/lands2.jpg'
import expert from '../../../assets/expert2.jpg'
import community from '../../../assets/community1.jpg'
import { jwtVerification } from '../../../store/commonSlice.js'

import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Service1, Service2 } from './Service1.js';
import { useDispatch } from 'react-redux'

import { setUserData } from '../../../store/userSlice.js'
import { setRoleStatus } from '../../../store/commonSlice.js'
import { setOrgData } from '../../../store/organizationSlice.js'
import { setAdminData } from '../../../store/adminSlice.js'

import { useEffect } from 'react'
function OrgServices() {
  const dispatch = useDispatch();
  useEffect(()=>{

    jwtVerification().then((logData)=>{
      console.log("logdata : -> ",logData  );
      if(logData.role=="user"){
        dispatch(setUserData(logData.log));
        dispatch(setRoleStatus({role:"user", status: true}));
      }else if(logData.role=="organization"){
        dispatch(setOrgData(logData.log));
        dispatch(setRoleStatus({role:"organization", status: true}));
      }else if(logData.role=="admin"){
        dispatch(setAdminData(logData.role));
        dispatch(setRoleStatus({role:"admin", status:true}));
      }
    }).catch(()=>{
      
    });
  },[]);
  return (<>
      {/* <Header/> */}
      <div className="hero-section">
        <Carousel >
          <Carousel.Item >
            <video className="d-block w-100" controls style={{ height: "89vh", width: '100%' }}>
              {/* <source src={video1} type="video/mp4"  /> */}
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
          <Carousel.Item style={{ height: "99vh" }}>
            <video className="d-block w-100" controls>
              {/* <source src={video2} type="video/mp4" autoPlay muted loop /> */}
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
          <Carousel.Item style={{ height: "99vh" }}>
            <video className="d-block w-100" controls>
              {/* <source src={video3} type="video/mp4" autoPlay muted loop /> */}
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
        </Carousel>
        <h1 className="text-center mt-5">Services</h1>
        <Service1
          title=" Farming Equipment Rental Service"
          content="Say goodbye to the upfront costs of purchasing equipment and hello to a new era of agricultural efficiency.
          Join our community of satisfied farmers who trust AgroTrade to deliver reliable, on-demand solutions.
          Cultivate success with us, and experience firsthand how the right equipment,
          right when you need it, can transform your farm into a thriving operation. it's a commitment to supporting your agricultural
          journey by eliminating barriers and promoting operational agility. Invest in the future of your farm by partnering with AgroTrade,
            where efficiency, reliability, and success converge."
          image={equipment}
        />

        <Service2
          title="Direct Grain from Farmer"
          content="Experience the freshness of our direct grain from farmer service, connecting you directly with local farmers. 
          Say goodbye to middlemen and enjoy premium quality grains harvested with care. Our transparent supply chain ensures traceability,
          supporting local farmers and promoting sustainable agriculture. From field to your table, savor the flavor of authenticity and support 
          the farming community. Join us in fostering a direct connection with the source for a healthier, tastier future. Embrace quality, 
          embrace sustainability – choose direct grain from farmer service today!
          "
          image={grain}
        />

        <Service1
          title="Land for Agriculture and Storage"
          content="Embark on a journey towards agricultural self-sufficiency by securing the ideal land for grain cultivation.
          Our innovative land booking service empowers factory owners to reserve plots directly from farmers, ensuring a steady supply of their
          desired grain. Cultivate partnerships with local farmers, fostering a mutually beneficial relationship that guarantees a reliable source
          of high-quality produce for your factory. Seamlessly integrate your production process by reserving the land that aligns with your grain
          requirements.  "
          image={land}
        />

        <Service2
          title="Consultancy Through Expert Talk"
          content="Step into a new era of farming excellence with our revolutionary farming expert facility. Access a wealth of agricultural knowledge
          through personalized video consultations and real-time chat support.
          Our team of seasoned farming experts is ready to assist you with
          tailored advice, troubleshooting, and innovative solutions to optimize your crop yield
          Benefit from our team's wealth of experience, receiving guidance on crop management strategies, pest control, and sustainable 
          farming practices.introducing you to the latest technologies 
          and eco-friendly approaches.
          "
          image={expert}
        />

        <Service1
          title="Community Section for all Users"
          content="Our vibrant community where farmer experts, citizens, and factory owners come together to share knowledge and 
          experiences. This platform is your space to engage, inspire, and collaborate with like-minded individuals passionate about agriculture
          and industry. Post your success stories, seek advice from seasoned farmers, or share innovative solutions for factory operations.
          From the seasoned farmer with a green thumb to the visionary factory owner driving innovation, every voice matters here. 
          Join the conversation, connect with experts. "
          image={community}
        />

      </div>
    </>
  );
}

export default OrgServices;