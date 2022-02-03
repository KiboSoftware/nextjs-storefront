import { createTheme } from '@mui/material/styles'
import { red, green, purple } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
