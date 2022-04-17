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

    // calculate performance
    const performance = (wasPrice, isPrice) => {
      const calculateDifference = isPrice - wasPrice
      const calculatePerformance = calculateDifference / (wasPrice * 100)
      return calculatePerformance.toFixed(3)
    }

    const values = {
        user, signup, login, currency, setCurrency, userWatchlist, setUser, handleSelect, coinSelect, setCoinSelect, 
        watchlists, setWatchlists, watchlist, isLoading, setIsLoading, setUserWatchlist, navigate, openLogin, 
        setLogin, openSignup, setOpenSignup, getWatchlists, performance
    }

    return (
        <CryptoContext.Provider value={values}>
            {props.children}
        </CryptoContext.Provider>
    )
}
