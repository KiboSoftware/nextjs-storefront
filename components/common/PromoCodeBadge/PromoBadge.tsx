/** @format */

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Stack } from '@mui/material'

const styles = {
  boxStyle: {
    display: 'inline-block',
    mx: '1rem',
    mt: '0.2rem',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
}

const PromoBadge = ({ promoCode }: any) => {
  return (
    <>
      <Box sx={styles.boxStyle}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography sx={{ mx: '1rem', textAlign: 'left' }}>
            {promoCode}
            <CancelOutlinedIcon
              sx={{
                cursor: 'pointer',
                position: 'relative',
                ml: '0.5rem',
              }}
              fontSize="inherit"
            />
          </Typography>
        </Stack>
      </Box>
    </>
  )
}
export default PromoBadge
