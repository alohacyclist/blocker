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

  const  [active1hBtn, setActive1hBtn] = useState(false)
  const  [active1dBtn, setActive1dBtn] = useState(true)
  const [active7dBtn, setActive7dBtn] = useState(false)
  const [active14dBtn, setActive14dBtn] = useState(false)
  const [active30dBtn, setActive30dBtn] = useState(false)
  const [active200dBtn, setActive200dBtn] = useState(false)
  const [activeUsdBtn, setActiveUsdBtn] = useState(false)
  const [activeEurBtn, setActiveEurBtn] = useState(false)
  const [activeJpyBtn, setActiveJpyBtn] = useState(false)
  const [active1yBtn, setActive1yBtn]  = useState(false)
  

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
        setActive1dBtn(false),
        setActive7dBtn(false),
        setActive14dBtn(false),
        setActive30dBtn(false),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(true),
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
        setActive1dBtn(true),
        setActive7dBtn(false),
        setActive14dBtn(false),
        setActive30dBtn(false),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(false),
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
        setActive1dBtn(false),
        setActive7dBtn(true),
        setActive14dBtn(false),
        setActive30dBtn(false),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(false),
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
        setActive1dBtn(false),
        setActive7dBtn(false),
        setActive14dBtn(true),
        setActive30dBtn(false),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(false),
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
        setActive1dBtn(false),
        setActive7dBtn(false),
        setActive14dBtn(false),
        setActive30dBtn(true),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(false),
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
        setActive1dBtn(false),
        setActive7dBtn(false),
        setActive14dBtn(false),
        setActive30dBtn(false),
        setActive200dBtn(true),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(false),
        setActive1hBtn(false),
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
        setActive1dBtn(false),
        setActive7dBtn(false),
        setActive14dBtn(false),
        setActive30dBtn(false),
        setActive200dBtn(false),
        setActiveUsdBtn(false),
        setActiveEurBtn(false),
        setActiveJpyBtn(false),
        setActive1yBtn(true),
        setActive1hBtn(false),
        console.log('1y')
        break;
      default:
        setPercentage24h(true),
        setActive1dBtn(true)
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
            <button  className={active1yBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => {handleTimePricePercentage(e, '1y'), setActive1yBtn(true)}}>1y</button>
            <button  className={active1hBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '1h')}>1h</button>
            <button  className={active1dBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '1d')}>24h</button>
            <button  className={active7dBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '7d')}>7d</button>
            <button  className={active14dBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '14d')}>14d</button>
            <button  className={active30dBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '30d')}>30d</button>
            <button  className={active200dBtn ? styles.select_btn_active : styles.select_btn} onClick={(e) => handleTimePricePercentage(e, '200d')}>200d</button>

            <button className={activeUsdBtn ? 'select_btn_active' : 'select_btn'} onClick={() => setCurrency('usd')}>USD</button>
            <button className={activeEurBtn ? 'select_btn_active' : 'select_btn'} onClick={() => setCurrency('eur')}>EUR</button>
            <button className={activeJpyBtn ? 'select_btn_active' : 'select_btn'}onClick={() => setCurrency('jpy')}>YEN</button>
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
