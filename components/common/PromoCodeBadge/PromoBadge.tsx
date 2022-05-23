/** @format */

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Stack } from '@mui/material'

const styles = {
  boxStyle: {
    display: 'inline-block',
    mr: '0.5rem',
    mt: '0.5rem',
    px: '0.5rem',
    backgroundColor: '#DCDCDC',
  },
}

const PromoBadge = ({ promoCode }: any) => {
  return (
    <>
      <Box component="div" sx={styles.boxStyle}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ textAlign: 'left' }}>{promoCode}</Typography>
          <CancelOutlinedIcon
            sx={{
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          />
        </Stack>
      </Box>
    </>
  )
}
export default PromoBadge
