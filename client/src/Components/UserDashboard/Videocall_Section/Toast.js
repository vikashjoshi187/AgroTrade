import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
function Meeting_Link_Toast(props) {
    const {link} =props;
    const [show,setShow]=useState(true)
   function copy(data) {
    // document.execCommand('SelectAll');
    // document.getElementById("copyText").value.execCommand("SelectAll")
    // document.execCommand("Copy", false, null);
    navigator.clipboard.writeText(data)
    .then(() => {
        console.log('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Error copying text: ', err);
    });

   }

  return (
    <ToastContainer
    className="p-5"
    position="bottom-start"
    style={{ zIndex: 99999 }}
  >
    <Toast className='' onClose={() => {setShow(false)}}        bg={"light"}   style={{height:"20vh"}} show={show}>
      <Toast.Header  closeButton={true}>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto midgreen fs-5">Agro Trade</strong>
      </Toast.Header>
      <Toast.Body className='p-2 pt-2'>
      <h4 className='midgreen mb-1'>You created new meeting !!</h4>
      <p className='midgreen fs-6 mb-0 ms-1'>share this link to join other person</p>
      <div class="btn-group w-100 my-2 " role="group" aria-label="Basic example">
      <input id='copyText' className=' midgreen form-control form-control-sm' type="text"  value={link} readOnly/>
      <button className='btn btn-sm bg-midgreen text-white'  onClick={copy(link)} type="button">Copy</button>
     </div>
      <p className='midgreen fs-5  mb-3'><i class="bi bi-shield-fill-check"></i>&nbsp;Joined Securly</p>
      </Toast.Body>
 


    </Toast>
  </ToastContainer>
  );
}

export default Meeting_Link_Toast;