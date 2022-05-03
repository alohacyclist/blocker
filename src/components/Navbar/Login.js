import React, { useContext, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";
import {GgleLogin} from './GgleLogin';

export function Login() {

  const { login, openLogin, navigate, setLogin, setOpenSignup, 
          setOpenForgotPassword, displayMessage, setDisplayMessage } = useContext(CryptoContext)

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [showForm, setShowForm] = useState(true)

  if(!openLogin) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    login(mail, password)
    setShowForm(false)
    setTimeout(() => {setLogin(false), setShowForm(true), setDisplayMessage(''), navigate('/')}, 3000)
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
    
    </>
    ,
    document.getElementById('portal')
  );
}
