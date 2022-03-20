import { MenuItem, OutlinedInput } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'

interface KiboSelectProps {
  name?: string
  value?: string
  helperText?: string
  error?: boolean
  placeholder?: string
  children: any
  onChange: (name: string, value: string) => void
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

const KiboSelect = ({
  name = 'kibo-select',
  value = '',
  helperText = '',
  error = false,
  placeholder = 'Select option',
  children,
  onChange,
  ...rest
}: KiboSelectProps) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth variant="outlined">
      <Select
        size="small"
        displayEmpty
        name={name}
        defaultValue={value}
        onChange={(event) => onChange(event.target.name, event.target.value as string)}
        input={<OutlinedInput size="small" />}
        MenuProps={MenuProps}
        error={error}
        sx={{ height: '34px' }}
        inputProps={{ 'aria-hidden': false }}
        {...rest}
      >
        <MenuItem value={''} disabled sx={{ display: 'none' }}>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
      {error && (
        <FormHelperText error={error} data-testid="helper-text" sx={{ margin: '3px 0' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default KiboSelect
