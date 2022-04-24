import React, { useContext, useState } from 'react'
import { CryptoContext } from '../context/cryptoContext'
import styles from './Pages.module.css'
import {AiOutlineLike} from 'react-icons/ai'

export function Profile() {

    const { user, watchlist, userWatchlist, editProfile, navigate, verify } = useContext(CryptoContext)

    const [like, setLike] = useState('Likes')
    const [edit, setEdit] = useState(false)

    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState(user?.password)
    /* const [passwordRepeat, setPasswordRepeat] = useState('') */

    const handleSubmit = (e) => {
        e.preventDefault()
        editProfile(email, password)
        setEdit(false)
        navigate('/user/profile')
    }

    useState(async () => {
        verify()
        await watchlist(user?._id)
        userWatchlist?.votes?.length === 1 ? setLike('Like') : setLike('Likes')
    }, [edit])

    return (
        <div>
            {edit ? 
            <form  className={styles.profile_container} onSubmit={handleSubmit}>
                <label>{email}</label>
                <input value={email} type='email' onChange={(e) => {setEmail(e.target.value)}}></input>
                <input type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter new password' ></input>
                <button>Save</button>
            </form> : 
            <div className={styles.profile_container}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <h2 style={{color: 'rgba(235, 248, 232, 1)'}}>Welcome, {user?.firstName}</h2>
                    <div style={{backgroundColor: 'rgba(59, 213, 253, 1)', alignSelf: 'center', padding: '3px', border: '2px solid #f79000'}} ><AiOutlineLike/> {userWatchlist?.votes.length} {like}</div>
                </div>
                <p style={{backgroundColor: 'rgba(226, 41, 120, 1)', border: '2px solid #f79000', padding: '3px' }} >{user?.email}</p>
                <div>
                    <p style={{color: 'rgba(235, 248, 232, 1)',backgroundColor: 'rgba(42, 26, 71, 1)', border: '2px solid #f79000', padding: '3px' }}>{user?.firstName} {user?.lastName}</p>
                </div>                
                <button style={{borderRadius: '1px'}} onClick={() => setEdit(true)}>Edit Profile</button>
            </div>
            }
            
        </div>
    )
}