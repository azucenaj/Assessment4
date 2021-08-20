import axios from "axios";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import "./register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordagain = useRef();
    const history = useHistory();

    const handleClick = async(e) =>{
        e.preventDefault();
       if (passwordagain.current.value !== password.current.value){
           password.current.setCustomValidity("Password don't match");
       }else{
           const user = {
               username: username.current.value,
               email: email.current.value,
               password: password.current.value
           };
           try{
                await axios.post("/auth/register", user);
                history.push("/login")
           }catch(err){
                console.log(err)
           }
           
       }
    };



    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CopySocial</h3>
                    <span className="loginDesc">Connect with others and make friends around the world on Copysocial</span>
                </div>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required type="username" ref={username} className="loginInput" />
                    <input placeholder="Email" required type="email" ref={email} className="loginInput" />
                    <input placeholder="Password" required type="password" ref={password}className="loginInput" />
                    <input placeholder="Password Again" type="password" required ref={passwordagain}className="loginInput" />
                    <button className="loginButton" type="submit">Sign Up</button>                    
                    <button className="loginRegisterButton">Log in your account</button>
                </form>
            </div>
        </div>
    )
}
