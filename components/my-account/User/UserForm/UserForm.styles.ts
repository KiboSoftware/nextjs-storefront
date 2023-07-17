import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const userFormStyles = makeStyles((theme: Theme) => ({
  buttonGridStyle: {
    paddingTop: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '0 !important',
    [theme.breakpoints.up('xs')]: {
      paddingTop: '10px !important',
      flexDirection: 'column-reverse',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  kiboSwitch: {
    paddingTop: '18px !important',
    paddingLeft: '2px !important',
    [theme.breakpoints.up('md')]: {
      paddingTop: '50px !important',
    },
  },
  buttonGridDialogStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '0 !important',
    paddingTop: '10px !important',
    flexDirection: 'column-reverse',
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
  cancelButtonInDesktopEditMode: {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.grey[600]}`,
    marginRight: '8px',
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
      border: `1px solid ${theme.palette.grey[700]}`,
    },
  },
  cancelButtonInDesktop: {
    marginRight: '8px',
  },
  cancelButtonInMobile: {
    marginTop: '10px',
    width: '100%',
  },
  submitButtonInDesktopEditMode: {
    height: '37px',
  },
  submitButtonInDesktop: {
    height: '37px',
    width: '140px',
  },
  submitButtonInMobile: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  circularProgress: {
    color: theme.palette.secondary.light,
    height: '25px',
    width: '25px',
  },
}))

export default userFormStyles
