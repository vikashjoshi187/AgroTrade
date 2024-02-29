import { useEffect, useState } from "react";
import Loadinganimtion from "../../Loading Amimation/Loadinganimation.jsx";
import { getColdStContracts } from "../../../store/organizationSlice.js";
import jscookie from "js-cookie";
import ContractCdStDetailCard from "./ContractCdStDetailCard/ContractCdStDetailCard.js";

function ColdStContaract() {
    const [contracts, setContracts] = useState(["Loading..."]);
    useEffect(() => {
        const dealer_email = jscookie.get("dealer_email")
        getColdStContracts(dealer_email).then((result) => {
            setContracts(result)
        })

    }, [])


    return (<>
        {contracts[0] == "Loading..." ? <Loadinganimtion /> : contracts.length == 0 ? <>Currently no contracts</>
            :
            <>
                <div className=" w-100" >
                    <div className="row m-0 w-100" >
                        {
                            contracts.map((contract, i) => {
                                return (<>
                                    <ContractCdStDetailCard contract={contract} key={i} />
                                </>)
                            })

                        }
                    </div>
                </div>
            </>
        }

    </>);
}

export default ColdStContaract;


