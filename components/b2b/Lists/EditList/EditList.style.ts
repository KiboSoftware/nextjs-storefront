import { grey } from '@mui/material/colors'

const style = {
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
  listNameForm: {
    maxWidth: '360px',
    height: '36px',
    fontSize: ' 14px',
    padding: '8px 12px',
    background: '#FFF',
    border: `1px solid ${grey[400]}`,
    borderRadius: ' 4px',
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
