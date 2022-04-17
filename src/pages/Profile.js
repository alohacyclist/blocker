import React, { useContext, useEffect, useState } from 'react'
import { client } from '../client'
import { CryptoContext } from '../context/cryptoContext'

export function Profile() {

    const { user, userWatchlist, currency, watchlist } = useContext(CryptoContext)

    // ADD WATCHLIST Component ! refactor

    const addNotes = async () => {
        console.log('click')
    }

    // remove coin from watchlist and render updated watchlist
    const handleDelete = async (e, coin) => {
        e.preventDefault()
        console.log(coin, 'removed')
        const data = {id: coin}
        const config = { headers: {Authorization: localStorage.getItem('token')} }
        await client.post(`/watchlist/${userWatchlist.id._id}/coin`, data, config)
        await watchlist(user._id)
    }

    // load watchlist upon loading profile page
    useEffect(() => {
        watchlist(user?._id)
    }, [])

    return (
        <div>
            <div style={{border:'1px solid blue'}}>
                <h2>Profile</h2>
                {user?.email}
                {user?.firstName}
                {user?.lastName}
            </div>

            {userWatchlist?.coins?.map(coin => {
                return(
                <div key={coin._id} style={{border:'1px solid blue'}} >
                    <div>
                        <p>{coin.name}</p>
                        <p>Date added:{coin.addedAt}</p>
                        <p>Price when added:{coin.priceWhenAdded}{currency}</p>
                        <p>Notes:{coin.notes}</p>
                    </div>
                    <button onClick={ (e) => handleDelete(e, coin._id) } >Remove Coin</button>
                </div>)
                
            })}
        </div>
    )
}
