import * as React from 'react'

import { Divider } from '@mui/material'
import { Box } from '@mui/system'

const FullWidthDivider = () => {
  // sx= {{width: '100vw',position: 'relative', marginLeft: {md: '-51vw', xs: '-50vw'},left: '50%'}}
  return (
    <Box>
      <Divider sx={{ borderColor: 'grey.500' }} />
    </Box>
  )
}

export default FullWidthDivider
