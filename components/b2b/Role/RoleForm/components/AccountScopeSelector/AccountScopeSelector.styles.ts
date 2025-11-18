import { Theme } from '@mui/material/styles'

export const accountScopeSelectorStyles = {
  container: {
    mt: 3,
  },
  sectionTitle: {
    mb: 1,
    fontWeight: 500,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  formControlLabelNoMargin: {
    mr: 0,
  },
  infoIcon: (theme: Theme) => ({
    ml: 1,
    fontSize: 16,
    color: theme.palette.text.secondary,
  }),
  checkboxContainer: {
    pl: 4,
  },
}
