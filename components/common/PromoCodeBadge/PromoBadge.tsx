/** @format */

import { useState, useRef } from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Button, TextField } from '@mui/material'

const PromoBadge = ({ promocode }: any) => {
  return (
    <>
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
              position: 'relative',
              ml: '0.5rem',
            }}
            fontSize="inherit"
          />
        </Typography>
      </Box>
    </>
  )
}
export default PromoBadge
