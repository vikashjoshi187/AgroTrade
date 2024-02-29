import chawal from "../../assets/rice.jpeg"
function GrainCard() {
  return (<>
    <div className="col-12 col-sm-12 col-md-6  d-flex justify-content-center">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={chawal} className="img-fluid h-100 rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="d-flex justify-content-end" >
                <span className="badge bg-success">Organic</span>
              </div>
              <h3 className="card-title darkgreen">Tuur Daal</h3>
              <p className="card-text darkgreen">
                Type: Basmati <br />
                Price: Rs. 14,500/quintal  <br />
                Quality: Good <br />
                Shelf Life: 1 Year <br />
                Moisture Level: 30%
              </p>
              <p className="card-text darkgreen"><small className="text-muted"><i className="bi bi-geo-alt text-danger"></i>&nbsp;Indore</small></p>
              <div className="d-grid gap-2">
                <button type="bu tton" name="" id="" className="btn btn-success btn-sm">Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




  </>);
}

export default GrainCard;