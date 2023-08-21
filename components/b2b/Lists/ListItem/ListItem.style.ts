import { grey } from '@mui/material/colors'

const style = {
  buttons: {
    tableAction: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '19px',
      textAlign: 'center',
      textDecorationLine: 'underline',
      color: '#2b2b2b',
      minWidth: '0px',
    },
  },
  modal: {
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      bgcolor: '#FFF',
      boxShadow: '0px 0px 7px rgba(43, 43, 43, 0.5);',
      pt: 2,
      px: 4,
      pb: 3,
      padding: '0px',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${grey[300]}`,
      padding: '10px 30px',
    },
  },
}

export default style
