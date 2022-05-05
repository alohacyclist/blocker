import React, { useContext, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";
import {GgleLogin} from './GgleLogin';

export function Login() {

  const { login, openLogin, navigate, setLogin, setOpenSignup, 
          setOpenForgotPassword, displayMessage, setDisplayMessage, user } = useContext(CryptoContext)

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [showForm, setShowForm] = useState(true)

  if(!openLogin) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisplayMessage('Loggin you in...')
    await login(mail.toLowerCase(), password)
    // wait for login function via set timeout

    setTimeout(() => {
      if (!user) {
        setDisplayMessage ('Invalid Email or Password. Have you confirmed your Email?')
      } else if(user) { 
        setDisplayMessage('Enjoy BLOCKER') 
      }
    }, 3000)

    setShowForm(false)
    setTimeout(() => {setLogin(false), setShowForm(true), setDisplayMessage(''), navigate('/')}, 5000)
  }

  const handleClose = () => {setLogin(false)}

  const handleSignupForm = (e) => {
    e.preventDefault()
    setLogin(false)
    setOpenSignup(true)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setLogin(false)
    setOpenForgotPassword(true)
  }

  return ReactDOM.createPortal(
    <>
    <div className='overlay'></div>

    <div className='signup_container'>
    <p onClick={handleClose} >X</p>
    {showForm ? 
    <form className='form' onSubmit={handleSubmit}>    
      <input id='mail' value={mail} onChange={(e) => { setMail(e.target.value) }} placeholder='Enter your E-Mail'/>
      <input id='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password'/>

        <p className='form_option' onClick={(e) => handleSignupForm(e)} style={{textAlign: 'center', margin: 0}} >No Account? Sign up for free now!</p>
        <p className='form_option' onClick={(e) => handleForgotPassword(e)} style={{textAlign: 'center', margin: 0}} >Forgot Password?</p>


      <div className='login-options'>
        <button className='form-btn'>
          Login
        </button>
        <GgleLogin />
      </div>
    </form> : 
    <p className='display_message'>{displayMessage}</p>}
    </div>
    </> , document.getElementById('portal')
  );
}
