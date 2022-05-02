import React, { useContext, useEffect, useState } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import coingecko from '../../api/coingecko'
import styles from '../Coins/Coin.module.css'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

export function CoinChart() {

  const {currency, isLoading, setIsLoading, coinSelect} = useContext(CryptoContext)

  const [chartData, setChartData] = useState([])
  const [chartInfo, setChartInfo] = useState()

  const getChartData = async (coinSelect) => {
    const day = await coingecko.get(`/coins/${coinSelect}/market_chart`, {
      params: {
        vs_currency: `${currency}`,
        days: '1'
      }
  })
  setChartData(day.data.prices)
}

const getChartInfo = async (coinSelect) => {
  const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&ids=${coinSelect}`)
  console.log('chartInfo:',data)
  setChartInfo(data[0])
}

useEffect(() => {
  getChartData(coinSelect)
  getChartInfo(coinSelect)
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
  maintainAspectRatio: true,
  responsive: true,
  lineHeightAnnotation: {
    always: false,
    hover: true,
    lineWeight: .2
  },
}

  return (
        <div>

          <div className={styles.top_chart_info_stack} >
            <img style={{width: '25px', height: '25px'}} src={chartInfo?.image} alt={chartInfo?.image} />
            <h2>{chartInfo?.symbol.toUpperCase()}</h2>
          </div>
          
          <div className={styles.main_chart}>
            {<Line data={formatedData} options={options} />}
          </div>
            
        </div> 
      
  )
}
