import {format} from "timeago.js"
function Sentmessage(props) {

  const {message,sendTime}=props
    return ( <>

<li className="d-flex justify-content-end mb-4 w-100 float-end message-recive">
                <div className="card bg-midgreen p-0" style={{maxWidth:"50%"}}>  
                    <div className="card-body p-2 ">
                      <h3 className="mb-0 fs-5  text-light"  style={{fontFamily:"monospace"}}>
                       {message}
                      </h3>
                      <p className=" small mb-0  float-end text-light" style={{fontSize:'12px',fontFamily:"monospace"}}>
                      <i class="bi bi-clock-history"></i>&nbsp;{format(sendTime)}
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="30px"
                    height="30px"
                  />
                </li>
    
    
    </> );
}

export default Sentmessage;