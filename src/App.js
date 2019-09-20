import React, {useState, useEffect} from 'react'
import Auth from './Components/Auth/Auth'
import Navbar from './Components/Navbar/Navbar'
import Background from './Assets/sunset.jpg'
import Main from './Components/Site/Main'
import{
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'

let appBackground = {
  // backgroundImage: `url(${Background})`,
  // height: '100vh'
  backgroundSize: 'cover'
}

function App() {
  const [sessionToken, setSessionToken] = useState(false)
  const [signInCount, setSignInCount] = useState(0)
  const [role, setRole] = useState('')
  // localStorage.clear()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])
  
  const logoutCounter =() =>{
      setSignInCount(signInCount + 1)
      console.log(signInCount)
  }

  const updateToken = (newToken, role) =>{
    localStorage.setItem('token', newToken)
    localStorage.setItem('role', role)
    setSessionToken(newToken)
    setRole(role)
  }

  const clearToken = ()=>{
    localStorage.clear()
    setSessionToken('')
  }

  // const userRole = (authRole) =>{
  //   setRole(authRole)
  //   console.log(authRole)
  // }

  return (
    <div className="App" style={appBackground}>
      <Navbar clearToken={clearToken} logoutCount = {logoutCounter}/>
      {sessionToken === localStorage.getItem('token') ? 
      <Router>
      <Main token={sessionToken} role={localStorage.getItem('role')}/>
      </Router>
      : <Auth updateToken={updateToken} logoutCount = {signInCount}/>}
    </div>
  );
}

export default App;
