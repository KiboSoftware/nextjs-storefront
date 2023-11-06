import React from 'react'

import { FormControl, FormHelperText, IconButton, InputBase, InputLabel } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export interface KiboTextBoxProps {
  label?: string
  value?: string | null | React.ReactNode
  required?: boolean
  error?: boolean
  helperText?: any
  placeholder?: string
  icon?: React.ReactNode
  onChange?: (name: string, value: string) => void
  onBlur?: (name: string, value: string) => void
  onIconClick?: () => void

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  sx?: any
  [x: string]: any
}

const KiboInput = styled(InputBase)(({ theme, error }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&.MuiInputBase-root:focus-within': {
    boxShadow: `${alpha(
      error ? theme.palette.error.main : theme.palette.primary.main,
      0.25
    )} 0 0 0 0.2rem`,
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    padding: '4.5px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '& :focus': {
      '& .MuiInputBase-root': {
        border: 'none',
        boxShadow: `${alpha(
          error ? theme.palette.error.main : theme.palette.primary.main,
          0.25
        )} 0 0 0 0.2rem`,
      },
    },
  },
}))

const KiboTextBox = (props: KiboTextBoxProps) => {
  const {
    label,
    required = false,
    error = false,
    helperText = '',
    placeholder,
    onKeyDown,
    icon,
    sx,
    value,
    onChange,
    onBlur,
    onIconClick,
    onInput,
    name,
    ...rest
  } = props

  return (
    <FormControl variant="standard" error={error} required={required} {...rest} fullWidth>
      <InputLabel shrink htmlFor="kibo-input">
        {label}
      </InputLabel>
      <KiboInput
        sx={{
          borderColor: error ? 'error.main' : 'text.secondary',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: 1,
          fontSize: { xs: '14px !important', md: '16px !important' },
          ...sx,
        }}
        value={value}
        id={label}
        size="small"
        error={error}
        inputProps={{
          'aria-invalid': error,
          'aria-label': label || (name as string),
        }}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.name, e.target.value)}
        onBlur={(e) => {
          onBlur && onBlur(e.target.name, e.target.value)
        }}
        onKeyDown={onKeyDown}
        onInput={onInput}
        {...(icon && {
          endAdornment: onIconClick ? (
            <IconButton aria-label="toggle icon visibility" size="small" onClick={onIconClick}>
              {icon}
            </IconButton>
          ) : (
            icon
          ),
        })}
        {...rest}
      />

      <FormHelperText
        id="helper-text"
        aria-errormessage={helperText}
        dangerouslySetInnerHTML={{ __html: helperText || '&nbsp;' }}
      />
    </FormControl>
  )
}

export default KiboTextBox
