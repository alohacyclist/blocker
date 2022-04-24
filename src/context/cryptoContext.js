import { createContext, useState, useEffect } from 'react'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'
import styles from '../components/Coins/Coin.module.css'


export const CryptoContext = createContext();

export const CryptoContextProvider = props => {
    
    const [currency, setCurrency] = useState('usd')
    const [user, setUser] = useState()
    const [userWatchlist, setUserWatchlist] = useState()
    const [isLoading, setIsLoading] = useState(false)    

    const navigate = useNavigate()

    const saveToken = (token) => {
        localStorage.setItem('token', `Bearer ${token}`);
      }

    const signup = async (firstName, lastName, email, password) => {
        try {
            const response = await client.post('/auth/signup', {firstName, lastName, email, password})
            console.log('signup data:', response.data)
        } catch {
          console.error(err)
        }
    }

    const editProfile = async (email, password) => {
      try {
          const response = await client.post('/user/profile', {email, password})
          setUser(response.data)
          console.log('edit data:', response.data)
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
        } catch (err) {
          console.error(err)
        }
    }

    const verify = async () => {
        try {
            const response = await client.get('/auth/verify')
            setUser(response?.data?.user)
            console.log('user verified!')
            console.log('verify response user data:', response.data.user)
            await watchlist(response?.data?.user._id)
            navigate('/') // CHANGE TO USER WATCHLIST/PROFILE
        } catch {
            console.log('user not verified!')
        }
    }

    useEffect(() => {
        verify()
    }, [])

    const [watchlists, setWatchlists] = useState([])

    const watchlist = async (userId) => {
      try {
          const response = await client.get(`/watchlist/${userId}`)
          /* console.log('User Id passed to watchlist function:', userId)
          console.log('data received from watchlist function:', response.data) */
          setUserWatchlist(response?.data)
      }  catch {
          console.log('could not get the watchlist for this useree')
      }
  }

  const getUserWatchlist = async (userId) => {
    try {
        const response = await client.get(`user/watchlist/${userId}`)
        /* console.log('User Id passed to userWatchlist function:', userId)
        console.log('data received from userWatchlist function:', response.data) */
        setUserWatchlist(response?.data)
    }  catch {
        console.log('could not get your watchlist')
    }
  }

  const getWatchlists = async () => {
    const url = '/watchlist'
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
    const {data} = await client.get(url, config)
    setWatchlists(data)
    /* console.log('All Watchlists Data:', data) */
  }

  const [searchPlaceholder, setSearchPlaceholder] = useState('')
  const [searchStyle, setSearchStyle] = useState(styles.coin_search)
  
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

    // calculate coinPerformance
    const coinPerformance = (wasPrice, isPrice) => {
      const calculateDifference = isPrice - wasPrice
      const calculatePerformance = calculateDifference / wasPrice * 100
      return calculatePerformance.toFixed(3)
    }

    const values = {
        user, signup, login, currency, setCurrency, userWatchlist, setUser, handleSelect, coinSelect, setCoinSelect, 
        watchlists, setWatchlists, watchlist, isLoading, setIsLoading, setUserWatchlist, navigate, openLogin, 
        searchPlaceholder, setSearchPlaceholder, setLogin, openSignup, setOpenSignup, getWatchlists, 
        coinPerformance, getUserWatchlist, searchStyle, setSearchStyle, editProfile, verify
    }

    return (
        <CryptoContext.Provider value={values}>
            {props.children}
        </CryptoContext.Provider>
    )
}
