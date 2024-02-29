function ChatListitem(props) {
  
    return ( <>
    <div className="card p-0">
                <div className="card-body bg-light m-0 pb-0 p-1 ps-2 pe-2 pt-2">
                  <ul className="list-unstyled m-0">
                    <li className="">
                      <a href="#!" className="d-flex justify-content-between text-decoration-none">
                        <div className="d-flex flex-row p-1">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"width="60"/>
                          <div>
                            <h4 className="darkgreen" >Jackson Jack</h4>
                            <p className="small midgreen">
                              Hello
                            </p>
                          </div>
                        </div>
                        <div className="" >
                          <span className="text-muted float-end m-1">
                            <i className="fas fa-check text-success" aria-hidden="true"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                </ul>
                </div>
            </div>
    </> );
}

export default ChatListitem;