import React from 'react'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// TODO
// declare module '@mui/material/styles' {
//   interface TypographyVariants {
//     poster: React.CSSProperties
//   }

//   // allow configuration using `createTheme`
//   interface TypographyVariantsOptions {
//     poster?: React.CSSProperties
//   }
// }

// // Update the Typography's variant prop options
// declare module '@mui/material/Typography' {
//   interface TypographyPropsVariantOverrides {
//     poster: true
//     h3: false
//   }
// }

export const grey = {
  900: '#2B2B2B',
  // Fill Form Label Text, information text
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

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h3: {
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h4: {
      fontSize: '1rem',
    },
    h5: {
      fontSize: '0.875rem',
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
          backgroundColor: grey[50],
        },
      },
    },
  },
})

export default responsiveFontSizes(theme)
