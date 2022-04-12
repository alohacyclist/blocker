import React, { useState } from 'react'
import styles from './Coin.module.css'
import { client } from '../../client'

export function Coin({coin}) {

  const [added, setAdded] = useState(false)

  const addCoin = async (e) => {
    e.preventDefault()

    const url = '/coin/watchlist'
    const data = {
      name: coin.id,
      priceWhenAdded: coin.current_price
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    await client.post(url, data, config)
    setAdded(true)
  }

  return (
    <div className={styles.coin_element}>
      <div>
        <p>{coin.id}</p>
        <p>{coin.price_change_percentage_24h}</p>
      </div>
      <div>
        <p>Chart</p>
      </div>
      <div>
        <p>{coin.current_price}</p>
      </div>
      <div className={styles.lastchild}>
      {added ? <p>Added</p> : <button onClick={(e) => addCoin(e)} className={styles.add_watchlist_btn} >+</button> }
      </div>
    </div>
  )
}
