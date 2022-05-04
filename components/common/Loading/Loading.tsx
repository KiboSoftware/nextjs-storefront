import * as React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useIsFetching } from 'react-query'

export default function CircularIndeterminate() {
  const display = useIsFetching() ? 'flex' : 'none'

  return (
    <Box sx={{ display: display }}>
      <CircularProgress />
    </Box>
  )
}
