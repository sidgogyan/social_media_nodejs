import axios from "axios"

export const loginCall=async(user,dispatch)=>{

     dispatch({type:"LOGIN_START"});
   

    try{
       const res=await axios.post("http://localhost:8080/api/auth/login",user);
       localStorage.setItem("user", JSON.stringify(res.data));
       dispatch({type:"LOGIN_SUCCESS",payload:localStorage.getItem("user")})

        
        
    
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}