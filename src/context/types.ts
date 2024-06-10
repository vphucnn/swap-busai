export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email?: string
  firstName?: string
  lastName?: string
  username?: string
  password?: string
  avatar?: string
  fullName: string
  point: number
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  loginTelegram: (data: any, errorCallback?: ErrCallbackType) => void
}
