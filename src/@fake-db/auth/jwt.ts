// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

// ** Types
import { UserDataType } from 'src/context/types'

const users: UserDataType[] = [
  {
    _id: "1",
    role: 'admin',
    point: 1,
    avatar: '',
    firstName: '',
    lastName: '',
    telegramId: 0,
    verified: false,
    lang: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    checkProfile: {
      isBusAiGroupMember: false,
      isBusAiChannelMember: false,
      status: false,
      taskOfDay: 0,
      config: {
        _id: '',
        key: '',
        __v: 0,
        pointPreShare: 0,
        busAiChannel: '',
        busAiGroup: '',
        busAiChannelId: '',
        busAiGroupId: '',
        maxTaskPerDay: 0
      }
    }
  },
  {
    _id: "2",
    role: 'client',
    point: 1,
    avatar: '',
    firstName: '',
    lastName: '',
    telegramId: 0,
    verified: false,
    lang: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    checkProfile: {
      isBusAiGroupMember: false,
      isBusAiChannelMember: false,
      status: false,
      taskOfDay: 0,
      config: {
        _id: '',
        key: '',
        __v: 0,
        pointPreShare: 0,
        busAiChannel: '',
        busAiGroup: '',
        busAiChannelId: '',
        busAiGroupId: '',
        maxTaskPerDay: 0
      }
    }
  }
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

type ResponseType = [number, { [key: string]: any }]

mock.onPost('/jwt/login').reply(() => {

  let error = {
    email: ['Something went wrong']
  }

  const user = users[0]

  if (user) {
    const accessToken = jwt.sign({ id: user._id }, jwtConfig.secret as string, { expiresIn: jwtConfig.expirationTime })

    const response = {
      accessToken,
      userData: { ...user, password: undefined }
    }

    return [200, response]
  } else {
    error = {
      email: ['email or Password is Invalid']
    }

    return [400, { error }]
  }
})

mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const isEmailAlreadyInUse = false
    const isUsernameAlreadyInUse = false
    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }

    if (!error.username && !error.email) {

      const userData: UserDataType = {
        _id: "0",
        avatar: '',
        firstName: '',
        lastName: '',
        telegramId: 0,
        verified: false,
        lang: '',
        isDeleted: false,
        point: 0,
        createdAt: '',
        updatedAt: '',
        checkProfile: {
          isBusAiGroupMember: false,
          isBusAiChannelMember: false,
          status: false,
          taskOfDay: 0,
          config: {
            _id: '',
            key: '',
            __v: 0,
            pointPreShare: 0,
            busAiChannel: '',
            busAiGroup: '',
            busAiChannelId: '',
            busAiGroupId: '',
            maxTaskPerDay: 0
          }
        }
      }

      users.push(userData)

      const accessToken = jwt.sign({ id: userData._id }, jwtConfig.secret as string)


      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})

mock.onGet('/auth/me').reply(config => {
  // ** Get token from header
  // @ts-ignore
  const token = config.headers.Authorization as string

  // ** Default response
  let response: ResponseType = [200, {}]

  // ** Checks if the token is valid or expired
  jwt.verify(token, jwtConfig.secret as string, (err, decoded) => {
    // ** If token is expired
    if (err) {
      // ** If onTokenExpiration === 'logout' then send 401 error
      if (defaultAuthConfig.onTokenExpiration === 'logout') {
        // ** 401 response will logout user from AuthContext file
        response = [401, { error: { error: 'Invalid User' } }]
      } else {
        // ** If onTokenExpiration === 'refreshToken' then generate the new token
        const oldTokenDecoded = jwt.decode(token, { complete: true })

        // ** Get user id from old token
        // @ts-ignore
        const { id: userId } = oldTokenDecoded.payload

        // ** Get user that matches id in token
        const user = users.find(u => u._id === userId)

        // ** Sign a new token
        const accessToken = jwt.sign({ id: userId }, jwtConfig.secret as string, {
          expiresIn: jwtConfig.expirationTime
        })

        // ** Set new token in localStorage
        window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)

        const obj = { userData: { ...user, password: undefined } }

        // ** return 200 with user data
        response = [200, obj]
      }
    } else {
      // ** If token is valid do nothing
      // @ts-ignore
      const userId = decoded.id

      // ** Get user that matches id in token
      const userData = JSON.parse(JSON.stringify(users.find((u: UserDataType) => u._id === userId)))

      delete userData.password

      // ** return 200 with user data
      response = [200, { userData }]
    }
  })

  return response
})
