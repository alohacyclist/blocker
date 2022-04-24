import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../context/cryptoContext'
import styles from '../components/Coins/Coin.module.css'
import {AiOutlineLike} from 'react-icons/ai'
import { WatchlistCoin } from '../components/Coins/WatchlistCoin'


export function Watchlist() {

    const {user, userWatchlist, getUserWatchlist} = useContext(CryptoContext)

    // get userwatchlist on page load
    useEffect(() => {
        getUserWatchlist(user?._id)
    }, [])

  return (
      <div className={styles.watchlist_coin_container_wrapper}>
        <p  className={styles.likes_container}>{userWatchlist?.votes?.length} <AiOutlineLike/></p>
        <div className={styles.watchlist_coin_container} >
          {userWatchlist?.coins?.map(coin => <WatchlistCoin key={coin._id} coin={coin}/>) }
        </div>
      </div>
      

  )
}
