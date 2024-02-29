import { useEffect, useState } from 'react'
import HeadSlider from '../HeadSilder/HeadSlider'
import Header from '../Header/Header'
import jscookie from 'js-cookie'
import './ExpertList.css'
import ExpertCard from './ExpertCard.js'
import { getExpert } from '../../store/expertSlice';
import BookExpert from './BookExpert.js'
import Loadinganimtion from '../Loading Amimation/Loadinganimation.jsx'
export default function ExpertList() {
  const [expert, setExpert] = useState([]);
  const [status, setStatus] = useState(false);


  useEffect(() => {
    const Expert = async () => {
      const token = jscookie.get("token")
      const response = await getExpert()
      console.log("expertList in component", response);
      if (response) {
        setStatus(true)
        setExpert([...response.expert]);
      }
    }
     Expert();
   
  }, []);

  return (
    <>
      <Header />

      <div className='container p-2 '>
        <h1><i class="fa-solid fa-user-tie m-2"></i>&nbsp;Our Experts</h1>
      <div className="row w-100">
        {status ?
          expert.map((data, i) => {
            return (
            <>
                <ExpertCard expert={data} key={i}/>

            </>
            )
          })
          :
         <div>
          <Loadinganimtion/>
          <h1>Loading...</h1>
         </div>

        }
      </div>
      </div>


    </>

  )
}