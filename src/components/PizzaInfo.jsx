import "./PizzaInfo.css"


export const PizzaInfo = (props) => {
    return(
        <>
            <div className="pizzaInfo">
                <hr/>
                <div>Pizza: {props.type}</div>
                <div>Sauce: {props.sauce}</div>
                <div>Time of making: {props.time}</div>
                <hr/>
            </div>
        </>
    )
}