/** @format */

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Stack } from '@mui/material'

const styles = {
  boxStyle: {
    display: 'inline-block',
    mx: '0.5rem',
    mt: '0.25rem',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
}

const PromoBadge = ({ promoCode }: any) => {
  return (
    <>
      <Box sx={styles.boxStyle}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography sx={{ mx: '0.5rem' }}>
            {promoCode}
            <CancelOutlinedIcon
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
                ml: '0.5rem',
                mt: '0.25rem',
              }}
            />
          </Typography>
        </Stack>
      </Box>
    </>
  )
}
export default PromoBadge
