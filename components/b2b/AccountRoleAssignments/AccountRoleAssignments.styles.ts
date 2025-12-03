import { Theme } from '@mui/material'

export const accountRoleAssignmentsStyles = {
  container: {
    width: '100%',
    mt: 3,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  title: {
    fontWeight: 600,
  },
  buttonGroup: {
    display: 'flex',
    gap: 1,
  },
  searchField: {
    mb: 2,
  },
  accordionSummaryContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    pr: 2,
  },
  accountName: {
    fontWeight: 600,
  },
  noRolesBox: {
    display: 'flex',
    justifyContent: 'center',
    p: 3,
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)',
    },
    gap: 1,
    mb: 2,
  },
  rolesGridNoMargin: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)',
    },
    gap: 1,
  },
  styledAccordion: (theme: Theme) => ({
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: 'none',
    marginBottom: theme.spacing(2),
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: `0 0 ${theme.spacing(2)} 0`,
    },
  }),
  styledAccordionSummary: (theme: Theme) => ({
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    minHeight: '56px',
    '&.Mui-expanded': {
      minHeight: '56px',
    },
    '& .MuiAccordionSummary-content': {
      margin: theme.spacing(1.5, 0),
      '&.Mui-expanded': {
        margin: theme.spacing(1.5, 0),
      },
    },
  }),
  roleChip: (theme: Theme, selected?: boolean) => ({
    width: '100%',
    justifyContent: 'center',
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
    color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[300]}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
    },
    '& .MuiChip-label': {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
  }),
  sectionTitle: (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: theme.palette.grey[700],
  }),
} as const
