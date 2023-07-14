export const B2BTemplateStyle = {
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
  myAccountChildren: {
    paddingLeft: { md: 0, xs: '1rem' },
    paddingRight: { md: 0, xs: '1rem' },
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
  },
  accordionSummary: {
    padding: { md: 0 },
  },
  expandedIcon: {
    color: 'text.primary',
  },
  orderHistory: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center',
  },
  accountCircleBox: {
    display: { xs: 'flex' },
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'start' },
    alignItems: 'center',
    margin: { xs: '1rem', md: '2rem 0' },
  },
  accountCircle: {
    fontSize: {
      md: '2.7rem',
      xs: '3.3rem',
    },
  },
  backButton: {
    typography: 'body2',
    textDecoration: 'none',
    color: 'text.primary',
    display: { xs: 'flex', md: 'none' },
    alignItems: 'center',
    padding: '1rem 0.5rem',
    cursor: 'pointer',
  },
  divider: {
    height: '1.188rem',
    borderColor: 'transparent',
  },
}
