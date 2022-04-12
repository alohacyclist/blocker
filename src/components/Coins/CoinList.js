import React, { useContext, useState, useEffect } from 'react'
import { CryptoContext } from '../../context/cryptoContext'
import { Coin } from './Coin'
import coingecko from '../../api/coingecko'
import styles from './Coin.module.css'


export function CoinList() {
  const {currency, setCurrency, isLoading, setIsLoading} = useContext(CryptoContext)
  
  const [coinList, setCoinList] = useState([])
  const [coinSearch, setCoinSearch] = useState([])
  const [coinFilter, setCoinFilter] = useState([])

  const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await coingecko.get(`coins/markets/?vs_currency=${currency}`)
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
      <input className={styles.coin_search} value={coinSearch} onChange={(e) => setCoinSearch(e.target.value)} placeholder='Search for cryptocurrency...' />
      {isLoading? 'Loading...' : null }
      {coinList.map((coin) => {return (<Coin key={coin.id} coin={coin}/>)} )}
    </div>
  )
}
