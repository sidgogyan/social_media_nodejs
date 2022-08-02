import React,{useContext,useState,useEffect} from 'react'
import "./topbar.css"
import {Search,Person,Chat,Notifications} from '@material-ui/icons'
import { Link ,Redirect,useParams,useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
const Topbar = ({user2}) => {

    const {user,dispatch} =useContext(AuthContext)
    const history=useHistory();
   
   const logOut=()=>{
    localStorage.removeItem("user");
    dispatch({type:"LOGIN_SUCCESS",payload:localStorage.getItem("user")})
}
    
   
    return (
       <div className="topbarContainer">
            <div className="topbarLeft">
               <Link to="/" style={{textDecoration:"none"}}> <span className="logo">Lamasocial</span></Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                 <Search className="searchIcon"/>
                 <input placeholder="Search from friend,post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
               <div className="topbarLinks">

                   <span className="topbarLink">HomePage</span>
                   <span className="topbarLink">Timeline</span>
               </div>
             <div className="topbarIcons">
               
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>

               </div>

               
               <button onClick={logOut}style={{background:"#fff",outline:"none",border:"none",padding:"7px 15px",fontSize:"13px",fontWeight:"500",borderRadius:"3px",cursor:"pointer"}}>Logout</button>
               <Link to={`/profile/${JSON.parse(user).username}`}>
               <img src={JSON.parse(user).profilePicture?JSON.parse(user).profilePicture:"https://www.vippng.com/png/detail/134-1344183_flat-character-avatar-portrait-png-and-psd-.png"} alt="" className="topbarImg"/>
</Link>

            </div>

       </div>

    )
}

export default Topbar
