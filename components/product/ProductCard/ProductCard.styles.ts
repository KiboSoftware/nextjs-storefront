export const ProductCardStyles = {
  main: {
    '& a': {
      textDecoration: 'none',
    },
    cursor: 'pointer',
    maxWidth: 260,
  },
  cardRoot: {
    position: 'relative',
    padding: '0.625rem',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    width: 260,
    maxWidth: 260,
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover .quick-actions': {
      opacity: 1,
    },
    '&:hover': {
      boxShadow: '0 2px 16px 4px rgb(11 32 61 / 7%)',
      '.quick-view': {
        opacity: 1,
      },
    },
  },
  quickView: {
    opacity: 0,
    width: '100%',
    marginTop: '1 rem',
  },
  cardMedia: {
    width: '100%',
    position: 'relative',
    maxWidth: 240,
  },
  shopNow: { width: '100%', marginTop: '3.063rem' },
  hoveredButtons: {
    display: ' flex',
    alignItems: 'center',
    padding: 0.5,
    whiteSpace: 'nowrap',
    backgroundColor: 'grey.500',
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
