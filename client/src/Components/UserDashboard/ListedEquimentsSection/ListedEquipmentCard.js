// import tractor from "../../../assets/john-deere-wallpaper-19-642x462 (1).jpg"
import "./ListedEquipmentCard.css"
import Swal from "sweetalert2";
import { deleteEquipmentId } from "../../../store/userSlice";
import UpdateEquipmentModal from "./UpdateEquipment.js";

function ListedEquipmentCard(props) { 
const {Equipment,getEquipments}=props;


const deleteEquipment = (EquipmentId)=>{
  Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       
        deleteEquipmentId({EquipmentId}).then((data) => {
          if (data.message === "success") {
            Swal.fire({
              position: "middle",
              icon: "success",
              title: "Delete Successfully",
              showConfirmButton: false,
              timer: 2000
            });
            getEquipments();
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Unavailable to Delete Equipment. Please try Again...",
            });
          }
        }).catch((err) => {
          console.log("err", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Unavailable to Delete Equipment. Please try Again...",
          });
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'info'
        );
      }
    });


}
return ( <>

        <div className="col-12 col-sm-12 col-md-6  p-1  d-flex justify-content-center " >
                    <div className="card bg-light  w-100 p-0 m-0" style={{borderRadius:"5px"}}>
                      <div className="row m-0">
                        <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 p-0" id="imgeDiv">
                            <img src={"http://localhost:3000/"+Equipment.image} className="img-fluid  rounded-start w-100 card-image" alt={Equipment.image} />
                        </div>
                        <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
                          <div className="card-body">
                            <div className="d-flex justify-content-between" >
                            <h4 className="card-title darkgreen mb-0"> {Equipment.equipmentname}</h4>
                            {Equipment.avilable?  <span className="badge bg-warning text-black  fs-6">Available</span>:  <span className="badge bg-danger text-black  fs-6">Booked</span>}
                            </div>
                            <p className="card-text darkgreen fs-6 m-0 ">
                              ModelNo: {Equipment.modelnumber}
                            </p>
                            <p className="card-text darkgreen fs-6 m-0 ">
                              Type: {Equipment.equipmenttype}
                            </p>
                            <p className="card-text darkgreen fs-6 m-0 ">
                              Price: Rs. {Equipment.price}/days 
                            </p>
                            <p className="card-text darkgreen fs-6 m-0 ">
                              Condition: {Equipment.condition}
                            </p>
                            <p className="card-text darkgreen fs-6 m-0 ">
                              Quantity: {Equipment.quantity}
                            </p>
                            <p className="card-text darkgreen  fs-6 m-0 ">
                               Address: {Equipment.address}
                            </p>
                            <p className="card-text darkgreen fs-6 m-0" style={{maxHeight:"30px",overflow:"scroll"}} >Description: {Equipment.description}</p>
                            <p className="card-text darkgreen fs-6 m-0"><i className="bi bi-geo-alt text-danger"></i>&nbsp;{Equipment.city},{Equipment.state}</p>
                            <div className="d-grid gap-1 mt-1">
                            <UpdateEquipmentModal getEquipments={getEquipments} Equipment={Equipment}/>
                            <button type="button" name="" id="" className="btn btn-outline-danger btn-sm" onClick={()=>{deleteEquipment(Equipment._id)}}><i className="bi bi-trash"></i>&nbsp;Delete
                            </button> 
                           </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                </>);
}

export default ListedEquipmentCard;