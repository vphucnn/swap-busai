// ** MUI Imports
import Box from '@mui/material/Box'

// ** Icon Imports

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import { Icon } from '@iconify/react'
import { IconButton } from '@mui/material'
import { BusAiButton } from 'src/@core/components/button/BusAiButton'
import BusAiLogo from 'src/@core/components/logo/BusAiLogo'
import { useAuth } from 'src/hooks/useAuth'
import { TelegramLoginButton } from '../login-telegram/TelegramLoginButton'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}


const AppBarContent = (props: Props) => {
  // ** Props
  const { settings, toggleNavVisibility } = props
  const onAuth = (ctx: any) => {
    console.log(ctx);
  };

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>


        <BusAiLogo height={40} width={'fit-content'} />

        {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        <BusAiButton size={'small'} backgroundColor={'#FF66C8'} borderBottom={'4px #CC0083 solid'} onClick={() => {
          window.open(process.env.NEXT_PUBLIC_LINK_SWAP_POINT, '_blank');
        }}>Swap Points</BusAiButton>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!auth.user && <TelegramLoginButton
            botName={process.env.NEXT_PUBLIC_BOT_NAME}
            cornerRadius="8"
            className="tg-login-button"
            dataOnAuth={onAuth}
            buttonSize={'medium'}

            // dataAuthUrl={'/auth/telelgram'}
            requestAccess={'write'}
            usePic={false}
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
      {!settings.navHidden ? (
        <IconButton color='inherit' sx={{}} onClick={toggleNavVisibility}>
          <Icon fontSize='1.5rem' icon='tabler:menu-2' />
        </IconButton>
      ) : null}
    </Box>
  )
}

export default AppBarContent
