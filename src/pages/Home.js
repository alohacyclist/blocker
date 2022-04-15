import React from 'react'
import { CoinList, Signup, Login, Watchlist } from '../components'

export function Home() {

  return (
    
    <div>
        <Signup />
        <Login />
        <CoinList />
    </div>
  )
}
