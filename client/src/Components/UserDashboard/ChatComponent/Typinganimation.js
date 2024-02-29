import trypingGif from "../../../Images/typingeffect.gif"
function TypingAnimation(props) {
  const {image}=props;
    return ( <>
      <li className="d-flex justify-content-start mb-4 w-100 message-recive ">
                  <img src={image?"http://localhost:3000/"+image:""} alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="30px" height="30px"/>
                  <div className="card p-0 m-0  " style={{overflow:"hidden",maxHeight:"70px"}} >
                    <div className="card-body p-0 m-0 bg-black ">

                        <img src={trypingGif}  style={{width:"70px",scale:"200%"}} alt=""/>

                    </div>
                  </div>
                </li>
    </> );
}

export default TypingAnimation;