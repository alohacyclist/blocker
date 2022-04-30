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
        const response = await client.post('/auth/password-reset', { email })
        console.log(response.data)
    } catch {
        console.log('something went wrong.')
    }
    setLogin(false)
    setShowForm(false)
    setDisplayMessage('Check your Email to reset your password. See you soon!')
    setShowMessage(true)
  }

    return ReactDOM.createPortal(
        <>
        <div className='overlay'></div>
        <div className='signup_container'>
        <p onClick={handleClose}>X</p>
            {showForm && 
                <form  className='form' onSubmit={handleSubmit}>
                    <input id='email' placeholder='Enter your E-Mail' value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                    <button>Request Password</button>
                </form>}
            {showMessage && <p>{displayMessage}</p>}
          </div>
          </>,
        document.getElementById('portal')
      )
}
