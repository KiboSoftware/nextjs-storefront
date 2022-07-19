import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const grey = {
  900: '#2B2B2B',
  // Fill Form Label Text, information text
  700: '#494949',
  // Home Page background
  600: '#7C7C7C',
  // Thin borders, placeholder text
  500: '#C7C7C7',
  // Header Accent Color, page separator bar
  300: '#EAEAEA',
  // Order Summary Background
  100: '#F7F7F7',
  // Secondary Button (cancel button)
  50: '#FAFAFA',
}

export const purple = {
  // Home Page color
  500: '#A12E87',
}

// Create a base theme instance and define the basic design options
let theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '1.75rem', // 28px
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.5rem', // 24px
      },
    },
    h2: {
      fontSize: '1.5rem', // 24px
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.25rem', // 20px
      },
    },
    h3: {
      fontSize: '1.25rem', // 20px
      '@media (max-width:600px)': {
        fontSize: '1rem', // 16px
      },
    },
    h4: {
      fontSize: '1rem', // 16px
    },
    h5: {
      fontSize: '0.875rem', // 14px
    },

    subtitle1: {
      fontSize: '1.125rem', // 18px
    },
    subtitle2: {
      fontSize: '1rem', // 16px
    },
    body1: {
      fontSize: '1rem', // 16px
    },
    body2: {
      fontSize: '0.875rem', // 14px
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
      primary: grey[900],
      secondary: grey[600],
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
    purple: { ...purple },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',

          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          backgroundColor: grey[50],
          borderColor: grey[500],
          borderWidth: 1,
          borderStyle: 'solid',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: grey[300],
          },
        },
        containedInherit: {
          backgroundColor: '#000',
          borderWidth: 1,
          borderStyle: 'solid',
          boxShadow: 'none',
          color: '#fff',
          '&:hover': {
            backgroundColor: grey[900],
          },
        },
      },
    },
  },
})
// compose theme (place theme options that depend on the base theme here)
theme = createTheme(theme)
export default responsiveFontSizes(theme)
