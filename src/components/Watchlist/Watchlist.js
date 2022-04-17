import React, { useContext, useEffect, useState } from 'react'
import { client } from '../../client'
import styles from './Watchlist.module.css'
import {UserWatchlist} from './UserWatchlist'
import { CryptoContext } from '../../context/cryptoContext'

export function Watchlist() {

  const {watchlists, setWatchlists, getWatchlists} = useContext(CryptoContext)
  
  useEffect(() => {
    getWatchlists()
  }, [])

  return (
    <>
      <div>Watchlists</div>

        <div>
          {watchlists.map(watchlist => { return ( <UserWatchlist watchlist={watchlist} key={watchlist._id}/> )})}
        </div>
      
    </>
  )
}
