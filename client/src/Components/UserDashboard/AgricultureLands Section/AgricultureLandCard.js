import "./AgricultureLandCard.css"
import { removeAgriLand } from "../../../store/userSlice"
import Swal from "sweetalert2";
import View from "./View.js";
import UpdateAgriLand from "./UpdateAgriLand.js"
function AgricultureLandCard(props) {
  const {Land,sendLands}= props

  var fromDate=new Date(Land.avilableFrom)
  const dateFrom = fromDate.getDate()+"/"+fromDate.getMonth()+1+"/"+fromDate.getFullYear();   
  console.log("This is the Date"+dateFrom);

  var fromTill=new Date(Land.avilableTill)
  const dateTill = fromTill.getDate()+"/"+fromTill.getMonth()+1+"/"+fromTill.getFullYear();   
  console.log("This is the Date"+dateTill);

  function removeLand(_id,ownerEmail) {
     // Open a confirmation dialog
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
   
        removeAgriLand({_id:_id,ownerEmail:ownerEmail}).then((data)=>{
        console.log("this is the data",data);
        if (data.message==="success") {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Land Removed Successfully",
            showConfirmButton: false,
            timer: 2000
          });
          sendLands(data.Lands)
        }
        else{
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Unavailable to remove Land. Please try Again...",
          });
        }
      }).catch((err)=>{
        console.log("Error in deleting land");
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Unavailable to remove Land. Please try Again...",
        });
      })
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    );
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // User cancelled, do nothing or show a message
    Swal.fire(
      'Cancelled',
      'Your file is safe :)',
      'info'
    );
  }
});
}
  return (
    <>
      <div className="card mb-4 w-100 p-0">
        <div className="row g-0">
          <div className="col-md-4 bg-dark" id="imgeDiv">
            <img src={"http://localhost:3000/"+Land.image} className="img-fluid rounded-start w-100 card-image" alt="..." />
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <div className="p-1" >
               <div className="d-flex justify-content-between" >
                <h3 className="card-title darkgreen ">{Land.landTitle}</h3> <div>
               { Land.agriType=="Organic"? <span className="badge bg-success fs-6 ">Organic</span>: <span className="badge bg-warning fs-6 ">Inorganic</span>}
               </div>
               </div>
                <h5 className="darkgreen">
                  <span className="text-danger">
                    <i className="bi bi-geo-alt text-danger"></i>
                    &nbsp;{Land.city+" "+Land.state}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <span className="text-primary">
                    <i className="bi bi-rulers"></i>&nbsp;Size :{Land.area} acres
                  </span>{" "}
                </h5>
                <h5 className="darkgreen">
                  Soil Type: {Land.soilType}
                </h5>
                <h5 className="darkgreen">
                  Condition: {Land.infrastructure}
                </h5>
                
                <h5 className="darkgreen">
                  Address: {Land.address},{Land.zipCode}
                </h5>
                <h5 className="darkgreen">
                  Suitable For:  {
                    Land.suitableFor.map((Grain,index)=>{
                    return ( <span key={index} class="badge bg-success m-1">{Grain}</span>                                                )
                    })
                    }
                </h5>
                   
                <h5 className="card-text text-break darkgreen  landparag">
                  Description: {Land.description}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3  p-2">
            <div className="row m-0 w-100 d-flex flex-column">
              <div className="col-12 d-flex justify-content-end pt-3 pe-3">
             {Land.avilable?<span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span>:<span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}
             
              </div>
              <div className="col-12  midgreen">
                <h5>
                  Rent: {Land.rent}/Month
                </h5>
                <h5 className="darkgreen ">
                  From: {dateFrom}
                </h5>

                <h5 className="darkgreen">
                  To: {dateTill}
                </h5>
                <div className="d-grid gap-2">
                  <View image360={Land.image360} />
                    <UpdateAgriLand Land={Land} sendLands={sendLands}></UpdateAgriLand>
                  <button type="button" onClick={()=>{removeLand(Land._id,Land.ownerEmail)}}  className="btn btn-outline-danger btn-sm"> <i class="bi bi-trash"></i>&nbsp;Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgricultureLandCard;
