import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../../context/cryptoContext'
import './Navbar.css'

export function Navbar() {

  const { setOpenSignup, setLogin, setUser, navigate, user } = useContext(CryptoContext)

  const handleSignupForm = (e) => {
    e.preventDefault()
    setOpenSignup(true)
  }

  const handleLoginForm = (e) => {
    e.preventDefault()
    setLogin(true)
  }


/*   const deleteToken = () => {
    localStorage.removeItem('token')
}

  const logout = () => {
    deleteToken()
    setUser(null)
} */

  return (
    <nav>
        <div className='dropdown_group'>
          {/* <div className='hamburger'>&#9776;</div>
          <div className='dropdown'> */}
            <button className='nav_btn' onClick={(e) => {handleLoginForm(e)}}>Login</button>
            <button className='nav_btn' onClick={(e) => {handleSignupForm(e)}} >Signup</button> {/* signup option link on logion form */}
            <Link to='/'>Home</Link>
            {user ? <Link to='/user/profile'>Profile</Link> : <button className='nav_btn' onClick={(e) => {handleLoginForm(e)}}>Login</button>}
          </div>
    </nav>
  )
}
