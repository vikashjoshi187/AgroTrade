var count=0;
const sockets=(socket)=>{
    // console.log( ++count,"user connected")
socket.on("message-sent-client",({msg,roomId})=>{
    console.log("message sent client handler in server");
    let skt=socket.broadcast;
    skt=roomId?skt.to(roomId):skt;
    skt.emit("message-sent-server",msg);

});

}
export default sockets;