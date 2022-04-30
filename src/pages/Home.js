import React from 'react'
import { CoinList, Signup, Login, ForgotPassword } from '../components'

export function Home() {

  return (
    
    <div>
        <Signup />
        <Login />
        <ForgotPassword />
        <CoinList />
    </div>
  )
}
