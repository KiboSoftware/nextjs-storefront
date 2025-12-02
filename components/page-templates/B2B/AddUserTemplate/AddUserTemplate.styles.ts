import { Theme } from '@mui/material'

export const addUserTemplateStyles = {
  container: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  mobileHeader: {
    mb: 2,
    display: 'flex',
    gap: 1,
  },
  mobileTitle: {
    mt: 1,
  },
  desktopHeader: {
    mb: 2,
  },
  desktopTitle: {
    mt: 2,
  },
  desktopActionButtons: {
    display: 'flex',
    gap: 2,
    justifyContent: 'flex-end',
    mb: 2,
  },
  actionButton: {
    minWidth: 120,
  },
  contentPaper: (theme: Theme) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }),
  mobileActionButtons: {
    display: 'flex',
    gap: 2,
    flexDirection: 'column-reverse',
    mt: 3,
    mb: 2,
    px: 3,
    pb: 3,
  },
  backButtonLink: (theme: Theme) => ({
    typography: 'body2',
    textDecoration: 'none',
    color: theme.palette.grey[600],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.grey[900],
    },
  }),
} as const