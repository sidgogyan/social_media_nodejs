import './rightbar.css'

import Online from '../online/Online'
import {Users} from "../../dummyData"
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
import {Add, Remove} from "@material-ui/icons"


const Rightbar = ({user}) => {

const [friends, setFriends] = useState([])
const {user:currentUser,dispatch}=useContext(AuthContext)
let myuser=JSON.parse(currentUser)
const [followed,setFollowed]=useState(false);
useEffect(()=>{
    const temp= myuser.following.includes(user?user._id:"1")
         setFollowed(temp)
},[currentUser,user?user:currentUser])






    useEffect(()=>{
         const getFriends=async()=>{
             try{
                 const friendList=await axios.get("http://localhost:8080/api/user/friends/"+user._id)
                 setFriends(friendList.data);
             }
             catch(e){
                  console.log(e);
             }
         }

         user?getFriends():console.log("hii");
         
    },[user?user._id:""])



    const handleClick=async()=>{
        try{
            if(!followed){
                await axios.put("http://localhost:8080/api/user/"+user._id+"/follow",{userId:JSON.parse(currentUser)._id})
            
                const res= await axios.get(`http://localhost:8080/api/user?username=${JSON.parse(currentUser).username}`);
          
          
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch({type:"LOGIN_SUCCESS",payload:localStorage.getItem("user")})
            }
            else{
                await axios.put("http://localhost:8080/api/user/"+user._id+"/unfollow",{userId:JSON.parse(currentUser)._id})
              
                const res= await axios.get(`http://localhost:8080/api/user?username=${JSON.parse(currentUser).username}`);
          
          
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch({type:"LOGIN_SUCCESS",payload:localStorage.getItem("user")})
            }
            setFollowed(!followed)

        }
        catch(e){
            console.log(e);
        }
        
    }

    const HomeRightbar=()=>{
        return(
            <>
            <div className="birthdayContainer">
                    <img src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/gift.png?raw=true" alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Ploa foster</b> and <b>3 other friends</b> have a birthday today</span>
                </div>
                <img src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/ad.png?raw=true" alt="" className="rightbarAd" />

                <h4 className="rightbarTitle"> Online Friends</h4>


                    <ul className="rightbarFriendList">

                    {Users.map((u)=>
                       <Online user={u} key={u.id}/>
                    )}
                    </ul> 


            </>
        )
    }


    const ProfileRightbar=()=>{
        return(

            <>
            {user.username!==JSON.parse(currentUser).username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                  
                      {followed?"unFollow":"Follow"}
                      {followed?<Remove/>:<Add/>}

                  
                </button>

            )}
          
          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City :</span>
                  <span className="rightbarInfoValue">NewYork</span>
              </div>

              <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">From :</span>
                  <span className="rightbarInfoValue">Madrid</span>
              </div>

              <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Relationship :</span>
                  <span className="rightbarInfoValue">Single</span>
              </div>
          </div>

          <h4 className="rightbarTitle">User Friends</h4>
          <div className="rightbarFollowings">
          {friends.map((friend)=>(
            
            
              <div className="rightbarFollowing">
              <Link to={`/profile/${friend.username}`}>
                  <img className="rightbarFollowingImg" src={friend.profilePicture} alt=""></img>
                  </Link>
                  <span className="rightbarFollowingName" style={{textDecoration:"none"}}>{friend.username}</span>
              </div>
             
          ))}

              
          </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                
            {user? <ProfileRightbar/>:<HomeRightbar/>}
                    
            </div>
        </div>
    )
}

export default Rightbar
