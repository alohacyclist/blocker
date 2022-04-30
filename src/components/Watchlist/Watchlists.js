import React, { useContext, useEffect } from 'react'
import {UserWatchlist} from './UserWatchlist'
import { CryptoContext } from '../../context/cryptoContext'
import styles from './Watchlist.module.css'

export function Watchlists() {

  const {watchlists, getWatchlists, user, setLogin, navigate} = useContext(CryptoContext)
  
  useEffect(() => {
    getWatchlists()
  }, [])

  return (
    <div className={styles.watchlists_wrapper}>
      <h2>Watchlists</h2>
        <div>
        {!user && <div className={styles.watchlist_item}>
          <h3>You need to <a style={{color: 'rgba(59, 213, 253, 1)', cursor: 'pointer'}} onClick={() => {navigate('/'), setLogin(true)}}>login</a> to view and like watchlists.</h3>
          </div>}
          {watchlists.map(watchlist => { return ( <UserWatchlist watchlist={watchlist} key={watchlist._id}/> )})}
        </div>
    </div>
  )
}
