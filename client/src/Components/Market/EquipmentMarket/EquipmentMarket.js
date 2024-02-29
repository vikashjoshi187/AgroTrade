import React, { useEffect, useState } from "react";
// import './EqpMarket.css';
import "../../UserDashboard/ListedEquimentsSection/ListedEquipmentCard.css";
import jscookie from "js-cookie";
import { EquipmentMarket, addTocartEqp } from "../../../store/marketSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./EquipmentMarket.css"

export function EquipmentMarketCard({ equips }) {
  const token = jscookie.get("token");
  const email = jscookie.get("userEmail");

  const [equipments, setEquipment] = useState([]);

  const dispatch = useDispatch();

  const getEquipment = async (token) => {
    const equip = await dispatch(EquipmentMarket(token));
    console.log("equipment in component", equip.payload);
    setEquipment(equip.payload);
  };
  useEffect(() => {
    const token = jscookie.get("token");
    if (equips) {
      setEquipment([equips]);
    } else {
      getEquipment(token);
    }
  }, [equips]);

  const addTocartsEqp = async (_id) => {
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "please login first",
        html: "",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const addResponse = await dispatch(addTocartEqp({ token, email, _id }));
      console.log("addResponse", addResponse);
      if (addResponse.payload.msg === "Equipment added successfully") {
        Swal.fire({
          position: "center",
          icon: "",
          title: "Added to Cart",
          html: "<i class='fs-1 text-info bi bi-cart-fill'></i>",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "",
          title: "there is an error please try again",
          html: "<i class='fs-1 text-info bi bi-cart-fill'></i>",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <>
      {" "}
      {!equips ? (
        <h1 className="text-center text-success mb-3">Equipments</h1>
      ) : (
        ""
      )}
      {equipments || equips ? (
        equipments.map((equipment) => {
          return (
            <div
              key={equipment._id} className="col-12 col-sm-12 col-md-6  p-1  d-flex justify-content-center d-inline-flex">
            
              <div className="card bg-light  w-100 p-0" style={{ borderRadius: "5px" }}  >
                <div className="row ">
                  <div  className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 p-0 " id="imgeDiv">
                    <img
                      src={"http://localhost:3000/" + equipment.image}
                      className="img-fluid  rounded-start w-100 landingpage-eqiupment-card-image"
                      alt={equipment.image}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-12 col-lg-12 col-xl-6 ">
                    <div className="card-body">
                      <div className="d-flex justify-content-between m-0">
                        <h4 className="card-title darkgreen">
                          {" "}
                          {equipment.name}
                        </h4>
                        <span className="badge bg-warning text-black  fs-6 m-0 ">
                          Available
                        </span>
                      </div>
                      <p className="card-text darkgreen fs-5 m-0">
                        <i className="bi bi-geo-alt text-danger"></i>&nbsp;
                        {equipment.city},{equipment.state}
                      </p>
                      <p className="card-text darkgreen fs-5 m-0 ">
                        ModelNo: {equipment.modelnumber}
                      </p>
                      <p className="card-text darkgreen fs-5 m-0 ">
                        Type: {equipment.equipmenttype}
                      </p>
                      <p className="card-text darkgreen fs-5 m-0 ">
                        Price: Rs. {equipment.price}/days
                      </p>
                      <p className="card-text darkgreen fs-5 m-0 ">
                        Condition: {equipment.condition}
                      </p>
                      <p className="card-text darkgreen fs-5 m-0 ">
                        Quantity: {equipment.quantity}
                      </p>
                      <p className="card-text darkgreen  fs-5 m-0 ">
                        Address: {equipment.address}
                      </p>
                      <p
                        className="card-text darkgreen fs-5 m-0"
                        style={{ maxHeight: "40px", overflow: "scroll" }}
                      >
                        Description: {equipment.description}
                      </p>
                  
                      {equips ? (
                        <button className="btn btn-success mt-1 w-100 mx-auto">
                          <Link
                            to="/market/equipmentMarket"
                            className="text-white text-decoration-none"
                          >
                            More
                          </Link>
                        </button>
                      ) : (
                        <button
                          className="btn btn-success mt-1 w-50 mx-auto"
                          onClick={() => {
                            addTocartsEqp(equipment._id);
                          }}
                        >
                          <Link className="text-white text-decoration-none">
                            Add to Cart
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-center">There is no Equipment available</h1>
      )}
    </>
  );
}
