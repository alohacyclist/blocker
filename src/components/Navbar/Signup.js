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
          setFirstNameValidated(false)
        } else if(name.length < 2) {
          setErrorsFirstName('Minimum length is 2 letters.')
          setFirstNameValidated(false)
        } else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)) {
          setErrorsFirstName('First name contains special characters.')
          setFirstNameValidated(false)
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
        setLastNameValidated(false)
      } else if(name.length < 2) {
        setErrorsName('Minimum length is 2 letters.')
      } else if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)) {
        setErrorsName('First name contains special characters.')
        setLastNameValidated(false)
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
      setEmailValidated(false)
    } else if(!/\S+@\S+\.\S+/.test(mail)) {
      setErrorsMail('Please provide valid E-Mail.')
      setEmailValidated(false)
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
      setPasswordValidated(false)

    } else if (password.length < 6) {
      setErrorsPassword('Minimum password length is 6 characters')
      setPasswordValidated(false)

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
      setPasswordRepeatValidated(false)
    } else if (passwordRepeat !== password) {
      setErrorsRepeatPassword('Passwords do not match!')
      setPasswordRepeatValidated(false)
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
          {errorsFirstName && <small className='form-errors'>First Name: {errorsFirstName}</small>}
          <input id='lastName' placeholder='Enter your last name' value={lastName} onChange={(e) => { setLastName(e.target.value), checkName(e.target.value) }}/>
          {errorsName && <small className='form-errors'>Last Name: {errorsName}</small>}
          <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value), checkMail(e.target.value) }}/>
          {errorsMail && <small className='form-errors'>E-Mail: {errorsMail}</small>}
          <input id='password' type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value), checkPassword(e.target.value) }}/>
          {errorsPassword && <small className='form-errors'>Password: {errorsPassword}</small>}
          <input id='passwordRepeat' type='password' placeholder='Repeat Password' value={passwordRepeat} onChange={(e) => { setPasswordRepeat(e.target.value), checkPasswordRepeat(e.target.value, password)} }/>
          {errorsRepeatPassword && <small className='form-errors'>Repeat Password: {errorsRepeatPassword}</small>}
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