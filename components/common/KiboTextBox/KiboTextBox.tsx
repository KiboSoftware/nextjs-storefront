import * as React from 'react'

import { FormControl, FormHelperText, InputBase, InputLabel } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

interface KiboTextBoxProps {
  label?: string
  value?: string
  required?: boolean
  error?: boolean
  helperText?: string
  children?: any
  onChange: (name: string, value: string) => void
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
    padding: '4.5px 12px',
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

const KiboTextBox = ({
  label,
  value,
  required = false,
  error = false,
  helperText = '',
  onChange,
  children,
  ...rest
}: KiboTextBoxProps) => {
  return (
    <FormControl variant="standard" error={error} required={required} {...rest} fullWidth>
      {label && (
        <InputLabel shrink htmlFor="kibo-input">
          {label}
        </InputLabel>
      )}
      <KiboInput
        id="kibo-input"
        size="small"
        error={error}
        defaultValue={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        {...rest}
      />
      {error && (
        <FormHelperText id="helper-text" error data-testid="helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default KiboTextBox
