import React from 'react'
import { CoinList, Signup, Login, ForgotPassword, SetNewPassword } from '../components'

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
