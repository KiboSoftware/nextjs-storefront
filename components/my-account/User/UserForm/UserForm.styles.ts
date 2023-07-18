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
    paddingTop: '64px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0 !important',
    [theme.breakpoints.up('xs')]: {
      paddingTop: '6px !important',
    },
  },
}))

export default userFormStyles
