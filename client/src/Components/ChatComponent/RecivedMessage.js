function RecivedMessage(props) {
    return ( <>
      <li className="d-flex justify-content-start mb-4 w-75 message-recive ">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
                  <div className="card">
                    <div className="card-body ">
                      <p className="mb-0 fs-5 darkgreen ">
                        {props.message}
                        </p>
                      <p className="text-muted small mb-0 fs-6 float-end">
                      </p>
                    </div>
                  </div>
                </li>
    </> );
}

export default RecivedMessage;