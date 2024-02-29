// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/Agro-Trade-logo.png"
import "./ProfileSection.css"
import { useEffect, useReducer } from "react";
import { useOutletContext } from "react-router-dom";
import jscookie from 'js-cookie';
import { completeProfile, getDataonLoad } from "../../../store/userSlice";


function showUpdateForm (){
  if (window.screen.width>=800) {
     document.getElementById("profileCard").classList.remove("offset-lg-3")
    document.getElementById("updateProfileSection").style.display="block"
  }
  else{
    document.getElementById("profileCard").style.display="none"
    document.getElementById("updateProfileSection").style.display="block"
    document.getElementById("updateProfileSection").classList.add("offset-lg-3")
  }
}  

function Profile() {
  const {user,setStatus}=useOutletContext();
  const data=useSelector(state=>state.userSlice.userData)
  console.log("inside Profile",user);
 
  const initialsate={
    name:"",
    number:0,
    email:"",
    address:"",
    image:""
  }
  const reducer=(state,action)=>{
    // console.log("inside reducer state in profile component",state,"\n action",action)
   switch(action.action){
            case "name":
              return  {...state,name:action.value}
  
              case "number":
                
              return  {...state,number:action.value}
  
              case "email":
               return {...state,email:action.value}
              case "address":
                return   {...state,address:action.value}
                case "image":
                  return{...state,image:action.value}
                case"users":
                return {...action.value};
                default: return {...data}
  
            }  
  }
  const disp=useDispatch();
  const [fields,dispatch] =  useReducer(reducer,initialsate)
      console.log("fields",fields)

      const getUser=async(email,token)=>{
        try{
          const udata=  await disp(getDataonLoad({email,token}))
          console.log("user from onload in profile",udata.payload);
          dispatch({action:"name",value:udata.payload.name});
          dispatch({action:"number",value:udata.payload.number});
          dispatch({action:"email",value:udata.payload.email});
          dispatch({action:"address",value:udata.payload.address});
          dispatch({action:"image",value:udata.payload.image});
          return udata.payload;
        }catch(err){
          console.log("error hile fetching user",err)
        }
      }
      useEffect(()=>{
     
        const email=jscookie.get("userEmail")
        const token=jscookie.get("token")
        const usdata= getUser(email,token);
        console.log("inside profile useEffect",usdata);

       

          },[])
 
      var status=""

     async function Updateprofile(event) {
        event.preventDefault();
        // console.log("fields in update profilw",fields);
        

        document.getElementById("profileCard").classList.add("offset-lg-3")
        document.getElementById("updateProfileSection").style.display="none"
      
      
        if (window.screen.width>=800) {
          document.getElementById("profileCard").classList.add("offset-lg-3")
         document.getElementById("updateProfileSection").style.display="none"
       }
       else{
         document.getElementById("profileCard").style.display="block"
         document.getElementById("updateProfileSection").style.display="none"
         document.getElementById("updateProfileSection").classList.add("offset-lg-3")
       }

       var dataobject={...fields}
       console.log("data object ",dataobject);
       const formData=new FormData();
        for( var key in dataobject)
        {
          if(dataobject[key])
          {
            formData.append(key,dataobject[key]);
          }
        }
        // console.log("form data in update profile",formData);
        var cd= await disp(completeProfile(formData));
        // console.log("data after complete profile in component",cd);
      }

      console.log("userdata in profile............",data)
      function changeProfile(e){
        var  profilePhoto = document.getElementById("profilePhoto");
        const file = profilePhoto.files[0];
      if (file) {
          // console.log('Original file name:', file);
          // console.log('File size:', file.size, 'bytes');
          dispatch({action:"image",value:file});
        }
      }
      
      // useEffect(()=>{
      //   // window.onbeforeunload = () => { return "" };
        
      //   // // Unmount the window.onbeforeunload event
      //   // return () => { window.onbeforeunload = null };
      //   if(user.userData===null){
      //     const email=jscookie.get("email")
      //     const token=jscookie.get("token")
      //     disp(getDataonLoad({email,token}))

      //   }
      // })

      return ( <>-
    <div className="row m-0 w-100 h-100" style={{height:"auto"}}>
       <div className="col-12 col-md-6 bg-midgreen p-0 offset-lg-3" id="profileCard">
             <div className="p-5 h-75" >
           {fields.image? <img src={"http://localhost:3000/"+fields.image} className="rounded  mx-auto d-block mb-3 " style={{width:"35%",height:"30vh"}} alt=""/>

            : <img src={logo} className="rounded mx-auto d-block" style={{width:"35%"}} alt=""/>}

              <h4 className="drakgreen text-center text-white">{fields.name!==undefined?fields.name:" "}</h4>
              <h4 className="drakgreen text-center text-white">{fields.number!==undefined?fields.number:" "}</h4>
              <h4 className="drakgreen text-center text-white">{fields.email}</h4>
            </div>  
             <div className="h-25  bg-warning  text-center darkgreen">
              <div className="h-75 d-flex align-items-center justify-content-center " >
               <p>Address:  {fields.address}</p>
              </div>
              <div className="h-25" >
              <button type="" className="h-100 text-white bg-midgreen" onClick={showUpdateForm} style={{width:"100%"}}>{user.user_status?"Update":"Complete Profile"}</button>
            
              </div>
            
             </div>  

       </div>

       <div className="col-12 col-md-6 bg-light p-4" id="updateProfileSection" style={{display:"none"}}>
               <h2 className="drakgreen text-center darkgreen" >Update Here</h2>
               <div className="" >
                <div className=""  style={{marginTop:"10px"}}>
                <label htmlFor="floatingInput" className="fs-5">Enter name</label>
                <input type="text" className="form-control" value={fields.name} 
                onChange={(e)=>{dispatch({action:"name",value:e.target.value})}} name="name" placeholder="Enter name"/>
               </div>
                
              <div className="" style={{marginTop:"10px"}} >
               <label htmlFor="floatingInput" className="fs-5">Enter number</label>
               <input type="number" className="form-control" value={fields.number} 
               onChange={(e)=>{dispatch({action:"number",value:e.target.value})}}  name="number" placeholder="Enter number"/>
              </div>

               <div className="">
                <label htmlFor="floatingInput" className="fs-5">Enter email</label>
                <input type="email" className="form-control" value={fields.email}  
                onChange={(e)=>{dispatch({action:"email",value:e.target.value})}}  readOnly name="email" placeholder="Enter email"/>
               </div>

               <div className="" style={{marginTop:"10px"}} >
                <label htmlFor="floatingInput" className="fs-5">Enter Address</label>
                 <textarea className="form-control" name="address" value={fields.address} 
                 onChange={(e)=>{dispatch({action:"address",value:e.target.value})}} rows="3" cols=""></textarea>
               </div>
               <div className=""  style={{marginTop:"10px"}}>
                <label htmlFor="floatingInput" className="fs-5">Choose Photo</label>
                <input type="file" className="form-control" 
                onChange={changeProfile} id="profilePhoto" placeholder="Enter email required"/>
               </div>

               <div className=" " style={{marginTop:"10px"}} >
                 <button className="w-100 btn btn-warning" type="button" onClick={Updateprofile}>{user.user_status?"Update":"Complete Profile"}</button>
              </div>
               
               
            </div>
       </div>

        
    </div>       

    </> );
}

export default Profile;