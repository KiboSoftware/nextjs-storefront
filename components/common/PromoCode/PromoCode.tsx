/** @format */

import { useState, useRef } from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Button, TextField } from '@mui/material'

const PromoCode = ({ promoEnable }: any) => {
  const promotext = useRef()
  const [promo, setPromo] = useState('')
  const [promoActive, setPromoActive] = useState(false)
  const [promocode, setPromocode] = useState('')

  return (
    <>
      <Box>
        <TextField
          inputRef={promotext}
          sx={{ mx: '1rem', width: '17rem' }}
          size="small"
          label="Enter Promo code"
          variant="outlined"
        />
        <Button disabled={promoEnable} sx={{ width: '6rem', height: '2.5rem' }} variant="contained">
          Apply
        </Button>
      </Box>
      {promo?.length > 0 && promoActive && (
        <Box
          sx={{
            display: 'inline-block',
            mx: '1rem',
            mt: '0.2rem',
            backgroundColor: '#DCDCDC',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ mx: '1rem', textAlign: 'left' }}>
            {promocode}
            <CancelOutlinedIcon
              sx={{
                cursor: 'pointer',
                mt: '0.1rem',
              }}
              fontSize="inherit"
            />
          </Typography>
        </Box>
      )}
    </>
  )
}
export default PromoCode
