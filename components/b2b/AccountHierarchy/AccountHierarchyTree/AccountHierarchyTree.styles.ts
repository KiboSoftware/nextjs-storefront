import theme from '@/styles/theme'

export const AccountHierarchyStyles = {
  expandCollapseButtonBox: {
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'flex-end' },
  },
  expandCollapseButtonStyle: {
    color: theme.palette.grey[900],
    textDecoration: 'underline',
    fontSize: '1rem',
    '&:hover': {
      color: theme.palette.grey[900],
      textDecoration: 'underline',
      backgroundColor: 'transparent',
    },
  },
}
