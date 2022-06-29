import React from 'react'

import { Chip } from '@mui/material'

// dummy implementation
const FilterTiles = () => {
  return (
    <Chip
      label="Last 6 months"
      variant={'outlined'}
      sx={{ cursor: 'pointer', borderColor: 'grey.900' }}
    />
  )
}

export default FilterTiles
