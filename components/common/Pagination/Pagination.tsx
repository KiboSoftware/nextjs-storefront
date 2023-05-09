import React from 'react'

import { Pagination, createTheme, ThemeProvider, SxProps, Theme } from '@mui/material'
import { Container } from '@mui/system'

interface PaginationProps {
  count?: number
  onChange: any
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps<Theme>
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2B2B2B',
    },
  },
})

export default function PaginationCustom(props: PaginationProps) {
  const { count, size, sx } = props

  function handleChange(e: any, value: any) {
    props.onChange(value)
  }

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Container style={{ margin: '20px 0' }}>
          <Pagination
            count={count}
            shape={`rounded`}
            color="primary"
            onChange={handleChange}
            size={size}
            sx={{ ...sx }}
          />
        </Container>
      </ThemeProvider>
    </>
  )
}
