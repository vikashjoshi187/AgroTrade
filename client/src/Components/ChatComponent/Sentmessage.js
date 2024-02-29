function Sentmessage(props) {
    return ( <>

<li className="d-flex justify-content-end mb-4 w-75 float-end message-recive">
                <div className="card bg-midgreen">  
                    <div className="card-body">
                      <p className="mb-0 fs-5  text-light ">
                       {props.message}
                      </p>
                      <p className=" small mb-0 fs-6 float-end text-light">
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="60"
                  />
                </li>
    
    
    </> );
}

export default Sentmessage;