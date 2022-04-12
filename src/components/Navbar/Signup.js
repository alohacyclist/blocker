import React, { useState, useContext, useEffect } from 'react'
import './Form.css'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDom from "react-dom";


export function Signup() {

  const { signup, openSignup, setOpenSignup, setLogin } = useContext(CryptoContext)

  if(!openSignup) return null

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(firstName, lastName, email, password)
    setOpenSignup(false)
    setLogin(true)
  }

/*   useEffect(() => {
    navigate('/login')
  }, [handleSubmit]) */

  return ReactDom.createPortal(
    <>
    <div className='overlay'></div>
    <div className='signup_container'>
      <form onSubmit={handleSubmit}>
        <h2>Signup-Form</h2>
        {/* <label htmlFor='firstName'>First name:</label> */}
        <input id='firstName' placeholder='Enter your first name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }}/>
        {/* <label htmlFor='lastName'>Last name:</label> */}
        <input id='lastName' placeholder='Enter your last name' value={lastName} onChange={(e) => { setLastName(e.target.value) }}/>
        {/* <label htmlFor='email'>Email:</label> */}
        <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value) }}/>
        {/* <label htmlFor='password'>Password:</label> */}
        <input id='password' type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }}/>
        <input id='passwordRepeat' type='password' placeholder='Repeat Password' value={passwordRepeat} onChange={(e) => { setPasswordRepeat(e.target.value) } }/>
        <button>Signup</button>
      </form>
      </div>
      </>,
    document.getElementById('portal')
  )
}