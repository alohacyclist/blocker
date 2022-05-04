import React, { useState, useContext } from 'react'
import './Form.css'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDom from "react-dom";

export function Signup() {

  const { signup, openSignup, setOpenSignup, setLogin, displayMessage, setDisplayMessage } = useContext(CryptoContext)

  const [firstName, setFirstName] = useState('')
  const [errorsFirstName, setErrorsFirstName] = useState(null)
  const [firstNameValidated, setFirstNameValidated] = useState(false)

  const [lastName, setLastName] = useState('')
  const [errorsName, setErrorsName] = useState(null)
  const [lastNameValidated, setLastNameValidated] = useState(false)

  const [email, setEmail] = useState('')
  const [errorsMail, setErrorsMail] = useState(null)
  const [emailValidated, setEmailValidated] = useState(false)


  const [password, setPassword] = useState('')
  const [errorsPassword, setErrorsPassword] = useState(null)
  const [passwordValidated, setPasswordValidated] = useState(false)

  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [errorsRepeatPassword, setErrorsRepeatPassword] = useState(null)
  const [passwordRepeatValidated, setPasswordRepeatValidated] = useState(false)

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

      // firstName validation
      const checkFirstName = (name) => {
        if(!name) {
          setErrorsFirstName('REQUIRED')
        } else if(name.length < 2) {
          setErrorsFirstName('Minimum length is 2 letters.')
        } else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)) {
          setErrorsFirstName('First name contains special characters.')
        } else {
          setErrorsFirstName(null)
          setFirstNameValidated(true)
        }
        return
      }
        
    // lastName validation
    const checkName = (name) => {
      if(!name) {
        setErrorsName('REQUIRED')
      } else if(name.length < 2) {
        setErrorsName('Minimum length is 2 letters.')
      } else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)) {
        setErrorsName('First name contains special characters.')
      } else {
        setErrorsName(null)
        setLastNameValidated(true)
      }
      return
    }

    // email validation
    const checkMail = (mail) => {
      if(!mail) {
      setErrorsMail('REQUIRED')
    } else if(!/\S+@\S+\.\S+/.test(mail)) {
      setErrorsMail('Please provide valid E-Mail.')
    } else {
      setErrorsMail(null)
      setEmailValidated(true)
    }
    return
  }

  // password validation
  const checkPassword = (password) => {
    if (!password) {
      setErrorsPassword('REQUIRED')
    } else if (password.length < 6) {
      setErrorsPassword('Minimum password length is 6 characters')
    } else {
      setErrorsPassword(null)
      setPasswordValidated(true)
    }
    return
  }
  
  // passwordRepeat validation
  const checkPasswordRepeat = (passwordRepeat, password) => {
    if (!passwordRepeat) {
      setErrorsRepeatPassword('REQUIRED')
    } else if (passwordRepeat !== password) {
      setErrorsRepeatPassword('Passwords do not match!')
    } else {
      setErrorsRepeatPassword(null)
      setPasswordRepeatValidated(true)
    }
    return
  }
  
  return ReactDom.createPortal(
    <>
    <div className='overlay'></div>
    <div className='signup_container'>
    <p onClick={handleClose}>X</p>
    {showForm &&       
      <form  className='form' onSubmit={handleSubmit}>
          <p className='form_option' onClick={(e) => handleLoginForm(e)} style={{textAlign: 'center', margin: 0}} >Have an Account? Login.</p>
          <input id='firstName' placeholder='Enter your first name' value={firstName} onChange={(e) => { setFirstName(e.target.value), checkFirstName(e.target.value) }}/>
          {errorsFirstName && <p>First Name: {errorsFirstName}</p>}
          <input id='lastName' placeholder='Enter your last name' value={lastName} onChange={(e) => { setLastName(e.target.value), checkName(e.target.value) }}/>
          {errorsName && <p>Last Name: {errorsName}</p>}
          <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value), checkMail(e.target.value) }}/>
          {errorsMail && <p>E-Mail: {errorsMail}</p>}
          <input id='password' type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value), checkPassword(e.target.value) }}/>
          {errorsPassword && <p>Password: {errorsPassword}</p>}
          <input id='passwordRepeat' type='password' placeholder='Repeat Password' value={passwordRepeat} onChange={(e) => { setPasswordRepeat(e.target.value), checkPasswordRepeat(e.target.value, password)} }/>
          {errorsRepeatPassword && <p>Repeat Password: {errorsRepeatPassword}</p>}
          {/* if all inputs are validated, show button */}
          {firstNameValidated && lastNameValidated && emailValidated && passwordValidated && passwordRepeatValidated && 
            <button className='form-btn'>Signup</button>}
        </form>}
      {showMessage && <div className='display_message' ><p>{displayMessage}</p></div>}
      </div>
      </>,
    document.getElementById('portal')
  )
}