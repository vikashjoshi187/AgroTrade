import RecivedMessage from "./RecivedMessage";
import Sentmessage from "./Sentmessage";
import { io } from "socket.io-client";
import {useEffect, useRef,useState} from "react";
import jscookie from "js-cookie";
import ChatFig from "../../../Images/chatGif.gif"
import { findMessages,sendMessage} from "../../../store/messageSlice";
import TypingAnimation from "./Typinganimation.js";
import "./messages.css"
import "./MessagesFE.js"
import InputEmoji from "react-input-emoji"
function MessagesSection(props) {
const {activeChat,showNotification}=props; 
const socket = useRef();
const userEmail = jscookie.get("userEmail");
const [newmessage, setMessage] = useState("");
var [allMessages, SetAllMessages] = useState([]);
const [OnlineUsers, setOnlineUsers] = useState([]);
var [reciverId,setReciverId]=useState("")
var [chatId,setChatID]=useState("")
const [typingStatus,setTypingStatus] =useState("Online")
const {Chatdetail,reciverObj} =activeChat;
const messagesDivRef = useRef();

useEffect(()=>{
    if (reciverObj) {
        reciverId=reciverObj.email;
        setReciverId(reciverId)
        console.log("this is the chats",Chatdetail);
        setChatID(Chatdetail._id)
        console.log(chatId);
    } 
},[props])

useEffect(()=>{
     findMessages(chatId).then((data)=>{
        if (data) {
            SetAllMessages([])  
            SetAllMessages(data) 
        }
     }) 
},[chatId])

useEffect(() => {
  // Scroll to the bottom of the div
  messagesDivRef.current?.scrollTo({
    top: messagesDivRef.current.scrollHeight,
    behavior: 'smooth',
  });
}, [allMessages,typingStatus]);




useEffect(() => {
    socket.current = io("http://localhost:8800/chat");
    socket.current.emit("new-user-add", userEmail);
    socket.current.on("get-users", (users) => {
      setOnlineUsers([...users]);
    //   console.log("active users", users);
    });
   socket.current.on("recive-message", (data) => {
   SetAllMessages((allMessages) => [...allMessages, data]);
   showNotification(data)
    });
  }, []);


  useEffect(()=>{
    socket.current.on("set-typing-status",(data)=>{
        setTypingStatus(data)

    })
  },[])


  useEffect(()=>{
    console.log("this is the all messages when all ",allMessages);
  },[allMessages])

  

  async function sendMessageFunction() {
    if(newmessage){
    const message = {
      reciverId: reciverId,
      text: newmessage,
      chatId: chatId,
      senderId:userEmail
    };
    sendMessage(message)
    
    socket.current.emit("send-message",message); 
    allMessages=[...allMessages,message]
    SetAllMessages([...allMessages])
    var inputField= document.getElementById("messageInput");
    setMessage("")
  }  
  }

  function setMessageFunction(newmessage) {
    setMessage(newmessage)
    console.log(reciverId);
    socket.current.emit("set-typing",{userId:reciverId,status:"Typing..."});
  }

   function SetTyping() {
    // console.log("this is the all messaage Function in setmessage function online",allMessages);
    socket.current.emit("set-typing",{userId:reciverId,status:"Online"})
  };
  function openFileExplorer() {
    document.getElementById("fileInput").click();
  }

    return ( <>
    <div className="bg-light" id="mainMessageSetionDiv" >
    {reciverObj?
    <>
    <div className=" p-1 m-0 box-shadow ps-3" id="typingStatusDiv">
              <div className="card-body m-0 pb-0 p-1 ps-2 pe-2 pt-1 ">
                <ul className="list-unstyled m-1">
                  <li className="">
                    <a
                      href="#!"
                      className="d-flex justify-content-between text-decoration-none"
                    >
                      <div className="d-flex flex-row">
                        <img
                          src={reciverObj?"http://localhost:3000/"+reciverObj.image:""}
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="50px"
                          height="50px"
                        />
                        <div className=" ms-3 ">
                          <h3 className="m-0 darkgreen">{reciverObj.name}</h3>
                          <p className="fs-6 m-0 midgreen">{typingStatus}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

    </div>
        <div className=" overflow-scroll child second " id="messagesDiv" ref={messagesDivRef} style={{height:"75vh",maxHeight:"75vh",overflowY:"scroll"}}>
            <ul className="list-unstyled p-3">
              {allMessages.map((message, i) => {
                
                if (message.senderId!==userEmail) {
        
                    return <RecivedMessage key={i} message={message.text} image={reciverObj.image?reciverObj.image:""} sendTime={message.createdAt} />;
                }
                else{
                    return  <Sentmessage key={i} message={message.text} image={reciverObj.image?reciverObj.image:""} sendTime={message.createdAt} />
                }
             
             })}

             {  typingStatus=="Typing..."?<TypingAnimation image={reciverObj.image?reciverObj.image:""} sendTime={"0000"} />:null}
             </ul>
          </div>


          <div className="p-1 child" id="inputDiv">
            <div className="w-100  row m-0">
              <div className="col-9 p-1">

                {/* jscbsd */}
                <InputEmoji
                    value={newmessage}
                    onChange={setMessageFunction}
                    onBlur={SetTyping}
                    placeholder="Type a message..."
                    id="messageInput"
                 />

              </div>
              {/* <div className="col-1 p-1">
                <button
                  type="button"
                  className="btn btn-outline-warning w-100 h-100 fs-4"
                  onClick={openFileExplorer}
                >
                  <form
                    className=""
                    id="uploadprofileimage"
                    action="/user/uploadprofileimage"
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <input
                      type="file"
                      name="profileimage"
                      style={{ display: "none" }}
                
                      accept="image/*"
                    />
                    <label
                      for="imageInput"
                      className="custom-file-input-label"
                      id="fileInputLabel"
                    >
                      <i className="bi bi-paperclip"></i>
                    </label>
                  </form>
                </button>
              </div> */}
              <div className="col-3 p-3">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 h-100"
                  onClick={sendMessageFunction}
                >
                  <i className="bi bi-send-fill"></i>&nbsp;Send
                </button>
              </div>
            </div>
          </div>
          </>: <>
         <div className="bg-danger flex-grow-1 d-flex justify-content-center  align-items-end" id="gigDiv" >  
        <h1 className="text-center mb-5 text-success " style={{fontFamily:"monospace"}}><i class="bi bi-chat-right-dots-fill"></i>&nbsp;Tap to start chat</h1>
         </div>
          </>
        }
        </div>
    </> );
}

export default MessagesSection;
