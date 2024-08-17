import { Pizza } from "./Pizza"
import { PizzaInfo } from "./PizzaInfo"
import "./Page.css"
import { useState } from "react"

const pizzasInfo = {
    "Margheritta": {
        "sauce":"tomato",
        "ingredients": ["cheese"],
        "time":20,
    },
    "Salami": {
        "sauce":"tomato",
        "ingredients": ["salami", "cheese"],
        "time": 30,
    },
}

export const Page = (props) => {
    const [isShown, setIsShown] = useState(false)
    const [isExtended, setIsExtended] = useState(true)
    const [isError, setIsError] = useState(false) 
    const [isConfirm, setIsConfirm] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    
    let [address, setAddress] = useState("")
    let [house, setHouse] = useState("")
    let [flat, setFlat] = useState("")
    let [typeOfPizza, setTypeOfPizza] = useState("")

    const logOut = () => {
        props.onLogOut()
    }

    const make = (key) => {
        props.onMaking(key)
    }

    const ready = (key) => {
        props.onReady(key)
    }
    
    const remove = (key) => {
        props.onRemove(key)
    }

    const createPizza = () => {
        if (address == "" || typeOfPizza == "" || house == "" || flat == "" || !isConfirm){
            setIsError(true)
        }else{
            if (!props.onCreate(props.userData.login,props.userData.key, typeOfPizza, address, house, flat)){
                setIsError(true)
            }else{
                setIsSuccess(true)
                setAddress("")
                setTypeOfPizza("")
                setFlat("")
                setHouse("")
                setIsConfirm(false)
            }
        }
    }

    return (
        <>
            <div className="mainPage">
                <div className="buttonsBar">
                    <button className="userInfoButton">{props.userData.login}{props.userData.isAdmin == "true" ? ": Admin": ""}</button>
                    <button className="logOutButton" onClick={()=>{logOut()}}>Log Out</button>
                </div>

                <div className="title">
                    <h2>Crow Pizza</h2>
                </div>
                <div className="listOfPizzas">
                    {props.pizzas.map((item) => {
                        const addressInfo = {"address": item.address, "house": item.house, "flat": item.flat}

                        if (item.ownerName == props.userData.login) {
                            return <Pizza onMaking={make} onReady={ready} onRemove={remove} owner={item.ownerName} pizzaKey={item.key} type={item.pizza} status={item.status} addressInfo={addressInfo} isAdmin={props.userData.isAdmin}/>
                        }else if (props.userData.isAdmin == "true"){
                            return <Pizza onMaking={make} onReady={ready} onRemove={remove} owner={item.ownerName} pizzaKey={item.key} type={item.pizza} status={item.status} addressInfo={addressInfo} isAdmin={props.userData.isAdmin}/>
                        }else if (props.pizzas.length == 0) {
                            return <div>No pizzas</div>
                        }
                    })}
                </div>

                {props.userData.isAdmin == "true" ? "" : <div className={isShown ? "pizzaMaker create" : "pizzaMaker"}>
                    <button onClick={()=>{setIsShown(!isShown)}} className="createPizzaButton">{isShown ? "Hide" : "Show"} your Pizza Maker</button>

                    {isShown ? 
                        <div className="pizzaForm" onChange={()=>{setIsError(false); setIsSuccess(false)}}>
                            <p>Pizza Maker</p>
                            <div className="order">
                                <select onChange={(e)=>{setTypeOfPizza(e.target.value)}} value={typeOfPizza} onClick={()=>{setIsExtended(!isExtended)}} className={isExtended ? "extend" :""}>
                                    <option value=""></option>
                                    <option value="Margharitta">Margharitta</option>
                                    <option value="Salami">Salami</option>
                                </select>

                                <div className="choosenPizza">
                                    Chosen Pizza: {typeOfPizza}
                                </div>

                                <hr />
                                
                                <div className="delivery" onChange={()=>{setIsConfirm(false)}}>
                                    Delivery Informations
                                    <div>
                                        <input type="text" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="House" onChange={(e)=>{setHouse(e.target.value)}}/>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Flat" onChange={(e)=>{setFlat(e.target.value)}}/>
                                    </div>

                                    <button className="confirmButton" onClick={()=>{setIsConfirm(true)}}>Confirm</button>

                                    {isConfirm ? <>
                                        <div>Address: {address}</div>
                                        <div>House: {house}</div>
                                        <div>Flat: {flat}</div>
                                    </>: ""}
                                </div>

                                <button className="orderButton" onClick={()=>{createPizza()}}>Order</button>
                                {isError ? <div className="errorMessage orderingError">Order is missing something</div> : ""}
                                {isSuccess ? <div className="successMessage">Order has been sent successfully</div> : ""}
                            </div>
                        </div>
                    :""}
                </div>}

                {props.userData.isAdmin == "true" ? "" : <div className="infoAboutPizzas">
                        <p>Read About Our Pizzas</p>

                        {Object.entries(pizzasInfo).map((pizza)=>{
                            return <PizzaInfo type={pizza[0]} sauce={pizza[1].sauce} ingredients={pizza[1].ingredients} time={pizza[1].time}/>
                        })}
                </div>}
            </div>
        </>
    )
}