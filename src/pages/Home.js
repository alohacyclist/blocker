import React, { useContext, useState } from 'react'
import { CoinList, CoinDetails, CoinChart, Signup, Login } from '../components'
import { CryptoContext } from '../context/cryptoContext'

export function Home() {

  return (
    
    <div>
        <Signup />
        <Login />
        <CoinChart />
        <CoinList />
    </div>
  )
}
