import "./sidebar.css"
import {RssFeed,Chat,PlayCircleFilled,Group,Bookmark,WorkOutline,Event,ContactSupport,School} from '@material-ui/icons'
import CloseFriend from "../closeFriend/CloseFriend"


import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Sidebar = () => {


    const [users, setUsers] = useState([])

    useEffect(() => {
    
       const getalluser=(async()=>{
      const res= await axios.get("http://localhost:8080/api/user/all")
      setUsers(res.data)
       })

      getalluser();
       
    });
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
               <ul className="sidebarList">

                   <li className="sidebarListItem">
                   <RssFeed className="sidebarIcon"/>
                   <span className="sidebarListItemText">Feed</span>
                   </li>

                   <li className="sidebarListItem">
                   <Chat className="sidebarIcon"/>
                   <span className="sidebarListItemText">Chats</span>
                   </li>

                   <li className="sidebarListItem">
                   <PlayCircleFilled className="sidebarIcon"/>
                   <span className="sidebarListItemText">Videos</span>
                   </li>

                   <li className="sidebarListItem">
                   <Group className="sidebarIcon"/>
                   <span className="sidebarListItemText">Groups</span>
                   </li>

                   <li className="sidebarListItem">
                   <Bookmark className="sidebarIcon"/>
                   <span className="sidebarListItemText">BookMarks</span>
                   </li>

                   <li className="sidebarListItem">
                   <ContactSupport className="sidebarIcon"/>
                   <span className="sidebarListItemText">Questions</span>
                   </li>

                   <li className="sidebarListItem">
                   <WorkOutline className="sidebarIcon"/>
                   <span className="sidebarListItemText">Jobs</span>
                   </li>

                   <li className="sidebarListItem">
                   <Event className="sidebarIcon"/>
                   <span className="sidebarListItemText">Events</span>
                   </li>

                   <li className="sidebarListItem">
                   <School className="sidebarIcon"/>
                   <span className="sidebarListItemText">Courses</span>
                   </li>


               </ul>
               <button className="sidebarButton">Show More</button>
               <hr className="sidebarHr"/>

               <ul className="sidebarFriendList">
                   

                        {users.map(u=>
                        <Link to={`/profile/${u.username}`} style={{textDecoration:"none",color:"black"}} >
                       <CloseFriend user={u} key={u.id}/>
                       </Link>
                        )}
                  
                    
               </ul>
            </div>
        </div>
    )
}

export default Sidebar
