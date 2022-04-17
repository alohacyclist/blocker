import React, { useEffect, useState } from 'react'
import { client } from '../../client'
import styles from './Watchlist.module.css'
import {UserWatchlist} from './UserWatchlist'

export function Watchlist() {

  const [watchlists, setWatchlists] = useState([])

  const getWatchlists = async () => {
    const url = '/watchlist'
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    const {data} = await client.get(url, config)
    setWatchlists(data)
    console.log(data)
  }

  useEffect(() => {
    getWatchlists()
  }, [])

  return (
    <>
      <div>Watchlists</div>

        <div>
          {watchlists.map(watchlist => { return ( <UserWatchlist watchlist={watchlist} key={watchlist._id}/> )})}
        </div>
      
    </>
  )
}
