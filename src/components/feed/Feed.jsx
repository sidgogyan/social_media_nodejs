import { useState ,useEffect,useContext} from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import {AuthContext} from "../../context/AuthContext"

import  axios from "axios";


const Feed = ({username}) => {
    const [posts, setposts] = useState([]);

    let {user} =useContext(AuthContext)

   user= JSON.parse(user)

    useEffect(()=>{

        const fetchPosts=async()=>{
            const res=username? 
            await axios.get(`http://localhost:8080/api/post/profile/${username}`):
               await axios.get(`http://localhost:8080/api/post/timeline/${user._id}`)
            setposts(res.data.sort((p1,p2)=>{

                 return new Date(p2.createdAt)-new Date(p1.createdAt)
            }));
        }

        fetchPosts();
      
    },[username])

    return (
        <div className="feed">
           <div className="feedWrapper">
           {!username ||(username===user.username)?<Share/>:""}
            
             {posts.map(p=>(
                <Post post={p} key={p._id}/>
            ))} 
           </div>
        </div>
    )
}

export default Feed
