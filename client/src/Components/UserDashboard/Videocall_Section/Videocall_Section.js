// import "./Videocall_Section.css"
// import { io } from "socket.io-client";
// import { useEffect,useRef } from "react";
// import jscookie from "js-cookie"
// import axios from "axios";
// import { VIDEO_CALL_REQUESTED_URL } from "../../../urls";
// import { useState } from "react";
// import Peer from 'peerjs';
// import Meeting_Link_Toast from "./Toast";
// import audio from "../../../audio/google_meet.mp3"
// var RoomId;
// function Videocall_Section() {
//     const socket = useRef();
//     const [show, setShow] = useState(false),  [link, setLink] = useState(""),[DISPLAY,setDISPLAY]=useState("d-none"),roomid=useRef(), [hidecontent,setHideContent]=useState("")
//     const  [myPeerId,setmyPeerId]=useState(""); 
//     var  myPeer , myVideo,userStream;
//     const peers = {}
//     var caller=false;
 


// function createMeeting() {
//     hideContent()
    
//     socket.current = io("http://localhost:8800/video-call");
//     socket.current.on("get-users", (users) => {
//        console.log("This are the actice users",users);
//     });
//     const UUID=axios.get(VIDEO_CALL_REQUESTED_URL).then((data)=>{
//         console.log("This is UUID",data.data.room_id);
//         RoomId=data.data.room_id;
//         setLink(RoomId)
//         setShow(true)
//     })  



//     try {
//            var AUDIO =document.getElementById("AUDIO")
//            AUDIO.play();
//            setDISPLAY("")
//         } catch (error) {
//             console.error('Error playing audio:', error);
//         }


//         myPeer = new Peer(undefined, {
//             host: '/',
//             port: '3002'
//         })
      

//         myPeer.on("open", id=>{
//             console.log("Hello new meeting created",id);

//             setmyPeerId(id)
//             socket.current.emit("join_room",id,RoomId);
//         })

//           myVideo = document.createElement('video')
//           myVideo.width="600"
//           myVideo.height="600"
//           myVideo.muted = true;
//           navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: false
//           }).then(stream => {
//              userStream=stream;
//             addVideoStream("videoGrid",myVideo, stream)
           
//              socket.current.on('user-connected', userId => {
//                console.log("this is the new user on side create mmeting user-connected "+userId)
//                caller=true;
//                connectToNewUser(userId, stream)
//             })

//             myPeer.on('call', call => {
//               call.answer(stream)
//               const video = document.createElement('video')
              
//               video.width="600"
//               video.height="600"

//               call.on('stream', userVideoStream => {
//                 console.log("Conec tion to new user");
//                 addVideoStream("Reciver-Box",video, userVideoStream)
//               })
              
//             })
           
//           })
             
//         socket.current.on('user-disconnected', userId => {
//             console.log("User Disconnected"+userId)
//             if (peers[userId]){
//                 console.warn("in side id "+110);
//                peers[userId].close()
//             }
//         })
// }










// function joinRoom() {
 
//     socket.current = io("http://localhost:8800/video-call");
//     socket.current.on("get-users", (users) => {
//        console.log("This are the actice users",users);
//     });

   
//     if(roomid.current.value){

//         try {
//             var AUDIO =document.getElementById("AUDIO")
//             AUDIO.play();
//          } catch (error) {
//              console.error('Error playing audio:', error);
//          }


//          myPeer = new Peer(undefined, {
//             host: '/',
//             port: '3002'
//           })
         

//           myPeer.on("open", id=>{

//             socket.current.emit("join_room",id,roomid.current.value);
//             setmyPeerId(id)

//           })

//           socket.current.on('user-disconnected', newUserId => {
//             alert(" hi this is user User Disconnected"+newUserId)
//             console.warn("User Disconnected",newUserId);
//             if (peers[newUserId]) {
//                 peers[newUserId].close()
//             }
//             document.getElementById("receiverVideo").remove()
                
//           })
         

//           myPeer.on('error', (error) => {
//             console.error('Peer error:', error);
//           });

    
//           const myVideo = document.createElement('video')
//           myVideo.width="600"
//           myVideo.height="600"
//           myVideo.muted = true;
//           navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true
//           }).then(stream => {

//             addVideoStream("videoGrid",myVideo, stream)
//             socket.current.on('user-connected', userId => {
//             caller=false;
//             connectToNewUser(userId, stream)
//             })

