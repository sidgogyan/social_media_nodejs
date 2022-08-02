import "./post.css"
import {MoreVert} from '@material-ui/icons'

import { useState,useEffect,useContext } from "react"
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"

import {format} from "timeago.js"
import {Link} from 'react-router-dom'


const Post = ({post}) => {

    const [like,setLike]=useState(post.likes.length)
    const [isliked,setIsLiked]=useState(false)
    const [user,setUser]=useState({})

    const {user:currentUser} =useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{

        const fetchUser=async()=>{
            const res= await axios.get(`http://localhost:8080/api/user?userId=${post.userId}`);
            setUser(res.data);
        }

        fetchUser();
      
    },[post.userId,post])

    const likeHandler=()=>{
       
       try{
        axios.put(`http://localhost:8080/api/post/${post._id}/like`,{userId:currentUser._id})
        setLike(isliked?like-1:like+1)
        setIsLiked(!isliked)
       }
       catch(e){

       }
        
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                      <Link to={`/profile/${user.username}`}>
                        <img src= {user.profilePicture} alt="" className="postProfileImg"/>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                       
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>


                <div className="postCenter">
                   
                   <span className="postText">{post?.desc}</span>
                   <img src={"http://localhost:8080/images/"+post.img} alt="" className="postImg"/>

                </div>

                <div className="postBottom">

                    <div className="postBottomLeft">
                        <img src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true" alt=""  onClick={likeHandler} className="likeIcon"/>
                        <img src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/heart.png?raw=true" alt="" className="likeIcon"  onClick={likeHandler}/>

                        <span className="postLikeCounter">{like===0?0:like} People like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment?post.comment:"10"} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
