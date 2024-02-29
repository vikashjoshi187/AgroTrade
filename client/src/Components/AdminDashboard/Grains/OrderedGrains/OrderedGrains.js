import { useEffect, useState } from "react";
import { ADMIN_REQUESTED_URL } from "../../../../urls";
import SeeAllD from "./SeeAllD";
import axios from "axios";

function OrderedGrains() {
    const [grainOrderData, setGrainOderData] = useState([])
    const getData = () => {
        try {
            axios.get(ADMIN_REQUESTED_URL + "/adminViewsGrainOrder").then((userDatas) => {
                console.log("userDatas", userDatas.data.populatedOrders);
                setGrainOderData(userDatas.data.populatedOrders)
            })
                .catch(err => console.log('error ', err));
        } catch (err) {
            console.log("Eroor in get uer data", err);
        }
    }

    useEffect(() => {
        getData();
        console.log("grainData", grainOrderData);
    }, []);
    return (<>
        <div className="mt-3 p-2" >
            <h1 className=" text-start ps-3 darkgreen fw-bold"><i class="fa-solid fa-wheat-awn"></i>&nbsp;Ordered Grains</h1>
            <div className="container-fluid  table-responsive pb-3 ">
                <div class="card table-card p-0">
                    <div class="card-body p-3">
                        <div class="table-responsive">
                            <table class="table table-success  mb-0">

                                <thead>
                                    <tr>
                                        <th className="fs-6 p-0 text-center">S. No</th>
                                        <th className="fs-6 p-0 text-center">Name </th>
                                        <th className="fs-6 p-0 text-center">Delivery Days</th>
                                        <th className="fs-6 p-0 text-center">Shipping Address</th>
                                        <th className="fs-6 p-0 text-center">Total Price</th>
                                        <th className="fs-6 p-0 text-center">See Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        grainOrderData.length === 0 ? (
                                            <tr>
                                                <td colSpan="13" className="text-center">No data available</td>
                                            </tr>
                                        ) : (
                                            grainOrderData.map((grain, index) => (
                                                <tr key={index}>
                                                    <td className="fs-6 text-center">{index + 1}</td>
                                                    <td className="fs-6 text-center">{grain.cart_id.userId.name}</td>
                                                    <td className="fs-6 text-center">{grain.delivery_days}</td>
                                                    <td className="fs-6 text-center">{grain.shipping_address}</td>
                                                    <td className="fs-6 text-center">{grain.total_pay}</td>
                                                    <td className="fs-6 text-center"><SeeAllD products={grain.cart_id.products}/></td>

                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default OrderedGrains;