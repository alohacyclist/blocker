import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../../context/cryptoContext'
import './Navbar.css'
import {IoGlassesOutline, FiHome, HiOutlineUser, MdOutlineLogout, CgUserList, FiUnlock, VscSearch} from 'react-icons/all'
import logo from './blocker_logo.png'
import styles from '../Coins/Coin.module.css'

export function Navbar() {

  const { setLogin, setUser, setSearchPlaceholder, user, setSearchStyle, navigate } = useContext(CryptoContext)

  const [activeWatchlistBtn, setActiveWatchlistBtn] = useState(false)
  const [activeSearchBtn, setActiveSearchBtn] = useState(false)
  const [activeUserWatchlistBtn, setActiveUserWatchlistBtn] = useState(false)
  const [activeProfileBtn, setActiveProfileBtn] = useState(false)
  const [activeLoginBtn, setActiveLoginBtn] = useState(false)
  const [activeHomeBtn, setActiveHomeBtn] = useState(true)

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
    navigate('/')
  }

  const handleSearchStyle = (e) => {
    e.preventDefault()
    setSearchStyle(styles.coin_search_show)
    setSearchPlaceholder('Type to search for coins...')
    window.scrollTo(0, 0)
    navigate('/')
  }

  const handleHomeBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn('nav_btn_active')
    setActiveSearchBtn(false)
    setActiveUserWatchlistBtn(false)
    setActiveProfileBtn(false)
    setActiveLoginBtn(false)
    setActiveWatchlistBtn(false)
  }

  const handleUserWatchlistBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn(false)
    setActiveSearchBtn(false)
    setActiveUserWatchlistBtn('nav_btn_active')
    setActiveProfileBtn(false)
    setActiveLoginBtn(false)
    setActiveWatchlistBtn(false)
  }

  const handleProfileBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn(false)
    setActiveSearchBtn(false)
    setActiveUserWatchlistBtn(false)
    setActiveProfileBtn('nav_btn_active')
    setActiveLoginBtn(false)
    setActiveWatchlistBtn(false)
  }

  const handleLoginBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn(false)
    setActiveSearchBtn(false)
    setActiveUserWatchlistBtn(false)
    setActiveProfileBtn(false)
    setActiveLoginBtn('nav_btn_active')
    setActiveWatchlistBtn(false)
  }

  const handleSearchBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn(false)
    setActiveSearchBtn('nav_btn_active')
    setActiveUserWatchlistBtn(false)
    setActiveProfileBtn(false)
    setActiveLoginBtn(false)
    setActiveWatchlistBtn(false)
  }

  const handleWatchlistBtn = (e) => {
    e.preventDefault()
    setActiveHomeBtn(false)
    setActiveSearchBtn(false)
    setActiveUserWatchlistBtn(false)
    setActiveProfileBtn(false)
    setActiveLoginBtn(false)
    setActiveWatchlistBtn('nav_btn_active')
  }

  return (
    <div>
      <div className='header'>
        <img className='logo' src={logo} style={{height: '3rem', margin: '5px'}}/>
        <div className='header_login_profile'>
        {user ? 
          <button className={activeProfileBtn ? 'nav_btn_active' : 'nav_btn'} onClick={(e) => {navigate('/user/profile'), handleProfileBtn(e)}}><HiOutlineUser/></button> : 
          <button className={activeLoginBtn ? 'nav_btn_active' : 'nav_btn'} onClick={(e) => {handleLoginForm(e), handleLoginBtn(e)}}><FiUnlock/></button>}
        </div>
      </div>
      <nav>
        <div className='nav-icons-container'>
            <Link to='/'><button className={activeHomeBtn ? 'nav_btn_active' : 'nav_btn'} onClick={(e) => handleHomeBtn(e)}><FiHome/></button></Link>
            <Link to='/watchlist'><button className={activeUserWatchlistBtn ? 'nav_btn_active' : 'nav_btn'}  onClick={(e) => handleUserWatchlistBtn(e)}><CgUserList/></button></Link>
        
            <button className={activeSearchBtn ? 'nav_btn_active' : 'nav_btn'} onClick={(e) => {handleSearchStyle(e), handleSearchBtn(e)}}><VscSearch /></button>

            {user ? 
              <Link to='/user/watchlist'><button onClick={(e) => {window.scrollTo(0, 0), handleWatchlistBtn(e)}} className={activeWatchlistBtn ? 'nav_btn_active' : 'nav_btn'} ><IoGlassesOutline/></button></Link> : null}
            {user ? 
              <button className='nav_btn' onClick={() => {logout()}} ><MdOutlineLogout/></button> : null}
        </div>
    </nav>
    </div>
    
  )
}
