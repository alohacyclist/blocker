import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";

export function Login() {

  const { login, openLogin, navigate, setLogin } = useContext(CryptoContext)

  if(!openLogin) return null

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    login(mail, password)
    setLogin(false)
    setTimeout(() => {navigate('/user/profile')}, 100)
  }

    const handleClose = () => {setLogin(false)}

  return ReactDOM.createPortal(
    <>
    <div className='overlay'></div>
    <div className='signup_container'>
    <p onClick={handleClose} >X</p>

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input id='mail' value={mail} onChange={(e) => { setMail(e.target.value) }} placeholder='Enter your E-Mail'/>
      <input id='password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password'/>
      <button>Login</button>
    </form>
    </div>
    
    </>
    ,
    document.getElementById('portal')
  );
}
