import { useEffect, useState } from "react";
import jscookie from "js-cookie"
import axios from "axios"; 

import { REQUESTED_URL, USER_REQUESTED_URL } from "../../../urls";
function ChatListitem(props) {
   var reciverEmail;
   const currentUserEmail=jscookie.get("userEmail")
   const token=jscookie.get("token")
   var [reciverObj,setReciverObj]=useState({})
   const {chat,openChat,index} = props;

   if(chat.members[0]!== currentUserEmail){
    reciverEmail=chat.members[0]
   }
   else{
    reciverEmail=chat.members[1]
   }

  //  console.log(chat);

  useEffect(()=>{

    async function getUserData(){
      // console.log(token);
      var obj=await axios.post(USER_REQUESTED_URL+`/getUser`,{email:reciverEmail,token});
      setReciverObj(obj.data[0])
    }

    getUserData()
   

  },[])



  
    return ( <>
    <div className="card p-0" onClick={()=>{openChat(chat,index,reciverObj)}}>
                <div className="card-body bg-light m-0 pb-0 p-1 ps-2 pe-2 pt-2">
                  <ul className="list-unstyled m-0">
                    <li className="">
                      <a href="#!" className="d-flex justify-content-between text-decoration-none">
                        <div className="d-flex flex-row p-1">
                          <img src={"http://localhost:3000/"+reciverObj.image} alt="avatar"className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"width="60" height="60"/>
                          <div>
                            <h4 className="darkgreen" >{reciverObj.name}</h4>
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