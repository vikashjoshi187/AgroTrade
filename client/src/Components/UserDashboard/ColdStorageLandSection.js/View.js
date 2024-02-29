import { useState,useEffect } from "react";
import * as PANOLENS from 'panolens';
// import imge from "../../../assets/field.jpg"
import Modal from "react-bootstrap/Modal";
function View(props) {
    const {image360}=props;
    const [lgShow,setLgShow] = useState(false);

    useEffect(() => {
        if (lgShow) {
            const panoramaImage = new PANOLENS.ImagePanorama("http://localhost:3000/"+image360);
        const viewer = new PANOLENS.Viewer({
          container: document.querySelector('.image360_container'),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          controlBar: true
        });
        viewer.add(panoramaImage);
        }
      }, [lgShow,image360]); 
      
    
      
    return ( <>
     <>
          <button onClick={()=>setLgShow(true)}  type="button" className="btn-sm btn btn-outline-secondary"><i class="fa-solid fa-panorama"></i>&nbsp;360 view</button>
           <Modal size="xl" show={lgShow} onHide={()=>setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg" className="darkgreen">
                    <i class="fa-solid fa-panorama"></i>&nbsp;360 View
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
               <div className="image360_container" style={{height:"50vh"}}>  
               </div>
                </Modal.Body>
            </Modal>
        </>
    </> );
}

export default View;