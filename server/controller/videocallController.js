import { v4 as uuidV4 } from 'uuid';
export const  newRoomController= async (request,response)=>{
     console.log("request",request.params);
    try {
     response.status(200).json({room_id:uuidV4()})
    } catch (error) {
     
    }
}
