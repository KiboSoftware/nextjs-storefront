import theme from '@/styles/theme'

export const AccountHierarchyStyles = {
  expandCollapseButtonBox: {
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'flex-end' },
    marginTop: { xs: '-5px', md: '-50px' },
    marginBottom: { xs: '10px', md: '20px' },
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
