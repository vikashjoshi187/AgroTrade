import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { format } from "timeago.js";
function NotificationTab(props) {
    const {Allnotification} =props;
    const [show,handelShow]=useState(true)

    return ( <>
    
    <Toast show={show} onClose={() => handelShow(false)} bg={"success"}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{Allnotification.senderId}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body><h6 className='text-white' >{Allnotification.text}</h6></Toast.Body>
        </Toast>
    </> );
}

export default NotificationTab;