//             myPeer.on('call', call => {
//               call.answer(stream)
//             const   video = document.createElement('video')
              
//               video.width="600"
//               video.height="600"

//               call.on('stream', userVideoStream => {
//                 console.log("Conec tion to new user");
//                 addVideoStream("Reciver-Box",video, userVideoStream)
//               })
              
//             })
           
//           })
//           hideContent()
          
//     }
//     else{
//         alert("Please Enter Room ID")
//     }
// }








// function connectToNewUser(userId, stream) {
//     const call = myPeer.call(userId, stream)
//     const  video = document.createElement('video')

//     if(caller){
//         alert("New User Conneted")
//         video.id= "receiverVideo";
//         call.on('stream', userVideoStream => {
//           addVideoStream("Reciver-Box",video,userVideoStream)
//         })
//         call.on('close', () => {
//           video.remove()
//         })
//         console.log("this is new user is inside connectToNewUser "+userId)
//         peers[userId] = call
//     }
//     else{
//         alert("Connecting")
//         video.id= "receiverVideo";
//         call.on('stream', userVideoStream => {
//           addVideoStream("Reciver-Box",video,userVideoStream)
//         })
//         call.on('close', () => {
//           video.remove()
//         })
//         console.log("this is new user is inside connectToNewUser "+userId)
//         peers[userId] = call
//     }


//   }

// function addVideoStream(boxId,video, stream) {
//         video.srcObject = stream
//         video.addEventListener('loadedmetadata', () => {
//           video.play()
//         })
//       var   boxIds = document.getElementById('video-grid')
//         boxIds.style.borderRadius="20px"
//         boxIds.append(video)

// }

// function hideContent(){
//     setHideContent("d-none")
//     document.getElementById("controls").classList.remove("d-none");
// }

// function leaveCall(params) {
//     console.log("this is mye peer id",myPeerId);
//     // peers[myPeerId].close()
//     //   document.getElementById("receiverVideo").remove()
//     socket.current.emit("leaveCall",myPeerId);
    
// }

// function muteStream() {
//     const audioTracks = userStream.getAudioTracks();
//     audioTracks.forEach(track => {
//       track.enabled = false; // Mute the track
//     });
//   }



  
//     return ( <>      
//            <div className="w-100 p-0 h-100">
//            <audio id="AUDIO" src={audio} className="d-none" controls></audio>
//             <div className={DISPLAY}>
                
//             <Meeting_Link_Toast link={link}  />
//             </div>
//             <div className="w-100 bg-darkgreen h-100">
//                 <div className="row  m-0 p-0 bg-secondary">
                  
//                      <div className="col-12  overflow-hidden "  >
//                      <div  className="w-100 bg-black d-flex " id="video-grid">
//                      </div>
//                     </div>
                 

//                     <div className={`col-12 col-md-8  p-2  h-100 bg-black ${hidecontent}`}>
//                         <img src="https://i.postimg.cc/521rVkhD/image.png" className="host-img w-100 m-0"/>
//                     </div>

//                     <div className={`col-12 col-md-4 p-2 h-100 bg-black ${hidecontent}`}>
//                         <img src="https://i.postimg.cc/521rVkhD/image.png" className="host-img w-100 m-0"/>
//                     </div>

                   
                        
                 

//                     <div className={`col-6 d-flex justify-content-between ${hidecontent}`}>
//                     <button className="btn btn-primary" onClick={createMeeting} type="button">Create meeting</button>
//                     <div class="btn-group" role="group" aria-label="Basic example">
//                        <input className="form-control" ref={roomid} type="text" name="" placeholder="Enter room id"/>
//                        <button type="button" class="btn btn-primary" onClick={joinRoom}>Join</button>
//                      </div>
//                     </div>
//                     <div className="col-12 d-none" id="controls">
//                     <div className="contarols p-0 m-0" >
//                             <img src="https://i.postimg.cc/3NVtVtgf/chat.png"/>
//                             <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png"/>
//                             <img onClick={leaveCall} src="https://i.postimg.cc/fyJH8G00/call.png" className="call-icon"/>
//                             <img onClick={muteStream} src="https://i.postimg.cc/bJFgSmFY/mic.png"/>
//                             <img src="https://i.postimg.cc/Y2sDvCJN/cast.png"/>
//                         </div>
//                     </div>
                   
