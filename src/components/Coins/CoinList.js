import React, { useContext, useState, useEffect } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import { Coin } from './Coin'
import coingecko from '../../api/coingecko'
import styles from './Coin.module.css'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)


export function CoinList() {
  const {currency, setCurrency, isLoading, setIsLoading, coinSelect} = useContext(CryptoContext)
  
  const [coinList, setCoinList] = useState([])
  const [coinSearch, setCoinSearch] = useState([])
  const [coinFilter, setCoinFilter] = useState([])

  const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&ids=bitcoin%2C%20ethereum`) /* for testing: &ids=bitcoin%2C%20ethereum */
      setCoinList(data)
      setCoinFilter(data)
      setIsLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  useEffect(() => {
    let results = coinFilter.filter(coin => coin.name.toLowerCase().includes(coinSearch.toLowerCase()) || coin.symbol.toLowerCase().includes(coinSearch.toLowerCase()))
    setCoinList(results)
  },[coinSearch])

  const [chartData, setChartData] = useState([])


  const getChartData = async (coinSelect) => {
    const day = await coingecko.get(`/coins/${coinSelect}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1'
      }
  })
  setChartData(day.data.prices)
}

useEffect(() => {
  getChartData(coinSelect)
}, [coinSelect])

const labels = chartData?.map(dataset =>  new Date(dataset[0]).toLocaleDateString())

const formatedData = {
  labels,
  datasets: [{
    label: 'usd',
    data: chartData?.map(dataset => dataset[1])
    }]
  }

const options = {
  borderColor: 'rgba(59, 213, 253, 1)',
  pointRadius: 0,
  tension: .1,
  fill: true,
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
}

  return (
    <div>

      <div> {<Line data={formatedData} options={options} />}</div> 

      <input className={styles.coin_search} value={coinSearch} onChange={(e) => setCoinSearch(e.target.value)} placeholder='Search for cryptocurrency...' />
      {isLoading? 'Loading...' : null }
      {coinList.map((coin) => {return (<Coin key={coin.id} coin={coin} /* onClick={() => handleChart(e, coin.id)} */ />)} )}
    </div>
  )
}
