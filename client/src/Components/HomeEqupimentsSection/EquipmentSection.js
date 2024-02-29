import "./EquipmentsSection.css"
import tractor from "../../assets/john-deere-wallpaper-19-642x462 (1).jpg"
import GrainCards from "../GrainCards/GrainCards";
import EquipmentCard from "../EquipmentCard/EquipmentCard";
function EquipmentsSection() {
  return (<>
    <div className="container-fluid   d-flex justify-content-center pt-4"  >
      <div className="row m-0" id="grains-row" >
        <h1 className="darkgreen wght-600 text-center">Equipments</h1>
        <div className="col-12 col-sm-12 col-md-6  d-flex justify-content-center">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={tractor} className="img-fluid h-100 rounded-start" alt="..." />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <div className="d-flex justify-content-end" >
                    <span className="badge bg-warning text-black mb-3">Available</span>
                  </div>
                  <h3 className="card-title darkgreen">Jhon Deere Tractor</h3>
                  <p className="card-text darkgreen ">
                    Type: Vehicle <br />
                    Price: Rs. 1500/hour  <br />
                    Quality: 50575(75HP,4WD) <br />
                  </p>
                  <p className="darkgreen text-danger "><small ><i className="bi bi-geo-alt"></i>&nbsp;Indore</small></p>
                  <div className="d-grid gap-2">
                    <button type="button" name="" id="" className="btn btn-success btn-sm">Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-6  d-flex justify-content-center">
          <EquipmentCard />
        </div>
      </div>

    </div>
  </>);
}

export default EquipmentsSection;