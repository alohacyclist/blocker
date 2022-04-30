import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
import { client } from '../../client'
import { CryptoContext } from '../../context/cryptoContext';
import { AiOutlineGoogle } from 'react-icons/ai'
import './Form.css'

export function GgleLogin() {

  const { setLogin, googleLogin } = useContext(CryptoContext)

  const googleAuth = async (firstName, lastName, email) => {
    try {
        const response = await client.post('/auth/google-login', {firstName, lastName, email})
        console.log('google-login-response:', response)
        setLogin(false)
        googleLogin(response.data.user, response.data.token)        
    } catch {
      console.log('google auth failed.')
    }
  }

  const onSuccessResponse = (res) => {
    console.log('Google-Login successful:', res.profileObj)
    googleAuth(res.profileObj.givenName, res.profileObj.familyName, res.profileObj.email)
  }

  const onFailureResponse = (res) => {
    console.log('Login failed:', res);
  }

    return (
        <>
        <GoogleLogin
          clientId={'642086605944-4p08m6ultb75lptjrlfocf39srlvea7a.apps.googleusercontent.com'}
          render={renderProps => (
            <button  className='form-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}><h3><AiOutlineGoogle /></h3></button>
          )}
          buttonText="Login with Google"
          onSuccess={onSuccessResponse}
          onFailure={onFailureResponse}
          cookiePolicy="single_host_origin"
        />
        </>
      );
}
