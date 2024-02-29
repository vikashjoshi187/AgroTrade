import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestForLandModal from "../RequestForLandModal/RequestForLandModal.js"
import { useNavigate } from 'react-router-dom';
import { ORGANIZATION_REQUESTED_URL } from '../../../urls';
import View from "./View.js";
import Agri_landAgriland_book from './Agri-land-book-card/Agrilandcard.js';

export default function OrgAgricutureLand() {
  const [orgAgriList, setAgriland] = useState([]);
  const getData = () => {
    try {
      axios.get(ORGANIZATION_REQUESTED_URL + '/orgVeiwAgriLand').then((response) => {
        setAgriland(response.data.result);
      }).catch(err => console.log("error in org", err));
    } catch (err) {
      console.log("Error in org ariland", err);
    }
  } 

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='p-5'>
    <div className='mt-3 mb-3 text-center darkgreen fw-bolder'>
      <h2 className='text-start'>Agriculture Land</h2>
    </div>
    <div className='row w-100 p-0 m-0'>

   
  {orgAgriList.map((Land, index) => {
   return (<Agri_landAgriland_book Land={Land} key={index}/>)
  }) 
}
    </div>
    </div>
  );
}
