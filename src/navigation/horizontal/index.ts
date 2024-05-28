// ** Type import
import type { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    // {
    //   title: 'Login',
    //   icon: 'tabler:mail',
    //   path: '/login'
    // },
    {
      title: 'Connect Wallet',
      icon: 'tabler:mail',
      path: '/connect-wallet'
    },
    {
      title: 'Generate character panda',
      icon: 'tabler:mail',
      path: '/generate-character-panda'
    },
  ]
}

export default navigation
