import * as React from 'react'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import { alpha, styled } from '@mui/material/styles'

interface KiboTextBoxProps {
  label?: string | null
  value?: string
  required?: boolean
  error?: boolean
  helperText?: string
  children?: any
  [x: string]: any
}

const KiboInput = styled(InputBase)(({ theme, error }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    padding: '10.5px 12px',
    borderColor: error ? theme.palette.error.main : theme.palette.text.secondary,
    borderWidth: '1px',
    borderStyle: 'solid',

    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(
        error ? theme.palette.error.main : theme.palette.primary.main,
        0.25
      )} 0 0 0 0.2rem`,
    },
  },
}))

export default function KiboTextBox({
  label,
  value,
  selectOptions,
  required = false,
  error = false,
  helperText = '',
  children,
  ...rest
}: KiboTextBoxProps) {
  return (
    <FormControl variant="standard" error={error} required={required} {...rest} fullWidth>
      <InputLabel shrink htmlFor="kibo-input">
        {label}
      </InputLabel>
      <KiboInput id="kibo-input" error={error} defaultValue={value} {...rest} />
      {error && (
        <FormHelperText id="helper-text" error>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
