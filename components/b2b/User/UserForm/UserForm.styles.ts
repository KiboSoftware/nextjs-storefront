import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const userFormStyles = makeStyles((theme: Theme) => ({
  kiboSwitchGridStyle: {
    paddingTop: '16px !important',
    paddingLeft: '2px !important',
    [theme.breakpoints.up('md')]: {
      paddingTop: '50px !important',
    },
  },
  textBoxGridStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0 !important',
    [theme.breakpoints.up('xs')]: {
      paddingTop: '6px !important',
    },
  },

  formContainerStyle: { display: 'flex', width: '100%' },
  gridContainerStyle: { marginTop: '5px', marginLeft: 0, width: '100%' },
  actionButtonStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 3,
    mb: 2,
  }
}))

export default userFormStyles
