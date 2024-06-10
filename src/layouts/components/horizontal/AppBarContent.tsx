// ** MUI Imports
import Box from '@mui/material/Box';

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext';

// ** Components
// import Autocomplete from 'src/layouts/components/Autocomplete'

import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown';

import { TelegramLoginButton } from '../login-telegram/TelegramLoginButton';

// import NotificationDropdown, {
//   NotificationsType
// } from 'src/@core/layouts/components/shared-components/NotificationDropdown';


// ** Hook Import
import { BusAiButton } from 'src/@core/components/button/BusAiButton';
import { useAuth } from 'src/hooks/useAuth';

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
}

// const notifications: NotificationsType[] = [
//   {
//     meta: 'Today',
//     avatarAlt: 'Flora',
//     title: 'Congratulation Flora! 🎉',
//     avatarImg: '/images/avatars/4.png',
//     subtitle: 'Won the monthly best seller badge'
//   },
//   {
//     meta: 'Yesterday',
//     avatarColor: 'primary',
//     subtitle: '5 hours ago',
//     avatarText: 'Robert Austin',
//     title: 'New user registered.'
//   },
//   {
//     meta: '11 Aug',
//     avatarAlt: 'message',
//     title: 'New message received 👋🏻',
//     avatarImg: '/images/avatars/5.png',
//     subtitle: 'You have 10 unread messages'
//   },
//   {
//     meta: '25 May',
//     title: 'Paypal',
//     avatarAlt: 'paypal',
//     subtitle: 'Received Payment',
//     avatarImg: '/images/misc/paypal.png'
//   },
//   {
//     meta: '19 Mar',
//     avatarAlt: 'order',
//     title: 'Received Order 📦',
//     avatarImg: '/images/avatars/3.png',
//     subtitle: 'New order received from John'
//   },
//   {
//     meta: '27 Dec',
//     avatarAlt: 'chart',
//     subtitle: '25 hrs ago',
//     avatarImg: '/images/misc/chart.png',
//     title: 'Finance report has been generated'
//   }
// ]

// const shortcuts: ShortcutsType[] = [
//   {
//     title: 'Calendar',
//     url: '/apps/calendar',
//     icon: 'tabler:calendar',
//     subtitle: 'Appointments'
//   },
//   {
//     title: 'Invoice App',
//     url: '/apps/invoice/list',
//     icon: 'tabler:file-invoice',
//     subtitle: 'Manage Accounts'
//   },
//   {
//     title: 'User App',
//     icon: 'tabler:users',
//     url: '/apps/user/list',
//     subtitle: 'Manage Users'
//   },
//   {
//     url: '/apps/roles',
//     icon: 'tabler:lock',
//     subtitle: 'Permissions',
//     title: 'Role Management'
//   },
//   {
//     subtitle: 'CRM',
//     title: 'Dashboard',
//     url: '/dashboards/crm',
//     icon: 'tabler:device-analytics'
//   },
//   {
//     title: 'Settings',
//     icon: 'tabler:settings',
//     subtitle: 'Account Settings',
//     url: '/pages/account-settings/account'
//   },
//   {
//     icon: 'tabler:help',
//     title: 'Help Center',
//     url: '/pages/help-center',
//     subtitle: 'FAQs & Articles'
//   },
//   {
//     title: 'Dialogs',
//     icon: 'tabler:square',
//     subtitle: 'Useful Popups',
//     url: '/pages/dialog-examples'
//   }
// ]

const AppBarContent = (props: Props) => {
  // ** Props
  // const { hidden, settings, saveSettings } = props
  const { settings, saveSettings } = props
  const hide = true;

  // ** Hook
  const auth = useAuth()
  const onAuth = (ctx: any) => {
    console.log("ctx", ctx);
  };

  console.log(auth)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <BusAiButton backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'}>Swap Points</BusAiButton>
      {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
      {!hide && <LanguageDropdown settings={settings} saveSettings={saveSettings} />}
      {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      {auth.user && (
        <>
          {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
          {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
          <UserDropdown settings={settings} />
        </>
      )}
      {!auth.user && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TelegramLoginButton
          botName={process.env.NEXT_PUBLIC_BOT_NAME}
          cornerRadius="8"
          className="tg-login-button"
          dataOnAuth={onAuth}

          // dataAuthUrl={'/auth/telelgram'}
          requestAccess={'write'}
          usePic={true}
        />
      </Box>}

    </Box>
  )
}

export default AppBarContent
