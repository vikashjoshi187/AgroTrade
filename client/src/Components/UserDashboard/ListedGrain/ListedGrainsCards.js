import UpdateGrainModal from "./UpdateGrain";
import { deleteGrainId } from "../../../store/userSlice";
import "./ListedGrinCard.css"
import Swal from "sweetalert2";
function ListedGrainsCards(props) {
    const {Grain,getGrians}=props;
    const deleteGrain = (GrainId)=>{
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
           
            deleteGrainId({GrainId}).then((data) => {
              if (data.message === "success") {
                Swal.fire({
                  position: "middle",
                  icon: "success",
                  title: "Delete Successfully",
                  showConfirmButton: false,
                  timer: 2000
                });
                getGrians();
              }
              else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Unavailable to Delete Grain. Please try Again...",
                });
              }
            }).catch((err) => {
              console.log("err", err);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unavailable to Delete Grain. Please try Again...",
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
    <div className=" col-6 col-sm-6 col-md-6  col-lg-6     d-flex justify-content-center pb-3">
      <div className="card bg-white p-0 w-100">
        <div className="row m-0 ">
          <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 p-0 " id="imgeDiv">
            <img src={"http://localhost:3000/"+Grain.image} className="img-fluid rounded-start w-100  card-image" alt={Grain.image} />
          </div>
          <div className=" col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="card-title darkgreen fs-4 m-0">{Grain.grainname}</h4>
                {Grain.grain==="inorganic"? <span className="badge bg-warning fs-6">Inorganic</span>: <span className="badge bg-success fs-6">Organic</span>}
              </div>
              <p className="card-text darkgreen fs-6 m-0">
                Type: {Grain.graintype}
              </p>
              <p className="card-text darkgreen fs-6 m-0">
                Price: Rs.{Grain.price}/quintal
              </p>
              <p className="card-text darkgreen fs-6 m-0">
                Quantity:{Grain.quantity} quintal
              </p>
              <p className="card-text darkgreen fs-6 m-0">
                Shelf Life: {Grain.selflife} Month 
              </p>
              <p className="card-text darkgreen fs-6 m-0">
                Moisture Level: {Grain.moisturelevel}%
              </p>
              <p className="card-text darkgreen fs-6 m-0 " style={{maxHeight:"30px",overflow:"scroll"}} >Description: {Grain.description}</p>
              <p className="card-text darkgreen fs-6 m-0"><i className="bi bi-geo-alt text-danger"></i>&nbsp;{Grain.city},{Grain.state}</p>
              <div className="d-grid gap-1 mt-2 ">
                <UpdateGrainModal getGrians={getGrians} Grain={Grain}/>
                <button type="bu tton" name="" id="" className="btn btn-outline-danger btn-sm" onClick={()=>{deleteGrain(Grain._id)}}><i className="bi bi-trash"></i>&nbsp;Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </> );
}

export default ListedGrainsCards;