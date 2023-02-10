import { InputLabel, MenuItem, OutlinedInput, SxProps, Theme } from '@mui/material'
import { FormControl, FormHelperText, Select } from '@mui/material'
export interface KiboSelectProps {
  name?: string
  value?: string
  required?: boolean
  helperText?: string
  error?: boolean
  placeholder?: string
  label?: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  disabled?: boolean
  onChange: (name: string, value: string) => void
  onBlur?: (name: string, value: string) => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const KiboSelect = (props: KiboSelectProps) => {
  const {
    name = 'kibo-select',
    value = '',
    required = false,
    helperText = '',
    error = false,
    placeholder,
    label,
    children,
    onChange,
    onBlur,
    sx,
    ...rest
  } = props

  return (
    <FormControl
      sx={{ minWidth: 120, marginTop: label ? 3 : 0 }}
      size="small"
      fullWidth
      variant="outlined"
      hiddenLabel={!label}
      required={required}
    >
      {label && (
        <InputLabel shrink htmlFor={name} sx={{ top: -18, left: -13 }}>
          {label}
        </InputLabel>
      )}
      <Select
        size="small"
        displayEmpty
        name={name}
        error={error}
        value={value}
        MenuProps={MenuProps}
        sx={{ height: '34px', ...sx }}
        inputProps={{ 'aria-hidden': false, 'aria-label': label }}
        input={<OutlinedInput size="small" />}
        onChange={(event) => onChange(event.target.name, event.target.value)}
        onBlur={(event) => onBlur && onBlur(event.target.name, event.target.value)}
        {...rest}
      >
        <MenuItem value={''} disabled sx={{ display: 'none' }}>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
      {error && (
        <FormHelperText
          error={error}
          {...(error && { 'aria-errormessage': helperText })}
          sx={{ margin: '3px 0' }}
        >
          {error ? helperText : ''}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default KiboSelect
