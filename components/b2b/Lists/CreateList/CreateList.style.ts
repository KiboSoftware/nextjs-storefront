import { grey } from '@mui/material/colors'

const style = {
  input: {
    maxWidth: '360px',
    height: '32px',
    fontSize: '14px',
    padding: '8px 12px',
    border: `1px solid ${grey[400]}`,
    borderRadius: '4px',
  },
  listSection: {
    display: 'flex',
    fontSize: '12px',
  },
  heading: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameForm: {
    margin: '10px auto',
    maxWidth: '360px',
    marginLeft: 0,
  },
  mobileSaveWindow: {
    width: '100%',
    position: 'fixed',
    left: '50%',
    bottom: '0px',
    transform: 'translateX(-50%)',
    padding: '15px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  addAllItemsToCartButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  addAllItemsToCartLink: {
    color: 'grey.900',
    textDecorationColor: `${grey[900]}`,
  },
}

export default style
