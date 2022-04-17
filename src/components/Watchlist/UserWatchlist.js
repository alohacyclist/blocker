import React, { useContext, useEffect, useState } from 'react'
import styles from './Watchlist.module.css'
import { client } from '../../client'
import coingecko from '../../api/coingecko'
import { CryptoContext } from '../../context/cryptoContext'

export function UserWatchlist({watchlist}) {

  const {currency, setIsLoading, user } = useContext(CryptoContext)

  const [select, setSelect] = useState(false)
  const [coins, setCoins] = useState([])
  const [coinPriceNow, setCoinPriceNow] = useState([])

  let coinCopy = coins

  const handleWatchlistSelect = async (e, watchlist_id) => {
    e.preventDefault()

    const url = `/watchlist/${watchlist_id}`
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    const {data} = await client.get(url, config)

    setSelect(true)
    setCoins(data.coins)
  }

  const fetchCoinPrices = async () => {
      setIsLoading(true)
      const newCoins = coins.map(async (coin) => {
        const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&ids=${coin.name}`) /* for testing: &ids=bitcoin%2C%20ethereum */
        coin.current_price = data[0]
        return coin
      })
      await Promise.all(newCoins).then((result) => {setCoinPriceNow(result)
      })
      setIsLoading(false)
  }

  const getCoinCopy = () => {
  coinCopy = JSON.parse(JSON.stringify(coins))
    coinCopy.forEach((coin, index) => {
      /* console.log(coinPriceNow) */
      coin.current_price = coinPriceNow[index].current_price.current_price
    })
  }

  useEffect(() => {fetchCoinPrices()}, [coins])
  useEffect(() => {getCoinCopy()}, [coinPriceNow])

  const [watchlistLike, setWatchlistLike] = useState([])

  const handleLike = async (watchlist_id) => {
    console.log(watchlist_id)
    const url = `/watchlist/${watchlist_id}`
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    await client.post(url, config)
    console.log(data)
  }

  return (
    <div className={styles.watchlist_list} onClick={(e) => handleWatchlistSelect(e, watchlist.id._id)}>
      {<div>
        {select ? (
        <div>
          <div>{watchlist?.id?.firstName}'s Watchlist</div>
            {coinCopy.map(coin => {return (
              <div key={coin._id} >
              
                {console.log(coin)}
                <div>{coin.name}</div>
                <div>Price when added:{coin.priceWhenAdded}</div>
                <div>Price now: {coin.current_price?.current_price}</div>
              </div>
              )})}

          <button onClick={(e) => handleLike(watchlist._id)}>Like</button>

        </div>) : (
        <div>
          <div>{watchlist?.id?.firstName}</div>
          <div>{watchlist?.id?.votes?.length}</div>
        </div>
      )}
      </div>}
    </div>
   
  )
}