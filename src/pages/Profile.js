import React, { useContext, useState } from 'react'
import { CryptoContext } from '../context/cryptoContext'
import styles from './Pages.module.css'
import {AiOutlineLike} from 'react-icons/ai'
import { client } from '../client'

export function Profile() {

    const { user, watchlist, userWatchlist, editProfile, navigate, verify, displayMessage, setDisplayMessage } = useContext(CryptoContext)

    const [like, setLike] = useState('Likes')
    const [edit, setEdit] = useState(false)

    const [email, setEmail] = useState(user?.email)
    const [errorsMail, setErrorsMail] = useState(null)
    const [emailValidated, setEmailValidated] = useState(false)

    const [password, setPassword] = useState(user?.password)
    const [errorsPassword, setErrorsPassword] = useState(null)
    const [passwordValidated, setPasswordValidated] = useState(false)

    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [errorsRepeatPassword, setErrorsRepeatPassword] = useState(null)
    const [passwordRepeatValidated, setPasswordRepeatValidated] = useState(false)

    const [showMessage, setShowMessage] = useState(false)
    const [deleteAccountConfirmation, setDeleteAccountConfirmation] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        editProfile(email, password)
        setEdit(false)
        setDisplayMessage('Changes saved.')
        setShowMessage(true)
        navigate('/user/profile')
        setTimeout(()=>{setShowMessage(false)}, 2000)
    }

    const handleDeleteUserClick = (e) => {
        e.preventDefault()
        setDisplayMessage('Are you sure you want to delete your account?')
        setDeleteAccountConfirmation(true)
    }

    const handleDeleteUser = async () => {
        deleteToken()
        navigate('/')
        const response = await client.post('/auth/delete', {user})
        console.log(response.data)
        setDisplayMessage('')
        setDeleteAccountConfirmation(false)
        console.log('delete complete')
    }

    const deleteToken = () => {
        localStorage.removeItem('token')
      }

    useState(async () => {
        verify()
        await watchlist(user?._id)
        userWatchlist?.votes?.length === 1 ? setLike('Like') : setLike('Likes')
    }, [edit])

    // email validation
    const checkMail = (mail) => {
        if(!mail) {
            setErrorsMail('REQUIRED')
        } else if(!/\S+@\S+\.\S+/.test(mail)) {
            setErrorsMail('Please provide valid E-Mail.')
        } else {
            setErrorsMail(null)
            setEmailValidated(true)
        }
        return
    }

    // password validation
    const checkPassword = (password) => {
      if (!password) {
            setErrorsPassword('REQUIRED')
        } else if (password.length < 6) {
            setErrorsPassword('Minimum password length is 6 characters')
        } else {
            setErrorsPassword(null)
            setPasswordValidated(true)
        }
        return
    }
  
    // passwordRepeat validation
    const checkPasswordRepeat = (passwordRepeat, password) => {
        if (!passwordRepeat) {
            setErrorsRepeatPassword('REQUIRED')
        } else if (passwordRepeat !== password) {
            setErrorsRepeatPassword('Passwords do not match!')
        } else {
            setErrorsRepeatPassword(null)
            setPasswordRepeatValidated(true)
        }
        return
    }

    return (
        <div>
            {edit ? 
            <form  className={styles.profile_container} onSubmit={(e) => handleSubmit(e)}>
                <p className={styles.form_errors} >Current: {email}</p>
                <label>Set new E-Mail:</label>
                <input value={email} type='email' onChange={(e) => {setEmail(e.target.value), checkMail(e.target.value)}}></input>
                {errorsMail && <small className={styles.form_errors}>E-Mail: {errorsMail}</small>}

                <label>Set new Password:</label>
                <input type='password' onChange={(e) => {setPassword(e.target.value), checkPassword(e.target.value)}} placeholder='Enter new password' ></input>
                {errorsPassword && <small className={styles.form_errors}>Password: {errorsPassword}</small>}

                <input type='password'  onChange={(e) => {setPasswordRepeat(e.target.value), checkPasswordRepeat(e.target.value, password)}} placeholder='Repeat new password' ></input>
                {errorsRepeatPassword && <small className={styles.form_errors}>Repeat Password: {errorsRepeatPassword}</small>}

                {emailValidated && passwordValidated && passwordRepeatValidated && <button className={styles.profile_btn}>Save</button>}
                
            </form> : 
            showMessage ? <div className={styles.profile_container_msg}><p>{displayMessage}</p></div> :

            <div className={styles.profile_container}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <h2 style={{color: 'rgba(235, 248, 232, 1)'}}>Welcome, {user?.firstName}</h2>
                    <div style={{backgroundColor: 'rgba(59, 213, 253, 1)', alignSelf: 'center', padding: '3px', border: '2px solid #f79000'}} ><AiOutlineLike/> {userWatchlist?.votes.length} {like}</div>
                </div>
                <p style={{backgroundColor: 'rgba(226, 41, 120, 1)', border: '2px solid #f79000', padding: '3px' }} >{user?.email}</p>
                <div>
                    <p style={{color: 'rgba(235, 248, 232, 1)',backgroundColor: 'rgba(42, 26, 71, 1)', border: '2px solid #f79000', padding: '3px' }}>{user?.firstName} {user?.lastName}</p>
                </div>     
                <div>
                    <button className={styles.profile_btn} onClick={() => setEdit(true)}>Edit Profile</button>
                    <button className={styles.profile_btn} onClick={(e) => handleDeleteUserClick(e)}>Delete Account</button>
                </div>           
                {deleteAccountConfirmation && 
                <div className={styles.profile_container_msg}>
                    <p>{displayMessage}</p>
                    <button className={styles.profile_btn} onClick={() => handleDeleteUser()}>DELETE</button>
                </div>}
            </div>
            }
            
        </div>
    )
}