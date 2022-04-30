import React, { useState, useContext } from 'react'
import './Form.css'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDom from "react-dom";


export function Signup() {

  const { signup, openSignup, setOpenSignup, setLogin, displayMessage, setDisplayMessage } = useContext(CryptoContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const [showForm, setShowForm] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  if(!openSignup) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(firstName, lastName, email, password)
    setShowForm(false)
    setDisplayMessage('Check your Mail to verify your account.')
    setShowMessage(true)
    setTimeout(() => {setOpenSignup(false), setShowMessage(false), setShowForm(true)}, 4000)
  }

  const handleLoginForm = (e) => {
    e.preventDefault()
    setOpenSignup(false)
    setLogin(true)
  }

  const handleClose = () => {setOpenSignup(false)}

  return ReactDom.createPortal(
    <>
    <div className='overlay'></div>
    <div className='signup_container'>
    <p onClick={handleClose}>X</p>
    {showForm &&       
      <form  className='form' onSubmit={handleSubmit}>
          <p className='form_option' onClick={(e) => handleLoginForm(e)} style={{textAlign: 'center', margin: 0}} >Have an Account? Login.</p>
          <input id='firstName' placeholder='Enter your first name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }}/>
          <input id='lastName' placeholder='Enter your last name' value={lastName} onChange={(e) => { setLastName(e.target.value) }}/>
          <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value) }}/>
          <input id='password' type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }}/>
          <input id='passwordRepeat' type='password' placeholder='Repeat Password' value={passwordRepeat} onChange={(e) => { setPasswordRepeat(e.target.value) } }/>
          <button className='form-btn'>Signup</button>
        </form>}
      {showMessage && <div className='display_message' ><p>{displayMessage}</p></div>}
      </div>
      </>,
    document.getElementById('portal')
  )
}