import React from 'react'

import { FormControl, FormHelperText, InputBase, InputLabel } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export interface KiboTextBoxProps {
  label?: string
  value?: string | null
  required?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
  onChange: (name: string, value: string) => void

  /* eslint-disable  @typescript-eslint/no-explicit-any */
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

const KiboTextBox = (props: KiboTextBoxProps) => {
  const {
    label,
    value,
    required = false,
    error = false,
    helperText = '',
    placeholder,
    onChange,
    onKeyDown,
    inputRef,
    ...rest
  } = props

  return (
    <FormControl variant="standard" error={error} required={required} {...rest} fullWidth>
      <InputLabel shrink htmlFor="kibo-input">
        {label}
      </InputLabel>
      <KiboInput
      inputRef={inputRef}
        // inputRef={inputRef}
        id="kibo-input"
        size="small"
        error={error}
        inputProps={{
          'aria-invalid': error,
        }}
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        onKeyDown={onKeyDown}
        {...rest}
      />

      <FormHelperText id="helper-text" error aria-errormessage={helperText}>
        {error ? helperText : ' '}
      </FormHelperText>
    </FormControl>
  )
}

export default KiboTextBox
