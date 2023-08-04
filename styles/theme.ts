import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import type {} from '@mui/lab/themeAugmentation'
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    red?: PaletteColorOptions
    themePalette?: ColorPartial
  }
}

export const themePalette = {
  // theme blue
  100: '#2B2A4C',
  // theme red
  200: '#B31312',
  // theme light red
  300: '#EA906C',
  // theme grey
  400: '#EEE2DE',
  // deep red
  500: '#590908',
}

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

export const red = {
  900: '#bb2500',
  // wishlist color
  700: '#e13b0e',
  600: '#ef4214',
  500: '#fa4818',
  300: '#fc825e',
  100: '#fec9b9',
  50: '#fbe8e6',
}

const buttonStyleOverrides = {
  root: {
    textTransform: 'capitalize' as any,

    '&:hover': {
      boxShadow: 'none',
    },
  },
  containedPrimary: ({ ownerState, theme }: { ownerState: any; theme: any }) => ({
    ...(ownerState.disabled && {
      backgroundColor: `${theme.palette.primary.light} !important`,
      color: `${theme.palette.common.white} !important`,
    }),
  }),
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
      main: '#B31312',
      light: '#EA906C',
    },
    secondary: {
      main: '#EA906C',
    },
    text: {
      primary: grey[900],
      secondary: grey[600],
    },
    warning: {
      main: '#f8ca24',
    },
    error: {
      main: '#e42d00',
    },
    grey: { ...grey },
    red: { ...red },
    themePalette: { ...themePalette },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        ...buttonStyleOverrides,
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        ...buttonStyleOverrides,
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          zIndex: 2000,
        },
      },
    },
  },
})
// compose theme (place theme options that depend on the base theme here)
theme = createTheme(theme)
export default responsiveFontSizes(theme)
