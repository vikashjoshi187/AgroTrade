import React from 'react';
import { useState, useEffect } from 'react'
import jscookie from "js-cookie";
import axios from 'axios';
import { ORGANIZATION_REQUESTED_URL } from '../../../urls';
import OrgProfileUpdate from './OrgProfileUpdate';
import "./orgprofile.css";

export default function OrgProfile() {
    const [dataOrg, setDataOrg] = useState({});
    var getOrgProfile = () => {
        const dealer_email = jscookie.get("dealer_email");
        axios.post(ORGANIZATION_REQUESTED_URL + "/getOrgProfile", { dealer_email }).then((orgprofile) => {
            setDataOrg(orgprofile.data.result);
        }).catch(err => console.log('error', err));
    }

    useEffect(getOrgProfile, [])
    return (
        <div>
            <section className="bg-light">
                <div className="container p-2 ">
                {/* <h2 className=' text-success'><i class="bi bi-person-lines-fill"></i><span className=''>
                      Manage Account
                    </span></h2> */}
                    <div className="row m-0 w-100">
                        <div className="card  mt-2">
                            <div className="card-body overflow-auto">
                               
                                <div className="row m-0 w-100">

                                    <div className=" col-md-12 col-lg-2  d-flex justify-content-center  aling-items-center mt-5 " >
                                         <img   className="rounded aling-self-center img-fluid w-100  " src={`http://localhost:3000/${dataOrg.org_image}`} alt={dataOrg.org_image} height={"170px"}/>
                                    </div>
                                    
                                    <div className=" col-md-12 col-lg-5 p-3" >
                                       
                                        <h2 className="darkgreen" ><i class="bi bi-buildings"></i>&nbsp;{dataOrg.company_name}</h2>
                                        <h5>{dataOrg.verify_status ? <span className="text-succcess" ><i class="bi bi-check-lg "></i>&nbsp;Varified</span> : <span className="text-danger"><i class="bi bi-x-circle-fill "></i>&nbsp;Not varified </span>}</h5>
                                        <h5>{dataOrg.status == "active" ? <span className="text-success" >Status: {dataOrg.status}</span> : <span className="text-danger" >Status: {dataOrg.status}</span>}</h5>
                                        <h5 className="darkgreen">Reg name: {dataOrg.reg_name}</h5>
                                        <h5 className="darkgreen">Reg number: {dataOrg.reg_number}</h5>
                                        <h5 className="darkgreen"><i class="bi bi-envelope-fill"></i>&nbsp;Email: {dataOrg.org_email}</h5>
                                        <h5 className="darkgreen"><i class="bi bi-buildings"></i>&nbsp;Org type: {dataOrg.org_type}</h5>
                                        {/* <p className="fs-5 darkgreen"><i class="bi bi-file-earmark-fill"></i>&nbsp;Description : {dataOrg.org_description}</p> */}
                                        <span className='fs-5 darkgreen'><i class="bi bi-file-earmark-fill"></i>Description :</span>
                                        <div className='description-container '>
                                        <p className="description-text fs-5">
                                          {dataOrg.org_description}
                                        </p> 
                                        </div>
                                        {/* <div className="description-container">  */}
                                        
                                      {/* </div> */}
                                    </div>
                                    <div className=" col-md-12 col-lg-5 p-3">
                                        <h5 className="darkgreen"><i class="bi bi-person-fill"></i>&nbsp;Owner name: {dataOrg.owner_name}</h5>
                                        <h5 className="darkgreen" ><i class="bi bi-geo-fill"></i>&nbsp;Address: {dataOrg.address + " " + dataOrg.city + "," + dataOrg.state + "," + dataOrg.zip_code}</h5>

                                        <div className="mt-5" >
                                            <h3><i class="bi bi-person-circle mt-5"></i>&nbsp;Dealer details:</h3>
                                            <h5 ><i class="bi bi-person-fill"></i>&nbsp;Dealer name: {dataOrg.dealer_name}
                                            </h5>
                                            <h5 className="ms-2" ><i class="bi bi-envelope-fill">&nbsp;Email: {dataOrg.dealer_email} </i>&nbsp;</h5>
                                            <h5 className="ms-2" ><i class="bi bi-telephone-fill"></i>&nbsp;Contact: {dataOrg.dealer_contact}</h5>
                                        </div>
                                    </div>
                                    <div className="d-grid   justify-content-center p-1">
                                        <OrgProfileUpdate DataOrg={dataOrg} getOrgProfile={getOrgProfile} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>

    );
}
