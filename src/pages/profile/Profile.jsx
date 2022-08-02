import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "./profile.css"
import { useState,useEffect,useContext,Alert ,useRef} from "react"
import axios from "axios"
import { useParams } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import {Modal,Dialog,Button,TextField,DialogContent,DialogContentText,DialogActions,DialogTitle} from "@material-ui/core"
const Profile = () => {

    const [open, setOpen] = useState(false);
    const [cover,setCover]=useState(false);

   

  const handleOpen = (temp) => {
      if(temp==true){
          setCover(true)
      }
      else{
          setCover(false)
      }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    let {dispatch,user:currentUser}=useContext(AuthContext)

    currentUser=JSON.parse(currentUser)

    const [user,setUser]=useState({})
    const [update,setUpdate]=useState(false)
    const params=useParams();

    useEffect(()=>{

        const fetchUser=async()=>{
            const res= await axios.get(`http://localhost:8080/api/user?username=${params.username}`);
            setUser(res.data);
        }

        fetchUser();
      
    },[params.username,update])

    const url = useRef()

    const updateProfile=async()=>{
         

        
      
        try{
           if(!cover){ 
           await axios.put(`http://localhost:8080/api/user/${user._id}`,{userId:user._id,profilePicture:url.current.value})
           }
           else{
            await axios.put(`http://localhost:8080/api/user/${user._id}`,{userId:user._id,coverPicture:url.current.value})
           }
            const res= await axios.get(`http://localhost:8080/api/user?username=${params.username}`);
          
          
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch({type:"LOGIN_SUCCESS",payload:localStorage.getItem("user")})
            handleClose()
            console.log(url.current.value)

            setUpdate(!update)


          
           }
           catch(e){
          console.log(e)
           }
    }
    return (
        <div>
               <Topbar user2={user}/>
          <div className="profile">
          <Sidebar/>
         
          <div className="profileRight">

          <div className="profileRightTop">

             <div className="profileCover">
             <img onClick={()=>handleOpen(true)} src={user.coverPicture?user.coverPicture:"https://github.com/safak/youtube/blob/react-social-ui/public/assets/post/3.jpeg?raw=true"} alt="" className="profileCoverImg" />
             <img src={user.profilePicture} style={{cursor:"pointer"}} onClick={()=>handleOpen(false)}  alt="" className="profileUserImg" />
             </div>


             <div className="profileInfo">
                 <h4 className="profileInfoName">{user.username}</h4>
                 <span className="profileInfoDesc">Hello my Friends</span>

             </div>
           

          </div>

          
          <div className="profileRightBottom">
          <Feed username={user.username}/>
          <Rightbar  user={user}/>
          </div>
        

          </div>
        
          </div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Insert Image Url</DialogTitle>
        <DialogContent>
        
          <input
          style={{margin:"10px",padding:"10px",border:"2px solid #1877f2",borderRadius:"10px",outline:"none"}}
            autoFocus
            type="text"
            ref={url}
          
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
       {(currentUser._id===user._id)?
        <Button onClick={updateProfile} color="primary">
           Update
          </Button>:<Button onClick={updateProfile} color="primary" disabled={true}>
           Update
          </Button>
       }
          
        </DialogActions>
      </Dialog>
       
        </div>
    )
}

export default Profile
