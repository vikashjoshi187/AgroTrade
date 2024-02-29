import "./Statistics.css"
function Statistics() {
  return (<>
    <div className="container-fluid d-flex justify-content-center  p-5 bg-white">
      <div className="row m-0 " id="statsRow" >
        <div className=" col-12 col-sm-6 col-md-3 mb-2  ">
          <div className="h-100  statBox p-3" >
            <h1 className="text-center statIcon darkgreen"><i className="fa-solid fa-person"></i></h1>
            <h3 className="text-center" >10,000+ <br /> Farmers</h3>
          </div>
        </div>

        <div className=" col-12 col-sm-6 col-md-3 mb-2">
          <div className="h-100  statBox p-3" >
            <h1 className="text-center statIcon darkgreen"><i className="fa-solid fa-person"></i></h1>
            <h3 className="text-center" >5,500+ <br /> Registered Frams</h3>
          </div>
        </div>

        <div className=" col-12 col-sm-6 col-md-3 mb-2">
          <div className="h-100  statBox p-3" >
            <h1 className="text-center statIcon darkgreen"><i className="fa-solid fa-warehouse"></i></h1>
            <h3 className="text-center" >380+ <br /> Cold Storage</h3>
          </div>
        </div>
        <div className=" col-12 col-sm-6 col-md-3 mb-2">
          <div className="h-100  statBox p-3" >
            <h1 className="text-center statIcon darkgreen"><i className="fa-solid fa-tractor"></i></h1>
            <h3 className="text-center" >55,000+ <br />Equipments</h3>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Statistics;