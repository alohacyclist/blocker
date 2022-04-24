import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../../context/cryptoContext'
import './Navbar.css'
import {IoGlassesOutline, FiHome, HiOutlineUser, MdOutlineLogout, CgUserList, FiUnlock, VscSearch} from 'react-icons/all'
import logo from './blocker_logo.png'
import styles from '../Coins/Coin.module.css'

export function Navbar() {

  const { setLogin, setUser, setSearchPlaceholder, user, setSearchStyle } = useContext(CryptoContext)

  const handleLoginForm = (e) => {
    e.preventDefault()
    setLogin(true)
  }

  const deleteToken = () => {
    localStorage.removeItem('token')
  }

  const logout = () => {
    deleteToken()
    setUser(null)
    console.log('user logged out')
  }

/*   const iconHex = `&#x1F50E;`
  const parser = new DOMParser();
  const icon = parser.parseFromString(iconHex, "text/html").body.textContent; */

  return (
    <div>
      <div className='header'>
        <img className='logo' src={logo} style={{height: '3rem', margin: '5px'}}/>
        <div className='header_login_profile'>
        {user ? 
          <Link to='/user/profile'><button className='nav_btn'><HiOutlineUser/></button></Link> : 
          <button className='nav_btn' onClick={(e) => {handleLoginForm(e)}}><FiUnlock/></button>}
        </div>
      </div>
      <nav>
        <div>
            <Link to='/'><button className='nav_btn'><FiHome/></button></Link>
            <Link to='/watchlist'><button className='nav_btn'><CgUserList/></button></Link>
        
            <button className='nav_btn' onClick={() => {setSearchStyle(styles.coin_search_show), setSearchPlaceholder('Type to search for coins...') }}><VscSearch /></button>

            {user ? 
              <Link to='/user/watchlist'><button onClick={() => {window.scrollTo(0, 0)}} className='nav_btn'><IoGlassesOutline/></button></Link> : null}
            {user ? 
              <button className='nav_btn' onClick={() => {logout()}} ><MdOutlineLogout/></button> : null}
        </div>
    </nav>
    </div>
    
  )
}
