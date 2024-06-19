export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UserDataType {
  role?: string | undefined;
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  telegramId: number;
  verified: boolean;
  lang: string;
  isDeleted: boolean;
  point: number;
  createdAt: string; // Date string in ISO 8601 format (e.g., "2024-06-10T09:51:51.600Z")
  updatedAt: string; // Date string in ISO 8601 format (e.g., "2024-06-10T09:51:51.600Z")
  checkProfile: {
    isBusAiGroupMember: boolean;
    isBusAiChannelMember: boolean;
    status: boolean;
    taskOfDay: number;
    config: {
      _id: string;
      key: string;
      __v: number;
      pointPreShare: number;
      busAiChannel: string;
      busAiGroup: string;
      busAiChannelId: string;
      busAiGroupId: string;
      maxTaskPerDay: number;
    };
  };
}

// export type UserDataType = {
//   id: number
//   role: string
//   email?: string
//   firstName?: string
//   lastName?: string
//   username?: string
//   password?: string
//   avatar?: string
//   fullName: string
//   point: number
// }

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  loginTelegram: (data: any, errorCallback?: ErrCallbackType) => void
  updateProfile: () => void
  loginTelegramCustom: () => void


}