//                 </div>
//             </div>
//         </div>
//     </> );
// }

// export default Videocall_Section;


import "./Videocall_Section.css"
import { io } from "socket.io-client";
import { useEffect,useRef } from "react";
import jscookie from "js-cookie"
import axios from "axios";
import { VIDEO_CALL_REQUESTED_URL } from "../../../urls";
import { useState } from "react";
import Peer from 'peerjs';
import Meeting_Link_Toast from "./Toast";
import audio from "../../../audio/google_meet.mp3"
var RoomId;
function Videocall_Section() {
    const socket = useRef();
    const [show, setShow] = useState(false),  [link, setLink] = useState(""),[DISPLAY,setDISPLAY]=useState("d-none"),roomid=useRef(), [hidecontent,setHideContent]=useState("")
    const  [myPeerId,setmyPeerId]=useState(""); 
    const [reciverMuted,setReciverMuted]=useState(true)
    var  myPeer , myVideo,userStream;
    const peers = {}
    var caller=false;
 


function createMeeting() {
    hideContent()
    
    socket.current = io("http://localhost:8800/video-call");
    socket.current.on("get-users", (users) => {
       console.log("This are the actice users",users);
    });
    const UUID=axios.get(VIDEO_CALL_REQUESTED_URL).then((data)=>{
        console.log("This is UUID",data.data.room_id);
        RoomId=data.data.room_id;
        setLink(RoomId)
        setShow(true)
    })  



    try {
           var AUDIO =document.getElementById("AUDIO")
           AUDIO.play();
           setDISPLAY("")
        } catch (error) {
            console.error('Error playing audio:', error);
        }

        myPeer = new Peer(undefined, {
            host: '/',
            port: '3002'
        })
      

        myPeer.on("open", id=>{
            setmyPeerId(id)
            socket.current.emit("join_room",id,RoomId);
        })


        socket.current.on("mute-Reciver",()=>{
            if (document.getElementById("reciverVideo").muted) {
                console.log("inside true");
                document.getElementById("reciverVideo").muted=false;
                // setReciverMuted(false)
            }
            else{
                console.log("inside false");
                document.getElementById("reciverVideo").muted=true;
                // setReciverMuted(true)
            }
        })

          myVideo = document.createElement('video')
          myVideo.id="myVideo"
          myVideo.width="600"
          myVideo.height="600"
          myVideo.muted = true;
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {
             userStream=stream;
            addVideoStream("videoGrid",myVideo, stream)
           
             socket.current.on('user-connected', userId => {
               console.log("this is the new user on side create mmeting user-connected "+userId)
               caller=true;
               connectToNewUser(userId, stream)
            })

            myPeer.on('call', call => {
              call.answer(stream)
              const video = document.createElement('video')
              
              video.width="600"
              video.height="600"

              call.on('stream', userVideoStream => {
                console.log("Conec tion to new user");
                addVideoStream("Reciver-Box",video, userVideoStream)
              })
              
            })
           
          })
             
        socket.current.on('user-disconnected', userId => {
            console.log("User Disconnected"+userId)
            if (peers[userId]){
                console.warn("in side id "+110);
               peers[userId].close()
            }
        })
}










function joinRoom() {
    socket.current = io("http://localhost:8800/video-call");
    socket.current.on("get-users", (users) => {
       console.log("This are the actice users",users);
    });
   
    if(roomid.current.value){
        console.log("this is the room id ",roomid.current.value);
        setLink(roomid.current.value)

        try {
            var AUDIO =document.getElementById("AUDIO")
            AUDIO.play();
         } catch (error) {
             console.error('Error playing audio:', error);
         }


         myPeer = new Peer(undefined, {
            host: '/',
            port: '3002'
          })
         

          myPeer.on("open", id=>{
            socket.current.emit("join_room",id,roomid.current.value);
            setmyPeerId(id)
          })

          socket.current.on("mute-Reciver",()=>{
            if (document.getElementById("reciverVideo").muted) {
                console.log("Inside true");
               document.getElementById("reciverVideo").muted=false;
            //    setReciverMuted(false)
            }
            else{
                console.log("Inside false");
                document.getElementById("reciverVideo").muted=true;
                // setReciverMuted(true)
            }
          })

          socket.current.on('user-disconnected', newUserId => {
            alert(" hi this is user User Disconnected"+newUserId)
            console.warn("User Disconnected",newUserId);
            if (peers[newUserId]) {
                peers[newUserId].close()
            }
            document.getElementById("receiverVideo").remove()
                
          })
         

          myPeer.on('error', (error) => {
            console.error('Peer error:', error);
          });

    
          const myVideo = document.createElement('video')
          myVideo.id="myVideo"
          myVideo.width="600"
          myVideo.height="600"
          myVideo.muted = true;
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {

            addVideoStream("videoGrid",myVideo, stream)
            socket.current.on('user-connected', userId => {
            caller=false
            connectToNewUser(userId, stream)
            })

            myPeer.on('call', call => {
              call.answer(stream)
               const   video = document.createElement('video')
               video.id="reciverVideo"
              video.width="600"
              video.height="600"

              call.on('stream', userVideoStream => {
                console.log("Conec tion to new user");
                addVideoStream("Reciver-Box",video, userVideoStream)
              })
              
            })
           
          })
          hideContent()
          
    }
    else{
        alert("Please Enter Room ID")
    }
}








