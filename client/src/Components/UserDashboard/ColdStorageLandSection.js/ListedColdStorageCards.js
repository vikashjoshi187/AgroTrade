import "./ColdStorageLandCard.css"
import UpdateColdStModal from "./UpdateColdSt.js";
import View from "./View.js";
import { deleteColdStId } from "../../../store/userSlice";
import Swal from "sweetalert2";
function ListedColdStorageCards(props) {
  const { ColdSt, getcoldSts } = props;
  const deleteColdSt = (coldStId) => {
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

        deleteColdStId({ coldStId }).then((data) => {
          if (data.message === "success") {
            Swal.fire({
              position: "middle",
              icon: "success",
              title: "Delete Successfully",
              showConfirmButton: false,
              timer: 2000
            });
            getcoldSts();
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Unavailable to Delete Cold Strorage Land. Please try Again...",
            });
          }
        }).catch((err) => {
          console.log("err", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Unavailable to Delete Cold Strorage Land. Please try Again...",
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
  var fromDate = new Date(ColdSt.avilableFrom)
  const dateFrom = fromDate.getDate() + "/" + fromDate.getMonth() + 1 + "/" + fromDate.getFullYear();

  var fromTill = new Date(ColdSt.avilableTill)
  const dateTill = fromTill.getDate() + "/" + fromTill.getMonth() + 1 + "/" + fromTill.getFullYear();

  return (<>
    <div className="card mb-4 w-100 p-0">
      <div className="row g-0">
        <div className="col-md-4 bg-dark" id="imgeDiv">
          <img src={"http://localhost:3000/" + ColdSt.image} className="img-fluid rounded-start w-100 card-image" alt={ColdSt.image} />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <div className="p-1" >
              <div className="d-flex justify-content-between" >
                <h3 className="card-title darkgreen ">{ColdSt.landTitle}</h3> <div>
                </div>
              </div>
              <h5 className="darkgreen">
                <span className="text-danger">
                  <i className="bi bi-geo-alt text-danger"></i>
                  &nbsp;{ColdSt.city + " " + ColdSt.state}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-primary">
                  <i className="bi bi-rulers"></i>&nbsp;Size :{ColdSt.area} acres
                </span>{" "}
              </h5>

              <h5 className="darkgreen">
                Condition: {ColdSt.infrastructure}
              </h5>

              <h5 className="darkgreen">
                Address: {ColdSt.address},{ColdSt.pincode}
              </h5>
              <h5 className="card-text text-break darkgreen  landparag">
                Description: {ColdSt.description}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3  p-2">
          <div className="row m-0 w-100 d-flex flex-column">
            <div className="col-12 d-flex justify-content-end pt-3 pe-3">
              {ColdSt.avilable ? <span className="badge rounded-pill bg-success text-white  fs-6 ">Available</span> : <span className="badge bg-warning rounded-pill fs-6 text-white">Booked</span>}

            </div>
            <div className="col-12  midgreen">
              <h5>
                Rent: {ColdSt.rent}/Month
              </h5>

              <h5 className="darkgreen ">
                From: {dateFrom}
              </h5>

              <h5 className="darkgreen">
                To: {dateTill}
              </h5>
              <div className="d-grid gap-2">
                <View image360={ColdSt.image360} />
                <UpdateColdStModal getcoldSts={getcoldSts} ColdSt={ColdSt} />
                <button type="bu tton" name="" id="" className="btn btn-outline-danger btn-sm" onClick={() => { deleteColdSt(ColdSt._id) }}><i className="bi bi-trash"></i>&nbsp;Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





  </>);
}

export default ListedColdStorageCards;