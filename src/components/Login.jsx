import { useState } from "react"
import "./Login.css"

export const Login = (props) => {
    const [login, setLogin] = useState("")    
    const [pass, setPass] = useState("")    
    const [isError, setIsError] = useState(false)

    const logIn = () => {
        if (login === "" || pass === "") {
            setIsError(true)
            return
        }

        if (!props.onLogIn(login, pass)) {
            setIsError(true)
        }else{
            setIsError(false)
        }
    }

    const reg = () => {
        props.onReg()
    }

    const continueAsGuest = () => {
        props.onGuest()
    }

    return (
        <>
            <div className="loginForm">
                <h2>Login Form</h2>
                <div className="logInput"><input type="text" name="login" value={login} placeholder="Login" onChange={(e)=>{setLogin(e.target.value); setIsError(false)}}/></div>
                <div className= "passInput"><input type="password" name="pass" value={pass} placeholder="Password" onChange={(e)=>{setPass(e.target.value); setIsError(false)}}/></div>
                <div className="buttons">
                    <button type="button" onClick={()=>{logIn()}} >Login</button>
                    <button type="button" onClick={()=>{reg()}} >Register</button>
                    <button type="button"onClick={()=>{continueAsGuest()}} >Continue As Guest</button>  
                </div>
                {isError ? <div className="errorMessage">Error</div> : ""}
            </div>
        </>
    )
}