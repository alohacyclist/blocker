import React, { useContext, useEffect } from 'react'
import {UserWatchlist} from './UserWatchlist'
import { CryptoContext } from '../../context/cryptoContext'
import styles from './Watchlist.module.css'

export function Watchlists() {

  const {watchlists, getWatchlists} = useContext(CryptoContext)
  
  useEffect(() => {
    getWatchlists()
  }, [])

  return (
    <div className={styles.watchlists_wrapper}>
      <h2>Watchlists</h2>
        <div>
          {watchlists.map(watchlist => { return ( <UserWatchlist watchlist={watchlist} key={watchlist._id}/> )})}
        </div>
    </div>
  )
}
