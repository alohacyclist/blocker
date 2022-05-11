import { createContext, useState, useEffect } from 'react'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'
import styles from '../components/Coins/Coin.module.css'


export const CryptoContext = createContext();

export const CryptoContextProvider = props => {
    
  const [currency, setCurrency] = useState('usd')
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [user, setUser] = useState()
  const [watchlists, setWatchlists] = useState([])
  
  const [userWatchlist, setUserWatchlist] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [searchPlaceholder, setSearchPlaceholder] = useState('')
  const [searchStyle, setSearchStyle] = useState(styles.coin_search)
  const [displayMessage, setDisplayMessage ] = useState('')

  // handle show of login and signup modals
  const [openLogin, setLogin] = useState(false)
  const [openSignup, setOpenSignup] = useState(false)
  const [openForgotPassword, setOpenForgotPassword] = useState(false)
  
  // set prominent chart default to bitcoin
  const [coinSelect, setCoinSelect] = useState('bitcoin')
    
  const navigate = useNavigate()
  
  const saveToken = (token) => {
      localStorage.setItem('token', `Bearer ${token}`);
      }

  const signup = async (firstName, lastName, email, password) => {
      try {
          const response = await client.post('/auth/signup', {firstName, lastName, email, password})
          response.data.status ? 
          // if user email in db and user status is true (verified)
          setDisplayMessage('A user with this Email already exists.') : 
          setDisplayMessage('Please check your Email to verify your account. Check your junk mail as well. Enjoy Blocker!')
          setTimeout(()=>{setDisplayMessage('')}, 3500)
      } catch (err) {
      console.error(err)
      setDisplayMessage('Sorry, we could not sign you up. Try again or come back later.')
      setTimeout(()=>{setDisplayMessage('')}, 3500)
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
          setDisplayMessage('Enjoy Blocker.')
        } catch (err) {
          setDisplayMessage('Email or password incorrect. Make sure to verify your account after signing up. Click the link in the email we sent you. Check junk mail, too.')
          console.error(err)
        }
    }

    const googleLogin = async (user, token) => {
      try {
        saveToken(token)
        setUser(user)
      } catch (err) {
        console.error(err)
      }
  }

    const verify = async () => {
        try {
            const response = await client.post('/auth/verify')
            setUser(response?.data?.user)
            await watchlist(response?.data?.user._id)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
      user ? null :
        verify()
    }, [])

    useEffect(()=> {
      setSymbolForCurrency()
    }, [currency])


  const watchlist = async (userId) => {
    try {
        const response = await client.get(`/watchlist/${userId}`)
        setUserWatchlist(response?.data)
    }  catch (err) {
        console.log(err)
    }
  }

  const getUserWatchlist = async (userId) => {
    try {
      const response = await client.get(`user/watchlist/${userId}`)
      setUserWatchlist(response?.data)
    }  catch (err){
        console.log(err)
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
  }

  const handleSelect = (e, coin) => {
      e.preventDefault()
      setCoinSelect(coin)
    }

    // calculate coinPerformance
    const coinPerformance = (wasPrice, isPrice) => {
      const calculateDifference = isPrice - wasPrice
      const calculatePerformance = calculateDifference / wasPrice * 100
      return calculatePerformance.toFixed(3)
    }

    // set currency symbol
    const setSymbolForCurrency = () => {
      if(currency === 'usd') setCurrencySymbol('$')
      if(currency === 'eur') setCurrencySymbol('€')
      if(currency === 'jpy') setCurrencySymbol('¥')
    }

    const values = {
        user, signup, login, currency, setCurrency, userWatchlist, setUser, 
        handleSelect, coinSelect, setCoinSelect, setCurrency, watchlists, 
        setWatchlists, watchlist, isLoading, setIsLoading, setUserWatchlist, 
        navigate, openLogin, googleLogin, currencySymbol, setCurrencySymbol, 
        searchPlaceholder, setSearchPlaceholder, setLogin, openSignup, 
        setOpenSignup, getWatchlists, displayMessage, setDisplayMessage,
        coinPerformance, getUserWatchlist, searchStyle, setSearchStyle, 
        verify, openForgotPassword, setOpenForgotPassword
    }

    return (
        <CryptoContext.Provider value={values}>
            {props.children}
        </CryptoContext.Provider>
    )
}
