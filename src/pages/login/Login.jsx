import React from "./login.css"
import { useRef,useContext } from "react"
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom"

const Login = () => {
    
    const email = useRef();
    const password = useRef();
    const {isFecthing,error,dispatch,user}=useContext(AuthContext);

    const handleClick=(e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
          
    }
    console.log(user);
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
                      <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                      <input placeholder="Password" type="password" className="loginInput" minLength="6" required ref={password} />
                      <button className="loginButton"> {isFecthing?<CircularProgress color="white" size="20px"/>:"Log in"}</button>
                      <span className="loginForgot">Forgot Password?</span>
                     <Link to="/register" style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}> <button  className="loginRegisterButton">{isFecthing?<CircularProgress color="white" size="20px"/>:"Create a New Account"}</button></Link>
                  </form>
                </div>
            </div>
        </div>
    )
}

export default Login
