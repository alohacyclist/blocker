import React, { useEffect, useState } from 'react'
import { client } from '../../client'
import styles from './Watchlist.module.css'

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

  const [watchlistId, setWatchlistId] = useState('')

  const handleWatchlistSelect = async (e, watchlist_id) => {
    e.preventDefault()
    console.log(watchlist_id)
    const url = `/watchlist/${watchlist_id}`
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    const {data} = await client.get(url, config)
    console.log(data)
  }

  return (
    <>
      <div>Watchlist</div>
      {watchlists.map(watchlist => {
        return (
        <div className={styles.watchlist_list} onClick={(e)=>handleWatchlistSelect(e, watchlist.id._id)}>
          <p>User: {watchlist.id.firstName}</p>
          <p>Coins in Watchlist: {watchlist.coins.length}</p>
          <p>Votes: {watchlist.votes.length}</p>
        </div>
        )
      })}
    </>
  )
}
