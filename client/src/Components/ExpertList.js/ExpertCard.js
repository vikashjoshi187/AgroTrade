import "./ExperCard.css"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { REQUESTED_URL } from "../../urls";
import BookExpert from "./BookExpert";
import jscookie from "js-cookie"
import { createChat } from "../../store/chatSlice";
import Swal from "sweetalert2";


function ExpertCard(props) {
   const  {expert}=props;
   const [message,setMessage]=useState("")

  function showMessageBox(){
    document.getElementById(`MessageBox${expert.name}`).classList.remove("d-none")
  }
  function hideMessageBox(){
    document.getElementById(`MessageBox${expert.name}`).classList.add("d-none")
  }


  const senderId = jscookie.get("userEmail");
  const reciverId=expert.email;


 function callCreatechat(){
    if (message) {
        const payLoad={
            senderId,
            reciverId,
            message
        }
      var result=  createChat(payLoad)
      if (result) {
        Swal.fire({      
           position: "middle",
           icon: "success",
            title: 'Message Sent',
            text: 'Message Sent Successfully',
            timer: 2000,
            
          })
          hideMessageBox()
      }
    }
    else{
        Swal.fire({
            position: "middle",
            icon: "error",
            title: 'Empty Message',
            text: 'Please Type a message.',
            timer: 2000
          })
    }
 }

  return (
    <>
 <div class="col-12 col-md-6 col-lg-4 col-xl-3  p-2">
    <div class="card w-100 h-100">   
      <div class="d-flex flex-column justify-content-center aling-items-center  mt-2">
                    <div class="image align-self-center">
                     <img src={REQUESTED_URL+"/"+expert.image} class="rounded-circle" width="100" height={100}/>
                    </div>   
                     <h4 className="text-center mt-1" >{expert.name}</h4>   
                   <div class=" w-100 ">
                     <h6 className="text-center  fs-6 text-success" ><i class="bi bi-envelope"></i>&nbsp;{expert.email}</h6>   
                     <h6 className="text-center mt-1 text-primary" ><i class="bi bi-mortarboard"></i>&nbsp;Education {expert.education}</h6>
                   <div>
                    <h6 className="text-center mt-1 text-warning" ><i class="bi bi-mortarboard"></i>&nbsp;Expricence
                     {expert.experience} Yr {expert.status==="active"?<span className="fs-6 text-success"><i class="bi bi-check-lg "></i>&nbsp;Avilable</span>:
                     <span className="fs-6 text-danger"><i class="bi bi-x-lg"></i>&nbsp;Unavilable</span>}</h6>   
                  </div>
                </div>  
                <div className="w-100 " >
               <table class="table table-bordered border-success">
              <thead>
                  <tr>
                    <th className="text-success" scope="col">Service</th>
                    <th className="text-success" scope="col">Avilable</th>
                    <th className="text-success" scope="col">Fee</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td  className="text-success"><i class="bi bi-chat"></i>&nbsp;Chat</td>
                    <td  className="text-success">{expert.consultancy_fee_chat?<i class="bi bi-check-lg fs-4"></i>:<i class="bi bi-x-lg text-danger"></i>}</td>
                    <td  className="text-success">{expert.consultancy_fee_chat?expert.consultancy_fee_chat:"--"}</td>
                  </tr>
                  <tr>
                    <td  className="text-success"><i class="bi bi-camera-video"></i>&nbsp;Video</td>
                    <td  className="text-success">{expert.consultancy_fee_video?<i class="bi bi-check-lg fs-4"></i>:<i class="bi bi-x-lg text-danger"></i>}</td>
                    <td  className="text-success">{expert.consultancy_fee_video?expert.consultancy_fee_video:"--"}</td>
                  </tr>
                </tbody>
              </table>
             </div> 


                {/* <div className="w-100 d-flex justify-content-center " >
               <div className="w-75" >
               <ul class="list-group list-group-horizontal w-100">
                   <li class=" list-group-item list-group-item-success w-50 p-2">Service</li>
                   <li class=" list-group-item list-group-item-success w-25 p-2">Avilable</li>
                   <li class=" list-group-item list-group-item-success w-25 p-2">Fee</li>
                 </ul>
                   
                <ul class="list-group list-group-horizontal">
                   <li class=" list-group-item list-group-item-success w-50 p-2"><i class="bi bi-chat"></i>&nbsp;Chat</li>
                   <li class=" list-group-item list-group-item-success w-25 p-2 text-center"><i class="bi bi-check-lg fs-4"></i></li>
                   <li class=" list-group-item list-group-item-success w-25 p-2">5500</li>
                 </ul>
                 <ul class="list-group list-group-horizontal-sm">
                   <li class=" list-group-item list-group-item-success w-50 p-2"><i class="bi bi-camera-video"></i>&nbsp;Video call</li>
                   <li class=" list-group-item list-group-item-success w-25 p-2 text-center"><i class="bi bi-check-lg fs-4"></i></li>
                   <li class=" list-group-item list-group-item-success w-25 p-2">10000</li>
                 </ul>
               </div>
             </div>        */}
            <div className="d-flex justify-content-around mt-4" >
             <BookExpert ExpertId={expert._id} />
             <button class="btn btn-primary" onClick={showMessageBox}><i class="fa fa-clock-o"></i><i class="bi bi-chat-dots"></i>&nbsp;Message</button>
            </div>
            <div className="mt-2 ps-5 pe-5 m-3 d-none" id={`MessageBox${expert.name}`} >
                <hr/>
                <textarea rows="" onChange={(e)=>setMessage(e.target.value)} cols="3" placeholder="Type a message..." className="form-control"></textarea>
               <button type="button" className="btn btn-primary mt-2 w-100" onClick={callCreatechat}><i class="bi bi-send"></i>&nbsp;Send Message</button>
               <button type="button" className="btn btn-secondary mt-2 w-100" onClick={hideMessageBox}><i class="bi bi-x "></i>&nbsp;Cancel</button>
            </div>               
</div>
<div class="third mt-4">


</div>
</div>
</div>
       








      

    </>
  );
}

export default ExpertCard;