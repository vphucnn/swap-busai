// ** React Imports
import { Dispatch, ReactElement, Ref, SetStateAction, forwardRef, useState } from 'react'

// ** MUI Imports
import { Button, Card, CardActions, CardContent, Collapse, Link, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, styled } from '@mui/system'

const Img = styled('img')(({ theme }) => ({
  maxWidth: "100%",

  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5)
  }
}))

// ** Icon Imports


interface Props {
  image: string|null,
  imageShare: string|null,
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})



const DialogShowPanda = ({ image, imageShare, show, setShow }: Props) => {
  // ** States
  const [showShare, setShowShare] = useState<boolean>(false)

  return (
    <Dialog
      fullWidth
      open={show}
      scroll='body'
      maxWidth='lg'
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
          <Img src={image || ''} alt="Girl in a jacket" width="400" />
        </Box>
        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px', maxWidth: '100%', margin: 'auto' }}>
          <Typography variant="h2" sx={{ fontWeight: '700' }}>
            Panda Lezen II
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: '700' }}>
                Type:
              </Typography>
              <Typography variant="body1" >
                S
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: '700' }}>
                Reward:
              </Typography>
              <Typography variant="body1" >
                220
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '2rem', gap: '2rem', justifyContent: 'center' }}>
          <Button variant="contained" color='info' onClick={() => {
            setShow(false)
          }}>Re Generate</Button>
          <Button variant="contained" onClick={() => {
            setShowShare(true)
          }}>Ok</Button>
        </Box >
        {showShare &&
          <Collapse orientation="horizontal" in={showShare}>
            <Card sx={{ maxWidth: '100%', width: '400px', margin: 'auto', marginTop: '30px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Congratulations you have found panda S                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please share this joy with everyone
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Link href={`https://t.me/share/url?url=${imageShare}`}>
                    <Img src={'/images/logos/telegram.png'} alt="Girl in a jacket" width="40" height-="40" />
                  </Link>
                </Box>
              </CardContent>
              <CardActions>
                <Button sx={{ margin: 'auto' }} size="small" onClick={() => {
                  setShowShare(false)
                }}>Close</Button>
              </CardActions>
            </Card>
          </Collapse>
        }
      </DialogContent>
    </Dialog>
  )
}

export default DialogShowPanda