function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const  video = document.createElement('video')
    video.id="reciverVideo"

    if(caller){
        alert("New User Conneted")
        call.on('stream', userVideoStream => {
          addVideoStream("Reciver-Box",video,userVideoStream)
        })
        call.on('close', () => {
          video.remove()
        })
        console.log("this is new user is inside connectToNewUser "+userId)
        peers[userId] = call
    }
    else{
        alert("Connecting")
        call.on('stream', userVideoStream => {
          addVideoStream("Reciver-Box",video,userVideoStream)
        })
        call.on('close', () => {
          video.remove()
        })
        console.log("this is new user is inside connectToNewUser "+userId)
        peers[userId] = call
    }


  }

function addVideoStream(boxId,video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      var   boxIds = document.getElementById('video-grid')
        boxIds.style.borderRadius="20px"
        boxIds.append(video)

}

function hideContent(){
    setHideContent("d-none")
    document.getElementById("controls").classList.remove("d-none");
}

function leaveCall(params) {
    console.log("this is mye peer id",myPeerId);
    // peers[myPeerId].close()
    //   document.getElementById("receiverVideo").remove()
    // socket.current.emit("leaveCall",myPeerId);
    
}

function muteStream() {
    socket.current.emit("mute-me",myPeerId,link); 
    console.log("RooomId",link);
}



  
    return ( <>      
           <div className="w-100 p-0 h-100">
           <audio id="AUDIO" src={audio} className="d-none" controls></audio>
            <div className={DISPLAY}>
                
            <Meeting_Link_Toast link={link}  />
            </div>
            <div className="w-100 bg-darkgreen h-100">
                <div className="row  m-0 p-0 bg-secondary">
                  
                     <div className="col-12  overflow-hidden "  >
                     <div  className="w-100 bg-black d-flex " id="video-grid">
                     </div>
                    </div>
                 

                    <div className={`col-12 col-md-8  p-2  h-100 bg-black ${hidecontent}`}>
                        <img src="https://i.postimg.cc/521rVkhD/image.png" className="host-img w-100 m-0"/>
                    </div>

                    <div className={`col-12 col-md-4 p-2 h-100 bg-black ${hidecontent}`}>
                        <img src="https://i.postimg.cc/521rVkhD/image.png" className="host-img w-100 m-0"/>
                    </div>

                   
                        
                 

                    <div className={`col-6 d-flex justify-content-between ${hidecontent}`}>
                    <button className="btn btn-primary" onClick={createMeeting} type="button">Create meeting</button>
                    <div class="btn-group" role="group" aria-label="Basic example">
                       <input className="form-control" ref={roomid} type="text" name="" placeholder="Enter room id"/>
                       <button type="button" class="btn btn-primary" onClick={joinRoom}>Join</button>
                     </div>
                    </div>
                    <div className="col-12 d-none" id="controls">
                    <div className="contarols p-0 m-0" >
                            <img src="https://i.postimg.cc/3NVtVtgf/chat.png"/>
                            <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png"/>
                            <img onClick={leaveCall} src="https://i.postimg.cc/fyJH8G00/call.png" className="call-icon"/>
                            <img onClick={muteStream} src="https://i.postimg.cc/bJFgSmFY/mic.png"/>
                            <img src="https://i.postimg.cc/Y2sDvCJN/cast.png"/>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </> );
}

export default Videocall_Section;

