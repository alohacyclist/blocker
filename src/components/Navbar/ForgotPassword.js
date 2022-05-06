import React, { useContext, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";
import { client } from '../../client';

export function ForgotPassword() {

  const { openForgotPassword, setOpenForgotPassword, displayMessage, setDisplayMessage, setLogin, navigate } = useContext(CryptoContext)
  const [showForm, setShowForm] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const [email, setEmail] = useState('');

  if(!openForgotPassword) return null

  const handleClose = () => {
    setOpenForgotPassword(false)
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await client.post('/auth/password-reset', { email })
    } catch (err) {
      console.log(err)
    }
    setLogin(false)
    setShowForm(false)
    setDisplayMessage('Check your Email to reset your password. See you soon!')
    setShowMessage(true)
    setTimeout(() => {setDisplayMessage(''), setShowMessage(false)}, 2500)
  }

    return ReactDOM.createPortal(
        <>
        <div className='overlay'></div>
        <div className='forgot_container' >
        <p onClick={handleClose}>X</p>
            {showForm && 
                <form  className='form' onSubmit={handleSubmit}>
                    <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                    <button className='forgot_form-btn'>Request Password</button>
                </form>}
                <p className='form_option' style={{textAlign: 'center'}} onClick={() => {setLogin(true), setOpenForgotPassword(false)}}>Back to Login</p>

            {showMessage && <div className='display_message' ><p>{displayMessage}</p></div>}
          </div>
          </>,
        document.getElementById('portal')
      )
}
