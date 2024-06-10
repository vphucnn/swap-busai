// ** MUI Imports
import Box from '@mui/material/Box'

// ** Icon Imports

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import BusAiLogo from 'src/@core/components/logo/BusAiLogo'
import { useAuth } from 'src/hooks/useAuth'
import { TelegramLoginButton } from '../login-telegram/TelegramLoginButton'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}


const AppBarContent = (props: Props) => {
  // ** Props
  const { settings, saveSettings, toggleNavVisibility } = props
  const onAuth = (ctx: any) => {
    console.log(ctx);
  };

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>

        {!settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}
        <BusAiLogo height={40} width={'fit-content'}/>

        {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {!auth.user && <TelegramLoginButton
          botName={process.env.NEXT_PUBLIC_BOT_NAME}
          cornerRadius="8"
          className="tg-login-button"
          dataOnAuth={onAuth}
          buttonSize={'medium'}

          // dataAuthUrl={'/auth/telelgram'}
          requestAccess={'write'}
          usePic={true}
        />}
      </Box>
        {auth.user && (
          <>
            {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
            {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
