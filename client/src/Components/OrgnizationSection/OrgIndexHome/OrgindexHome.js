import React from 'react'
import HeadSlider from '../../HeadSilder/HeadSlider'
import HomeServices from '../../HomeServicesSection/Services'
import Aboutus from '../../HomeAboutUsSection/Aboutus'

export default function OrgindexHome() {
  return (
    <div>
      <HeadSlider/>
      <HomeServices/>
      <div className='mb-4'>
      <Aboutus/>
      </div>
      
      
    </div>
  )
}
