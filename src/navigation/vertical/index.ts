// ** Type import
import type { VerticalNavItemsType } from 'src/@core/layouts/types'


const navigation = (): VerticalNavItemsType => {
  return [
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
