import { format } from "timeago.js";
function RecivedMessage(props) {
  const { image, message, sendTime } = props;
  return (
    <>
      <li className="d-flex justify-content-start mb-4 w-100  message-recive ">
        <img
          src={image ? "http://localhost:3000/" + image : ""}
          alt="avatar"
          className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
          width="30px"
          height="30px"
        />
        <div className="card p-0" style={{maxWidth:"50%"}}>
          <div className="card-body p-2 ps-3 ">
            <h4 className="mb-0 fs-5 midgreen" style={{fontFamily:"monospace"}}>{message}</h4>

            <p className=" text-muted text-end m-0" style={{fontSize:'12px',fontFamily:"monospace"}} ><i class="bi bi-clock-history"></i>&nbsp;{format(sendTime)}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default RecivedMessage;
