import { createContext, useState, useEffect } from 'react'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'

export const CryptoContext = createContext();

export const CryptoContextProvider = props => {
    
    const [currency, setCurrency] = useState('usd')
    const [user, setUser] = useState(null)
    const [userWatchlist, setUserWatchlist] = useState(null)
    const [isLoading, setIsLoading] = useState(false)    

    const navigate = useNavigate()

    const saveToken = (token) => {
        localStorage.setItem('token', `Bearer ${token}`);
      }

    const signup = async (firstName, lastName, email, password) => {
        try {
            const response = await client.post('/auth/signup', {firstName, lastName, email, password})
            console.log(response.data)
        } catch {
          console.error(err)
        }
    }

    const login = async (email, password) => {
        try {
          const response = await client.post('/auth/login', {
            email,
            password,
          })
          saveToken(response.data.token)
          setUser(response.data.user)
          /* navigate('/user/profile') */
        } catch (err) {
          console.error(err)
        }
    }

    const watchlist = async (userId) => {
        try {
            const response = await client.get(`/watchlist/${userId}`)
            /* console.log(response.data) */
            setUserWatchlist(response?.data)
        }  catch {
            console.log('could not get user watchlist')
        }
    }

    const verify = async () => {
        try {
            const response = await client.get('/auth/verify')
            setUser(response?.data.user)
            console.log('user verified!')
            watchlist(response?.data.user._id)
            navigate('/') // CHANGE TO USER WATCHLIST/PROFILE
        } catch {
            console.log('user not verified!')
        }
    }

    useEffect(() => {
        verify()
    }, [])


    // handle show of login and signup modals
    const [openLogin, setLogin] = useState(false)
    const [openSignup, setOpenSignup] = useState(false)

    // set prominent chart default to bitcoin
    const [coinSelect, setCoinSelect] = useState('bitcoin')

    const handleSelect = (e, coin) => {
        e.preventDefault()
        setCoinSelect(coin)
        console.log(coin)

      }

    const values = {
        user, signup, login, currency, setCurrency, userWatchlist, setUser, handleSelect, coinSelect, setCoinSelect,
        watchlist, isLoading, setIsLoading, setUserWatchlist, navigate, openLogin, setLogin, openSignup, setOpenSignup
    }

    return (
        <CryptoContext.Provider value={values}>
            {props.children}
        </CryptoContext.Provider>
    )
}
