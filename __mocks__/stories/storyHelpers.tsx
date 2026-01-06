import React from 'react'

import { Box, BoxProps } from '@mui/material'

export const StoryContainer: React.FC<{ maxWidth?: number; children: React.ReactNode }> = ({
  maxWidth = 600,
  children,
}) => {
  return <Box sx={{ maxWidth, margin: '0 auto', padding: 2 }}>{children}</Box>
}
