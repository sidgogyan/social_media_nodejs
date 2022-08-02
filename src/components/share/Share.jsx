import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from '@material-ui/icons'
import { useContext,useRef,useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

const Share = () => {


    const desc=useRef();
    let {user} =useContext(AuthContext)

    user=JSON.parse(user);

    const [file,setFile]=useState(null);


    const givesuggestion= ()=>{
      const myvalue=desc.current.value;
      
       console.log(myvalue);
    }

    const submitHandler=async(e)=>{
       e.preventDefault()

       const newPost={
           userId:user._id,
           desc:desc.current.value,
       }

      

       if(file){
       
           let data=new FormData();
           const fileName=Date.now()+file.name;
           
           data.append('name',fileName)
           data.append('file',file)
          
           newPost.img=fileName;
          
           try{
                await axios.post("http://localhost:8080/api/upload",data)
                window.location.reload()
           }
           catch(e){
               console.log(e);
           }
       }

       try{
      await axios.post("http://localhost:8080/api/post",newPost)
       }
       catch(e){
      
       }
    }
    return (
        <div className="share">
          <div className="shareWrapper">
              <div className="shareTop">
                 <img src={user.profilePicture?user.profilePicture:"https://www.vippng.com/png/detail/134-1344183_flat-character-avatar-portrait-png-and-psd-.png"} alt="" className="shareProfileImg"/>

                <input type="text" className="shareInput" placeholder="what's in Your Mind Safak" onChange={()=>givesuggestion()} ref={desc}/>
                 </div>

                 <hr className="shareHr"/>
                 {file && (
                     <div className="shareImgContainer">
                         <img className="shareImg" alt=""  src={URL.createObjectURL(file)}/>
                         <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                     </div>
                 )}
                  <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>

                        <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>


                        <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Fellings</span>
                        </div>
                    </div>

                    <button className="shareButton" type="submit">Share</button>
                 
              </form>
          </div>
        </div>
    )
}

export default Share
