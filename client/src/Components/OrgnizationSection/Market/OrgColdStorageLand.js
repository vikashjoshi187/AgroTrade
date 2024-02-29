import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ORGANIZATION_REQUESTED_URL } from '../../../urls';
// import Agri_land_cardCold_book from './Agri-landCold-book-card/Agrilandcard';
import Agri_landCold_card_book from './Agri-landCold-book-card/Agrilandcoldcard';

import View from './View';
import jscookie from 'js-cookie';
import { useDispatch } from 'react-redux';


export default function OrgColdStorageLand() {
  const [storages, setStorage] = useState([]);

  // const dispatch=useDispatch();
  // const getStorage = async (token) => {
  //   const storage = await dispatch(storageMarket(token));
  //   console.log('storage in component', storage.payload);
  //   setStorage(storage.payload);

  // }
  // useEffect(()=>{
  //   const token = jscookie.get('token')

  //   getStorage(token)


  // },[getStorage])

  const getData = () => {
    try {
      axios.get(ORGANIZATION_REQUESTED_URL + '/orgVeiwColdLand').then((response) => {
        setStorage(response.data.result);
      }).catch(err => console.log("error in org", err));
    } catch (err) {
      console.log("Error in org Coldland", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className='p-5'>
      <div className='mt-3 mb-3 text-center darkgreen fw-bolder'>
        <h2 className='text-start'>Cold Storage Land</h2>
      </div>
      <div className='row w-100 p-0 m-0'>
      {
        

// mapfunction lgana
  storages.map((ColdSt,index)=>{
    return(<Agri_landCold_card_book ColdSt={ColdSt} key={index} />)
  })

      }
      
      </div>
    </div>
  )
}
