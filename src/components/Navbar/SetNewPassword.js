import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import ReactDOM from "react-dom";
import { client } from '../../client';
import { Navigate, useParams } from 'react-router-dom';

export function SetNewPassword() {

  const { displayMessage, setDisplayMessage, navigate } = useContext(CryptoContext)
  const {userId, resetPasswordToken} = useParams()

  const [showForm, setShowForm] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [openNewPassword, setOpenNewPassword] = useState(true)

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  if(!openNewPassword) return null

  const handleClose = () => {setOpenNewPassword(false)}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await client.post(`/auth/password-reset/${userId}`, {password})
        console.log('new password submit:', response)
    } catch (error ){
        console.log('something went wrong:', error)
    }
    setShowForm(false)
    setDisplayMessage('Your password has been reset. Enjoy BLOCKER!')
    setShowMessage(true)
    setTimeout(()=>{
      navigate('/')
    }, 5000)
  }

  useEffect(async()=>{
    console.log(userId, resetPasswordToken)
    const response = await client.get(`/auth/reset-password/${userId}/${resetPasswordToken}`)
    console.log(response.data)
    response.data === 'All good!' ? console.log('user id and token valid') : setShowForm(false)
  }, [])



    return ReactDOM.createPortal(
        <>
        <div className='overlay'></div>
        <div className='signup_container'>
        <p onClick={handleClose}>X</p>
            {showForm && 
                <form  className='form' onSubmit={handleSubmit}>
                    <input id='password' type='password' placeholder='Enter new Password' value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                    <input id='password-repeat' type='password' placeholder='Repeat new Password' value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value) }}/>
                    <button>Save Password</button>
                </form>}
            {showMessage && <p>{displayMessage}</p>}
          </div>
          </>,
        document.getElementById('portal')
      )
}
