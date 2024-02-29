import { useState } from "react";
import "./Digitalsignature.css";
import SignatureCanvas from "react-signature-canvas";

function Digitalsignature(props) {
  const {getSignature,clearSignature,accepterName} =props
  const [sing, setSign] = useState();
  const [URL,setUrl]=useState('')

  const handleClear = () => {
    sing.clear();
    setUrl("")
    clearSignature()
  };

  const handelGenerate = () => {
    const dataUrl = sing.getTrimmedCanvas().toDataURL("image/png");
    console.log(setUrl);
    setUrl(dataUrl)
    if (dataUrl!="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NgAAIAAAUAAR4f7BQAAAAASUVORK5CYII=") {
      getSignature(dataUrl)
    }
    else{
      alert("Please Sign First")
    }
  };

  return (
    <>
      <div className="container">
        <div className="row m-0 p-0" >
        <div className="col-12bg-white" >
            <SignatureCanvas
            penColor='red'
            canvasProps={{ width: 500, height: 200, className: "sigCanvas  w-100 bg-icon" }}
            ref={(data) => setSign(data)}
            />
            <h5 className="text-center darkgreen" >{accepterName}</h5>
        <button className="btn btn-sm  btn-success w-50"  type="button" onClick={handelGenerate}>Done</button>
        <button className="btn btn-sm btn-danger w-50" type="button" onClick={handleClear}>Clear Signature</button>
    
        </div>
     </div>

       
      </div>
    </>
  );
}

export default Digitalsignature;
