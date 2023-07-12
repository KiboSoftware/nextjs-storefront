import { Theme } from '@mui/material/styles'

// MUI
export const FacetStyle = {
  accordion: {
    ':before': {
      backgroundColor: 'transparent',
    },
    boxShadow: 0,
    borderRadius: 0,
  },

  accordionDetails: {
    pt: 0,
    p: { md: 0 },
  },
  button: {
    my: 1,
    textTransform: 'capitalize',
    color: 'text.primary',
    fontSize: (theme: Theme) => theme.typography.body2,
  },
}
