import { useState } from "react";
import "./Digitalsignature.css";
import SignatureCanvas from "react-signature-canvas";

function Digitalsignature() {
  const [sing, setSign] = useState();
  const [URL,setUrl]=useState('')

  const handleClear = () => {
    sing.clear();
    setUrl("")
  };

  const handelGenerate = () => {
    const dataUrl = sing.getTrimmedCanvas().toDataURL("image/png");
    // Now you can use the 'dataUrl' as needed, for example, save it or display it.
    console.log(setUrl);
    setUrl(dataUrl)
  };

  return (
    <>
      <div className="container">
        <div className="row m-0 p-0" >
        <div className="col-6 bg-white" >
            <SignatureCanvas
            penColor='green'
            canvasProps={{ width: 500, height: 200, className: "sigCanvas  w-100 bg-icon" }}
            ref={(data) => setSign(data)}
            />
        </div>
        <div className="col-6 bg-white m-0 bg-icon" >
              <img className="w-50" src={URL} alt="SIGNATURE"/> 
        </div>
        <div className="col-6 m-0" >
        <button className="btn btn-success w-100"  type="button" onClick={handelGenerate}>
          Generate
        </button>
        </div>

        <div className="col-6 p-0" >
        <button className="btn btn-danger w-100" type="button" onClick={handleClear}>
          Clear
        </button>
         </div>


       
        
        </div>

       
      </div>
    </>
  );
}

export default Digitalsignature;
