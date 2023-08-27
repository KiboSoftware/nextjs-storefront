import theme from '@/styles/theme'

export const accountHierarchyTemplateStyles = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
    // paddingBottom: '30px'
  },
  accountHierarchyTextBox: {
    margin: { xs: 'auto' },
  },
  accountHierarchyText: {
    paddingTop: { xs: 0, md: '30px' },
    paddingRight: { xs: '35px' },
  },
  buttonGroupGridStyle: {
    display: { xs: 'column', md: 'flex' },
    justifyContent: 'space-between',
    marginTop: 3,
    marginBottom: 2,
  },
  expandCollapseButtonStyle: {
    color: theme.palette.grey[900],
    textDecoration: 'underline',
    fontSize: '1rem',
  },
}
