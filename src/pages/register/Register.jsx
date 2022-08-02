import  "./register.css"
import { Link,useHistory } from "react-router-dom"
import { useRef } from "react"

import axios from "axios"
const Register= () => {

    const email = useRef();
    const password = useRef();
    const username=useRef();
    const passwordAgain=useRef();
    const history=useHistory();

    const handleClick=async(e)=>{
        e.preventDefault();

        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("password don't match")
        }
        else{
            const user={
                username:username.current.value,
                password:password.current.value,
                email:email.current.value,
                profilePicture:"https://www.vippng.com/png/detail/134-1344183_flat-character-avatar-portrait-png-and-psd-.png"
            }
            try{
            const res=await axios.post("http://localhost:8080/api/auth/register",user);
            history.push("/login")
            }
            catch(e){
                console.log(e);
            }
        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    
                    <h3 className="loginLogo">LamaSocial</h3>
                    <span className="loginDesc">
                        connect with friends and the world around you on LamaSocial
                    </span>
                </div>

                <div className="loginRight">
                  <form className="loginBox" onSubmit={handleClick}>
                      <input placeholder="Username" required ref={username} className="loginInput" />
                      <input placeholder="Email" type="email" required ref={email} className="loginInput" />
                      <input placeholder="Password" required type="password" minLength="6" ref={password} className="loginInput" />
                      <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInput" />
                      <button className="loginButton" type="submit">Sign up</button>
                      <Link to="/login" style={{display:"flex",justifyContent:"center",textDecoration:"none"}} >
                      <button className="loginRegisterButton">Log in</button>
                      </Link>
                  </form>
                </div>
            </div>
        </div>
    )
}

export default Register
