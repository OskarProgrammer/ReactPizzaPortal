import { useState } from "react"
import "./Reg.css"

export const Reg = (props) => {
    const [login, setLogin] = useState("") 
    const [pass, setPass] = useState("")    
    const [repeatedPass, setRepeatedPass] = useState("")
    const [isError, setIsError] = useState(false)


    const logIn = () => {
        props.onLogIn()
    }

    const reg = () => {
        if (login !== "" && (pass === repeatedPass)){
            if (!props.onReg(login, pass)){
                setIsError(true)
            }
        }else{
            setIsError(true)
        }
    }

    const continueAsGuest = () => {
        props.onGuest()
    }

    return (
        <>
            <div className="loginForm">
                <h2>Registration Form</h2>
                <div className="logInput"><input type="text" name="login" value={login} placeholder="Login" onChange={(e)=>{setLogin(e.target.value); setIsError(false)}}/></div>
                <div className= "passInput some"><input type="password" name="pass" value={pass} placeholder="Password" onChange={(e)=>{setPass(e.target.value); setIsError(false)}}/></div>
                <div className= "repeatedPassInput"><input type="password" name="repeatedPass" value={repeatedPass} placeholder="Repeat Password" onChange={(e)=>{setRepeatedPass(e.target.value); setIsError(false)}}/></div>
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