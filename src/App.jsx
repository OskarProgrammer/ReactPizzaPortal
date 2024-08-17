import { useState } from 'react'
import { Login } from './components/Login'
import { Guest } from './components/Guest'
import { Reg } from './components/Reg'
import { Page } from './components/Page'
import './App.css'

const initialUsers = [
  {
    login: "Oskar",
    password: "root",
    key: crypto.randomUUID(),
    isAdmin: "true"
  },
  {
    login: "Robert",
    password: "root",
    key: crypto.randomUUID(),
    isAdmin: "false"
  }
]

const initialPizzas = [

]


function App() {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isRegForm, setIsRegForm] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  let [users, setUsers] = useState(initialUsers)
  let [pizzas, setPizzas] = useState(initialPizzas)

  let [currentUserData, setCurrentUserData] = useState({})


  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  const changeToReg = () => {
    setIsLoginForm(false)
    setIsRegForm(true)
  }

  const logIn = (login, pass) => {
    for (const item of users){
      if (item.login == login && item.password == pass){
        setIsLogged(true)

        const newCurrentUser = {}
        newCurrentUser.login = login
        newCurrentUser.password = pass
        newCurrentUser.key = item.key
        newCurrentUser.isAdmin = item.isAdmin
      
        currentUserData = newCurrentUser
        setCurrentUserData(currentUserData)

        setIsLoginForm(false)
        return true
      }
    }
    return false
  }

  const createGuestUser = () => {
    let newUser = {
      login: "",
      password: "",
      key: crypto.randomUUID()
    }

    let userName = "Guest"
    let randomNumber = Math.floor(Math.random(1000000)*1000)
    
    newUser.login = `${userName}${String(randomNumber)}`
    newUser.password = makeid(15)

    let newUsers = [...users, newUser]
    users = newUsers
    setUsers(users)

    setIsLoginForm(false)
    setIsGuest(true)

    let newCurrentUser = {}
    newCurrentUser.login = newUser.login
    newCurrentUser.password = newUser.password
    newCurrentUser.key = newUser.key
    newCurrentUser.isAdmin = "false"

    currentUserData = newCurrentUser
    setCurrentUserData(currentUserData)

  }

  const changeToLog = () => {
    setIsGuest(false)
    setIsLoginForm(true)
    setIsRegForm(false)
  }

  const createNewAccount = (login, pass) => {
      const newUser = {
        login: login,
        password: pass,
        key: crypto.randomUUID(),
        isAdmin: "false"
      }

      const newUsers = [...users, newUser]
      users = newUsers
      setUsers(users)

      setIsLoginForm(true)
      setIsRegForm(false)
  }

  const logOut = () => {
    setIsLogged(false)
    setIsLoginForm(true)
  }

  const making = (key) => {
    const newPizzas = []

    for (const pizza of pizzas) {
      if (pizza.key === key){
        pizza.status = "Making"
        newPizzas.push(pizza)
      }else {
        newPizzas.push(pizza)
      }
    }

    pizzas = newPizzas
    setPizzas(pizzas)
  }

  const ready = (key) => {
    const newPizzas = []

    for (const pizza of pizzas) {
      if (pizza.key === key){
        pizza.status = "Ready"
        newPizzas.push(pizza)
      }else {
        newPizzas.push(pizza)
      }
    }

    pizzas = newPizzas
    setPizzas(pizzas)
  }

  const removePizza = (key) => {
    const newPizzas = []

    for (const pizza of pizzas) {
      if (pizza.key !== key){
        newPizzas.push(pizza)
      }
    }

    pizzas = newPizzas
    setPizzas(pizzas)
  }

  const create = (ownerName, ownerKey, type,address,house,flat) => {
    const newPizzas = []

    const newPizza = {
      ownerName: ownerName,
      ownerKey: ownerKey,
      pizza: type,
      status: "Preparing",
      key: crypto.randomUUID(),
      address: address,
      house: house,
      flat: flat
    }

    for (const pizza of pizzas){
      newPizzas.push(pizza)
    }
    newPizzas.push(newPizza)

    pizzas = newPizzas
    setPizzas(pizzas) 

    return true
  }

  return (
    <>
       {
        isLoginForm && !isLogged && !isGuest? <Login onReg={changeToReg} onLogIn={logIn} onGuest={createGuestUser}/> : ""
       }

       {
        !isLoginForm && isGuest ? <Guest userData={currentUserData} onBack={changeToLog}/>: ""
       }

       {
        !isLoginForm && !isGuest && !isLogged && isRegForm ? <Reg onReg={createNewAccount} onLogIn={changeToLog} onGuest={createGuestUser}/> : ""
       }

       {
        !isLoginForm && isLogged && !isRegForm? <Page onCreate={create} onMaking={making} onReady={ready} onRemove={removePizza} onLogOut={logOut} userData={currentUserData} pizzas={pizzas}/> : ""
       }
    </>
  )
}

export default App
