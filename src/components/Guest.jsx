import "./Guest.css"

export const Guest = (props) => {
    
    const onCopy = (e) => {
        navigator.clipboard.writeText(e.target.innerHTML)
        alert(`Copied ${e.target.innerHTML}`)
    }

    return (
        <div className="guestIntroduction">
            <h2>Your guest account informations</h2>
            <div className="guestInformations">
                <div className="guestLogin">Login: <div onClick={(e)=>{onCopy(e,"login")}}>{props.userData.login}</div></div>
                <div className="guestPass">Password: <div onClick={(e)=>{onCopy(e,"login")}}>{props.userData.password}</div></div>
                <div className="guestKey">Key: <div onClick={(e)=>{onCopy(e,"login")}}>{props.userData.key}</div></div>
            </div>
            <button onClick={()=>{props.onBack()}}>Back to login page</button>
        </div>
    )
}