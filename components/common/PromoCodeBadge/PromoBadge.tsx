/** @format */

import CloseIcon from '@mui/icons-material/Close'
import { Typography, Box, Stack, IconButton } from '@mui/material'
export interface PromoBadgeProps {
  promoCode: string
}
const styles = {
  boxStyle: {
    display: 'inline-block',
    mr: '0.5rem',
    mt: '0.5rem',
    px: '0.5rem',
    backgroundColor: '#DCDCDC',
  },
}

const PromoBadge = (props: PromoBadgeProps) => {
  const { promoCode } = props
  return (
    <>
      <Box component="div" sx={styles.boxStyle}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography sx={{ textAlign: 'left' }}>{promoCode}</Typography>
          <IconButton>
            <CloseIcon
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            />
          </IconButton>
        </Stack>
      </Box>
    </>
  )
}
export default PromoBadge
