import HeadSlider from '../HeadSilder/HeadSlider.js'
import HomeServices from '../HomeServicesSection/Services.js';
import AboutUs from '../HomeAboutUsSection/Aboutus.js';
import Statistics from '../HomeStatastics/Statistics.js';
import { useDispatch, useSelector } from 'react-redux';
import { jwtVerification, setRoleStatus } from '../../store/commonSlice.js';
import { setUserData } from '../../store/userSlice.js';
import { setOrgData } from '../../store/organizationSlice.js';
import { setAdminData } from '../../store/adminSlice.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js'
import { useEffect, useState } from 'react';
import { EquipmentMarket, LandMarket, storageMarket } from "../../store/marketSlice.js";
import { USER_REQUESTED_URL } from '../../urls.js';
import jscookie from 'js-cookie';
import axios from 'axios';
import { GrainMarketCard } from '../Market/GrainMarket/GrainMarket.js';
import { FarmLandMarketCard } from '../Market/FarmLandMarket/FarmLandMarket.js';
import { EquipmentMarketCard } from '../Market/EquipmentMarket/EquipmentMarket.js';
import Loadinganimtion from '../Loading Amimation/Loadinganimation.jsx';
function Home() {
  const dispatch = useDispatch();
  const [grain, setGrain] = useState(["Loading..."]);
  const [equipment, setEquipment] = useState(["Loading..."]);
  const [agriLand, setAgriland] = useState(["Loading..."]);
  const [storage, setStorage] = useState(["Loading..."]);

  var equip = useSelector(state => state.marketSlice.equipment);
  const getEquipment = async (token) => {
    const equipment = await dispatch(EquipmentMarket(token));
    console.log('equipment in component', equipment.payload);
    if (equipment.payload)
      setEquipment(equipment.payload.slice(0, 2));

  }

  const getLand = async (token) => {
    const agriLand = await dispatch(LandMarket(token));
    console.log('agriLand in component', agriLand.payload);
    if (agriLand.payload)
      setAgriland(agriLand.payload.slice(0, 1));

  }

  const getStorage = async (token) => {
    const storage = await dispatch(storageMarket(token));
    console.log('storage in component', storage.payload);
    if (storage.payload)
      setStorage(storage.payload.slice(0, 2));

  }

  jwtVerification().then((logData) => {
    console.log("logdata : -> ", logData);
    if (logData.role === "user") {
      dispatch(setUserData(logData.log));
      dispatch(setRoleStatus({ role: "user", status: true }));
    } else if (logData.role === "organization") {
      dispatch(setOrgData(logData.log));
      dispatch(setRoleStatus({ role: "organization", status: true }));
    } else if (logData.role === "admin") {
      dispatch(setAdminData(logData.role));
      dispatch(setRoleStatus({ role: "admin", status: true }));
    }
  }).catch(() => {

  });

  useEffect(() => {
    const token = jscookie.get('token')

    const fetchData = async () => {
      try {
        const response = await axios.get(USER_REQUESTED_URL + "/marketGrains");
        console.log("grain in home component",response);

        if (response.data)
          setGrain(response.data.grain.slice(0, 2));
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    getEquipment(token);
    getLand(token);
    getStorage(token)
    console.log('equipment by selector', equip);
  }, []);

  return (
    <>
      <Header />
      <HeadSlider />
      <HomeServices />
      {/* <AboutUs /> */}
      <Statistics />
      <div className='w-100 p-1 ' >
      <h1 className="darkgreen wght-600 text-center mt-5"  >Grains</h1>
    
    <div className='row m-0 w-100'>
       {
          grain[0] == "Loading..." ? <Loadinganimtion /> : grain.length==0 ? <>No Listed Crops Currently</> :grain.map(item => (
       <GrainMarketCard key={item._id} grain={item} />
       ))
       }
     </div>
      </div>


      {/* <LandsSection /> */}
      <div className="container-fluid bg-white mt-5  d-flex justify-content-center pt-4">
        <div className="row m-0" id="lands-row">
          <h1 className="darkgreen wght-600 text-center">Lands</h1>
          {
               grain[0] == "Loading..." ? <Loadinganimtion /> : grain.length==0 ? <>No Listed Grains Currently</> :agriLand.map(item => (
            <FarmLandMarketCard key={item._id} agriLand={item} />
          ))
          }
        </div>
      </div>
      {/* <EquipmentsSection /> */}

      <div className="container-fluid d-flex justify-content-center  pt-4 "  >
        <div className="row m-0 w-100" id="grains-row" >
          <h1 className="darkgreen wght-600 text-center">Equipments</h1>

          {
               equipment[0] == "Loading..." ? <Loadinganimtion /> : equipment.length==0 ? <>No Listed Crops Equipments</> :equipment.map(item => (
            <EquipmentMarketCard key={item._id} equips={item} />
          ))
          }
        </div>
      </div>
      <Footer />

    </>);
};
export default Home;