import React, { useContext, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";

export function Login() {

  const { login, openLogin, navigate, setLogin, setOpenSignup } = useContext(CryptoContext)

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  if(!openLogin) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    login(mail, password)
    setLogin(false)
    navigate('/')
  }

  const handleClose = () => {setLogin(false)}

  const handleSignupForm = (e) => {
    e.preventDefault()
    setLogin(false)
    setOpenSignup(true)
  }

  return ReactDOM.createPortal(
    <>
    <div className='overlay'></div>
    <div className='signup_container'>
    <p onClick={handleClose} >X</p>
      
    <form onSubmit={handleSubmit}>    
      <input id='mail' value={mail} onChange={(e) => { setMail(e.target.value) }} placeholder='Enter your E-Mail'/>
      <input id='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password'/>

        <p className='form_option' onClick={(e) => handleSignupForm(e)} style={{textAlign: 'center', margin: 0}} >No Account? Sign up for free now!</p>

      <button className='form-btn'>
      Login
      </button>
      
    </form>
    </div>
    
    </>
    ,
    document.getElementById('portal')
  );
}
