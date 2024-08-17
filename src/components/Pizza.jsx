import { useState } from "react"
import "./Pizza.css"


export const Pizza = (props) => {
    const [isShown, setIsShown] = useState(false)


    return (
        <>
            <div className="pizzaInformations">

                <div className="pizzaTitle">{props.type}</div>
                {props.status == "Preparing" ? <div className="pizzaStatus preparing">{props.status}</div> : (props.status == "Making") ? <div className="pizzaStatus making">{props.status}</div> : <div className="pizzaStatus ready">{props.status}</div>}
                {props.isAdmin == "true" ? <div className="adminInfo">{props.pizzaKey}: {props.owner}</div> : ""}
                {props.isAdmin == "true" ? 
                <div className="adminButtons">
                    <button onClick={()=>{props.onMaking(props.pizzaKey)}} className="makingButton">Making</button>
                    <button onClick={()=>{props.onReady(props.pizzaKey)}} className="readyButton">Ready</button>
                    <button onClick={()=>{props.onRemove(props.pizzaKey)}}className="removeButton">Remove</button>
                </div>: ""}
                <div className={isShown ? "deliveryInformations shown" : "deliveryInformations"}>
                    <button onClick={()=>{setIsShown(!isShown)}} className={isShown ? "active" : ""}>{isShown ? "Hide" : "Show"} delivery informations</button>
                    {isShown ? 
                        <div className="detailsInformation">
                            <p>Address: {props.addressInfo.address}</p>
                            <p>House: {props.addressInfo.house}</p>
                            <p>Flat: {props.addressInfo.flat}</p>
                        </div>
                    : ""}
                </div>

            </div>
        </>
    )
}