import * as React from 'react'

import { Divider, Theme } from '@mui/material'

interface FullWidthDividerProps {
  color?: string
  [x: string]: any
}

const FullWidthDivider = (props: FullWidthDividerProps) => {
  const { color = 'grey.500', ...rest } = props
  return (
    <>
      <Divider
        {...rest}
        sx={(theme: Theme) => ({
          borderColor: color,
          marginLeft: { md: '-1.5rem', xs: '-1rem' },
          marginRight: { md: '-1.5rem', xs: '-1rem' },
          [theme.breakpoints.between('sm', 'md')]: {
            marginLeft: '-1.5rem',
            marginRight: '-1.5rem',
          },
        })}
      />
    </>
  )
}

export default FullWidthDivider
