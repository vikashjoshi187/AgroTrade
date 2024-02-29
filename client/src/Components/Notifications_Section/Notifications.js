


import ToastContainer from 'react-bootstrap/ToastContainer';
import "./Notifications.css"
import NotificationTab from './NotificationTab';
import { useState,useEffect } from 'react';
function Notifications(props) {
    const {Allnotifications}=props;
    var [AllNotification,SetAllNotification]=useState([])

    // useEffect(()=>{
    //     AllNotification=Allnotifications;
    //     SetAllNotification([...AllNotification])

    // },[props])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toast-container"
    >
      <ToastContainer position="bottom-end" style={{ zIndex: 2 }}>
       
       {Allnotifications.map((Allnotification,i)=>{
        return(<>
        
        <NotificationTab Allnotification={Allnotification} key={i}/>
        </>)
       })}
     

      

       
        
      </ToastContainer>
    </div>
  );
}

export default Notifications;
