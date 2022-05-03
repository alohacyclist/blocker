import React, { useContext, useState, useEffect } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import { Coin } from './Coin'
import coingecko from '../../api/coingecko'
import styles from './Coin.module.css'
import { CoinChart } from '../'

export function CoinList() {
  const {currency, setCurrency, isLoading, setIsLoading, searchStyle, searchPlaceholder} = useContext(CryptoContext)
  
  const [coinList, setCoinList] = useState([])
  const [coinSearch, setCoinSearch] = useState([])
  const [coinFilter, setCoinFilter] = useState([])
  const [timePricePercentage, setTimePricePercentage] = useState('24h')
  const [page, setPage] = useState(1)

  const [percentage1h, setPercentage1h] = useState(false)
  const [percentage24h, setPercentage24h] = useState(false)
  const [percentage7d, setPercentage7d] = useState(false)
  const [percentage14d, setPercentage14d] = useState(false)
  const [percentage30d, setPercentage30d] = useState(false)
  const [percentage200d, setPercentage200d] = useState(false)
  const [percentage1y, setPercentage1y] = useState(false)
  

  const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&per_page=20&page=${page.toString()}&price_change_percentage=${timePricePercentage}`) /* for testing: &ids=bitcoin%2C%20cardano */
      setCoinList(data)
      setCoinFilter(data)
      setIsLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [page, currency])  

  useEffect(() => {
    let results = coinFilter.filter(coin => coin.name.toLowerCase().includes(coinSearch.toLowerCase()) || coin.symbol.toLowerCase().includes(coinSearch.toLowerCase()))
    setCoinList(results)
  },[coinSearch])

  const handleTimePricePercentage = (e, time) => {
    e.preventDefault()
    setTimePricePercentage(time)
  }

  useEffect(() => {
    checkTimeValue(timePricePercentage)
    fetchCoins()
  }, [timePricePercentage])

  function checkTimeValue (timeValue) {
    switch( timeValue ) {
      case '1h':
        setPercentage1h(true)
        setPercentage24h(false),
        setPercentage7d(false),
        setPercentage14d(false),
        setPercentage30d(false),
        setPercentage200d(false),
        setPercentage1y(false),
        console.log('1h')
        break;
      case '1d':
        setPercentage24h(true),
        setPercentage1h(false)
        setPercentage7d(false),
        setPercentage14d(false),
        setPercentage30d(false),
        setPercentage200d(false),
        setPercentage1y(false),
        console.log('24h')
        break;
      case '7d':
        setPercentage7d(true),
        setPercentage24h(false),
        setPercentage1h(false)
        setPercentage14d(false),
        setPercentage30d(false),
        setPercentage200d(false),
        setPercentage1y(false),
        console.log('7d')
        break;
      case '14d':
        setPercentage14d(true),
        setPercentage24h(false),
        setPercentage1h(false),
        setPercentage7d(false),
        setPercentage30d(false),
        setPercentage200d(false),
        setPercentage1y(false),
        console.log('14d')
        break;
      case '30d':
        setPercentage30d(true)
        setPercentage24h(false),
        setPercentage1h(false),
        setPercentage7d(false),
        setPercentage14d(false),
        setPercentage200d(false),
        setPercentage1y(false),
        console.log('30d')
        break;
      case '200d':
        setPercentage200d(true),
        setPercentage7d(false),
        setPercentage30d(false)
        setPercentage24h(false),
        setPercentage1h(false)
        setPercentage14d(false),
        setPercentage1y(false),
        console.log('200d')
        break;
      case '1y':
        setPercentage1y(true),
        setPercentage200d(false),
        setPercentage7d(false),
        setPercentage30d(false)
        setPercentage24h(false),
        setPercentage1h(false)
        setPercentage14d(false),
        console.log('1y')
        break;
      default:
        setPercentage24h(true);
    }
    return;
  }

  const handleNextPage = (e, page) => {
    e.preventDefault()
    setPage(page+1)
  }

  const handleLastPage = (e, page) => {
    e.preventDefault()
    setPage(page-1)
  }

  return (
    <div>
      
      <div className={styles.chart_container}>   
        <div className={styles.select_btns_wrapper}>
          {/* <div className={styles.select_time_btn_container}> */}
            <button onClick={(e) => handleTimePricePercentage(e, '1h')}>1h</button>
            <button onClick={(e) => handleTimePricePercentage(e, '1d')}>24h</button>
            <button onClick={(e) => handleTimePricePercentage(e, '7d')}>7d</button>
            <button onClick={(e) => handleTimePricePercentage(e, '14d')}>14d</button>
            <button onClick={(e) => handleTimePricePercentage(e, '30d')}>30d</button>
            <button onClick={(e) => handleTimePricePercentage(e, '200d')}>200d</button>
            <button onClick={(e) => handleTimePricePercentage(e, '1y')}>1y</button>
          {/* </div>  */}
          {/* <div className={styles.select_currency_btn_container}> */}
            <button onClick={() => setCurrency('usd')}>USD</button>
            <button onClick={() => setCurrency('eur')}>EUR</button>
            <button onClick={() => setCurrency('jpy')}>YEN</button>
          {/* </div>   */}
        </div>   

        {<CoinChart />}

      </div>




      <div className={styles.coin_search_container} >
        <input className={searchStyle} value={coinSearch} onChange={(e) => setCoinSearch(e.target.value)} placeholder={searchPlaceholder} />
      </div>
      
      <div className={styles.coin_list}>
      {isLoading? 'Loading...' : null }

      {coinList.map((coin) => {return (<Coin key={coin.id} coin={coin}
        percentage1h={percentage1h}
        percentage24h={percentage24h}
        percentage7d={percentage7d}
        percentage14d={percentage14d}
        percentage30d={percentage30d}
        percentage200d={percentage200d}
        percentage1y={percentage1y}/>)} )}
        </div>

        {page != 1 ? 
          <div style={{display: 'flex', textAlign: 'center', justifyContent: 'space-between'}}>
            <button className={styles.show_more_btn} onClick={(e) => handleLastPage(e, page)}>Back</button>
            <button className={styles.show_more_btn} onClick={(e) => handleNextPage(e, page)}>Next</button>
          </div> :
          <div style={{display: 'flex', textAlign: 'center', justifyContent: 'flex-end'}}>
            <button className={styles.show_more_btn} onClick={(e) => handleNextPage(e, page)}>Next</button>
          </div>
          }
    </div>
  )
}
