import "./LandsSection.css";
import land from "../../assets/randy-fath-dDc0vuVH_LU-unsplash.jpg";
import Carousel from "react-bootstrap/Carousel";
import LandCard from "../LandCard/LandCard";
function LandsSection() {
  return (
    <>
      <div className="container-fluid bg-white  d-flex justify-content-center pt-4">
        <div className="row m-0" id="lands-row">
          <h1 className="darkgreen wght-600 text-center">Lands</h1>
          <Carousel fade className="mb-5">
            <Carousel.Item>
              <div className=" w-100   d-flex justify-content-center">
                <div className="card-div   d-flex  justify-content-center">
                  <div className="card mb-4 w-100">
                    <div className="row g-0">
                      <div className="col-md-4 bg-dark">
                        <img
                          src={land}
                          className="img-fluid rounded-start h-100"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-5">
                        <div className="card-body">
                          <div>
                            <h2 className="card-title darkgreen ">
                              Alluvial Soil Land{" "}
                            </h2>
                            <h5 className="darkgreen">
                              {" "}
                              <span className="text-danger">
                                <i className="bi bi-geo-alt text-danger"></i>
                                &nbsp;Indore{" "}
                              </span>
                              &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              <span className="text-primary">
                                <i className="bi bi-rulers"></i>&nbsp;Size :
                                2.49 acres
                              </span>{" "}
                            </h5>
                            <h5 className="darkgreen">
                              Suitable For: Wheat,Moong Daal, Tuur Daal{" "}
                            </h5>
                            <p className="card-text text-break darkgreen landpara mt-4 ">
                              Discover an exceptional land rental opportunity in
                              the heart of Indore, perfect for factory owners
                              seeking expansion or diversification into
                              agricultural ventures. This expansive 2.49-acre
                              parcel of fertile land is now available, offering
                              a strategic location for those looking to
                              integrate farming into their industrial
                              operations.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row m-0 w-100 d-flex flex-column">
                          <div className="col-12 d-flex justify-content-end pt-3 pe-3">
                            <span className="badge bg-warning text-dark ">
                              Available
                            </span>{" "}
                          </div>
                          <div className="col-12  midgreen">
                            <h5 className="mt-3">
                              Rent: 10,000/Month
                              <br />
                              For: Farming
                            </h5>

                            <h5 className="darkgreen ">
                              <br />
                              Available From: 28/12/2023
                              <br />
                              Available To: 29/12/2024
                            </h5>
                            <div className="d-grid gap-2 mb-2 ">
                              <button
                                type="button"
                                name=""
                                id=""
                                className="btn btn-success"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <LandCard />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default LandsSection;
