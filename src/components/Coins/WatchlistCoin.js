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
    const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&ids=${coin.name}`)
    setCoinSymbol(data[0].symbol)
    setCurrentPrice(data[0].current_price)
}

useEffect(() => getCurrentCoinPrice(), [])

// remove coin from watchlist and render updated watchlist
const handleDelete = async (e, coin) => {
  e.preventDefault()
  const data = {id: coin}
  const config = { headers: {Authorization: localStorage.getItem('token')} }
  await client.post(`/watchlist/${user._id}/coin`, data, config)
  await watchlist(user._id)
}

  return (
        <div className={styles.watchlist_coin_element}>
            <div className={styles.watchlist_coin_element_header} >
              <h2>{coinSymbol.toUpperCase()}</h2>
              <button className={styles.remove_coin_btn} onClick={(e) => handleDelete(e, coin._id)} ><RiDeleteBinLine/></button>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p>Added on {new Date(coin.addedAt).toLocaleDateString()}</p>
              <p>@ {coin.priceWhenAdded} {currency}</p>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p>Current Price</p>
              <p>{currentPrice} {currency}</p>
            </div>
            <div className={styles.watchlist_coin_element_info}>
              <p>Coin Performance</p>
              <p>{coinPerformance(coin.priceWhenAdded, currentPrice)}%</p>
            </div>
        </div>
  )
}