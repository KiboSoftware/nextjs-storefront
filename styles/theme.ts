import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const grey = {
  // Fill Form Label Text, information text
  600: '#7C7C7',
  // Thin borders, placeholder text
  500: '#C7C7C7',
  // Header Accent Color, page separator bar
  300: '#EAEAEA',
  // Order Summary Background
  100: '#F7F7F7',
  // Secondary Button (cancel button)
  50: '#FAFAFA',
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#2ea195',
    },
    secondary: {
      main: '#c0e3df',
    },
    text: {
      primary: '#2B2B2B',
    },
    success: {
      main: '#17514b',
    },
    warning: {
      main: '#f8ca24',
    },
    error: {
      main: '#e42d00',
    },
    grey: { ...grey },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          backgroundColor: '#fafafa',
        },
      },
    },
  },
})

export default responsiveFontSizes(theme)
