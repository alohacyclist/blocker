import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../../context/cryptoContext'
import './Navbar.css'

export function Navbar() {

  const { setOpenSignup, setLogin, setUser, navigate } = useContext(CryptoContext)

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
            <button className='nav_btn' onClick={(e) => {handleLoginForm(e)}} >Login</button>
            {/* <button className='nav_btn' onClick={logout()} >Logout</button> */}
            <button className='nav_btn' onClick={(e) => {handleSignupForm(e)}} >Signup</button>
            <Link to='/'><button className='nav_btn'>Home</button></Link>
            <Link to='/user/profile'><button className='nav_btn'>Profile</button></Link>
          </div>
        {/* </div> */}
    </nav>
  )
}
