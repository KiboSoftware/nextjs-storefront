export const ProductCardStyles = {
  main: {
    width: '100%',
    '& a': {
      textDecoration: 'none',
    },
  },
  cardRoot: {
    position: 'relative',
    display: { xs: 'block', sm: 'flex' },
    padding: '0.625rem',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'text.secondary',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 2px 16px 4px rgb(11 32 61 / 7%)',
      borderColor: 'primary.main',
      borderWidth: 1,
    },
  },
  quickView: {
    opacity: 0,
    width: '100%',
    marginTop: '1 rem',
  },
  cardMedia: {
    width: {
      xs: '100%',
      sm: '25%',
    },
    position: 'relative',
    zIndex: 1,
    mt: 3,
  },
  shopNow: { width: '100%', marginTop: '3.063rem' },
  hoveredButtons: {
    display: ' flex',
    alignItems: 'center',
    padding: 0.5,
    whiteSpace: 'nowrap',
    backgroundColor: '#E2E5EA',
    '&:hover': {
      backgroundColor: 'primary.main',
      '& > *': {
        color: '#fff',
      },
    },
  },
  quickViewButton: {
    backgroundColor: 'primary.main',
    color: 'common.white',
    px: 2,
  },
  rating: {
    '& .MuiRating-iconFilled': {
      color: '#e79667',
    },
  },
}
