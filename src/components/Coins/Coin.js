import React, { useState, useEffect, useContext } from 'react'
import styles from './Coin.module.css'
import { client } from '../../client'
import { CryptoContext } from '../../context/cryptoContext'
import coingecko from '../../api/coingecko'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import {CgPlayListAdd, CgPlayListCheck} from 'react-icons/cg'


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

export function Coin({coin}) {

  const {handleSelect, currency, navigate, user} = useContext(CryptoContext)
  const [chartData, setChartData] = useState([])

// get coin chart data
const getChartData = async () => {
    const day = await coingecko.get(`/coins/${coin.id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1'
      }
  })
  setChartData(day.data.prices)
}

useEffect(() => {
  getChartData()
}, [])

const labels = chartData?.map(dataset =>  new Date(dataset[0]).toLocaleDateString())

const formatedData = {
  labels,
  datasets: [{
    label: `${currency}`,
    data: chartData?.map(dataset => dataset[1])
    }]
  }

const options = {
  borderColor: 'rgba(59, 213, 253, 1)',
  pointRadius: 0,
  tension: .1,
  fill: false,
  legend: {
    display: false
  },
  backgroundColor: 'transparent',
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false
      }
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false
      }
    }
  },
  maintainAspectRatio: false,
  lineHeightAnnotation: {
    always: false,
    hover: true,
    lineWeight: .2
  },
  animation: {
    duration: 2000
}}

  const addCoin = async (e) => {
    e.preventDefault()
    console.log(coin.name, 'added to watchlist')
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
    navigate('/user/watchlist')
  }

  // check database for coins in users watchlist
  // when the coin element is rendered, check if this coin is in the users watchlist
  const [renderAddCoin, setRenderAddCoin] = useState()

  const checkUserWatchlist = async () => {
    try {
      const {data} = await client.post(`/watchlist/${coin.id}/check`)
      setRenderAddCoin(data)
      console.log('check:', data)
    } catch {
      console.log('could not get your watchlist')
    }
  }

  useEffect(() => {
    user ?  checkUserWatchlist() : null
      }, [])
  
  return (
    <div className={styles.coin_element} onClick={(e) => {handleSelect(e, coin.id), window.scrollTo(0, 0)} } >
      <div>
        <img src={coin.image} alt={coin.image} style={{width: '2rem'}} />
        <p>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</p>
        <p>{coin.current_price} {currency}</p>
        <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
      </div>
      <div className={styles.chart}>
        {<Line data={formatedData} options={options} />}
      </div>
      
      <div className={styles.lastchild}>
        {user ? 
          renderAddCoin ? 
            <button className={styles.add_watchlist_btn} style={{pointerEvents: 'none'}}><CgPlayListCheck/></button> : 
            <button onClick={(e) => addCoin(e)} className={styles.add_watchlist_btn}><CgPlayListAdd/></button> :
            null}
      </div>
    </div>
  )
}
