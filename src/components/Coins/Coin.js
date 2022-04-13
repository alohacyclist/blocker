import React, { useState, useContext, useEffect } from 'react'
import styles from './Coin.module.css'
import { client } from '../../client'
import { CryptoContext } from '../../context/cryptoContext'
import { CoinChart } from '../Charts/CoinChart'
import coingecko from '../../api/coingecko'


export function Coin({coin}) {

  const {handleSelect} = useContext(CryptoContext)

  const [added, setAdded] = useState(false)

  // add this coin to the users watchlist
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
    <div className={styles.coin_element} onClick={(e) => handleSelect(e, coin.id) } >
      <div>
        <p>{coin.id}</p>
        <p>{coin.price_change_percentage_24h}</p>
      </div>
      <div>
        {/* {<Line />} */}
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

  // CHART

/*   const [coinChartData, setCoinChartData] = useState({})

  // convert api data for chart
  const formatData = data => {
    return data.map(el => {
      return {
        time: el[0],
        price: el[1].toFixed(2),
      }
    })
  } */
  
  // get coin chart data
/*   const getChartData = async () => {
    const day = await coingecko.get(`/coins/${coin.id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1'
      }
    })
    
    setCoinChartData(formatData(day.data.prices)) */


    /* Promise.all([
      coingecko.get(`/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '1'
        }
      }),
       coingecko.get(`/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '7'
        }
      }),
      coingecko.get(`/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '30'
        }
      }),
      coingecko.get(`/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '365'
        }
      })
      ])  */

    /* setCoinChartData({
      day: formatData(day.data.prices),
      week: formatData(week.data.prices),
      month: formatData(month.data.prices),
      year: formatData(year.data.prices)
    }) 

  } */

  //request historical chart data from api when component loads
/*   useEffect(() => {
    getChartData() 
  }, []) */