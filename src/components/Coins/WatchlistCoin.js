import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import coingecko from '../../api/coingecko'
import styles from './Coin.module.css'
import {RiDeleteBinLine} from 'react-icons/ri'
import { client } from '../../client'


export function WatchlistCoin({coin}) {

const {currency, coinPerformance, user, watchlist} = useContext(CryptoContext)

const [currentPrice, setCurrentPrice] = useState(0)
const [coinSymbol, setCoinSymbol] = useState('')

const getCurrentCoinPrice = async() => {
    const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&ids=${coin.name}`) /* for testing: &ids=bitcoin%2C%20ethereum */
    console.log(data[0].current_price)
    setCoinSymbol(data[0].symbol)
    setCurrentPrice(data[0].current_price)
}

useEffect(() => getCurrentCoinPrice(), [])

// remove coin from watchlist and render updated watchlist
const handleDelete = async (e, coin) => {
  e.preventDefault()
  console.log(coin, 'removed')
  const data = {id: coin}
  const config = { headers: {Authorization: localStorage.getItem('token')} }
  await client.post(`/watchlist/${user._id}/coin`, data, config)
  await watchlist(user._id)
}

  return (
        <div className={styles.watchlist_coin_element}>
            <div className={styles.watchlist_coin_element_header}>
              <h2>{coinSymbol.toUpperCase()}</h2>
              <button className={styles.remove_coin_btn} onClick={ (e) => handleDelete(e, coin._id) } ><RiDeleteBinLine/></button>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p /* style={{borderBottom: 'none', backgroundColor: 'rgba(5, 0, 30, 1)'}} */>Added on {new Date(coin.addedAt).toLocaleDateString()}</p>
              <p /* style={{color: 'rgba(5, 0, 31, 1)', backgroundColor: '#f79000'}} */>@ {coin.priceWhenAdded} {currency}</p>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p /* style={{borderBottom: 'none', backgroundColor: 'rgba(5, 0, 30, 1)'}} */>Current Price</p>
              <p /* style={{color: 'rgba(5, 0, 31, 1)', backgroundColor: '#f79000'}} */>{currentPrice} {currency}</p>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p /* style={{borderBottom: 'none', backgroundColor: 'rgba(5, 0, 30, 1)'}} */>Coin Performance</p>
              <p /* style={{color: 'rgba(5, 0, 31, 1)', backgroundColor: '#f79000'}} */>{coinPerformance(coin.priceWhenAdded, currentPrice)}%</p>
            </div>
        </div>
  )
}