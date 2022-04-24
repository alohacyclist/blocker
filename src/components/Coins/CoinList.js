import React, { useContext, useState, useEffect } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import { Coin } from './Coin'
import coingecko from '../../api/coingecko'
import styles from './Coin.module.css'
import { CoinChart } from '../'

export function CoinList() {
  const {currency, isLoading, setIsLoading, searchStyle, searchPlaceholder} = useContext(CryptoContext)
  
  const [coinList, setCoinList] = useState([])
  const [coinSearch, setCoinSearch] = useState([])
  const [coinFilter, setCoinFilter] = useState([])

  const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}&per_page=20&page=1`) /* for testing: &ids=bitcoin%2C%20cardano */
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

  return (
    <div>
      
      <div className={styles.top_chart} > {<CoinChart />}</div>

      <div className={styles.coin_search_container} >
        <input className={searchStyle} value={coinSearch} onChange={(e) => setCoinSearch(e.target.value)} placeholder={searchPlaceholder} />
      </div>
      
      {isLoading? 'Loading...' : null }
      {coinList.map((coin) => {return (<Coin key={coin.id} coin={coin} />)} )}
    </div>
  )
}
