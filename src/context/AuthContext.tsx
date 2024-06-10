// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import API from 'src/api'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginTelegram: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const profile = window.localStorage.getItem(authConfig.userData)!
      if (storedToken && profile) {
        setLoading(true)
        setUser({...JSON.parse(profile)})
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLoginTelegram = async (data: any, errorCallback?: ErrCallbackType) => {
    try {
      const response = await API.loginTelegram(data)
      console.log("response", response.data.data)
      setUser({ ...response.data.data.profile })
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.accessToken)
      window.localStorage.setItem(authConfig.userData, JSON.stringify(response.data.data.profile))
    } catch (error: any) {
      console.error(error);
      toast.error("Login error");
      if (errorCallback) errorCallback(error);
    } finally {

    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.userData)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/generate-character-panda')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    loginTelegram: handleLoginTelegram,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
